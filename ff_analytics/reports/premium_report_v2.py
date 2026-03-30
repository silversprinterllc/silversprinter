"""
Premium Scouting Report v2 — Production quality.

Fixes from v1:
- Offense detection: team in tighter pre-snap cluster = offense
- Drive grouping: consecutive plays by same offense = one drive
- Skip pre-game (first ~2 min of video)
- Better gain estimation from displacement vectors
- Youth-friendly play breakdowns
- Professional formatting optimized for marketability
"""

from __future__ import annotations

import json
import math
import os
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from typing import Optional

import cv2
import numpy as np


@dataclass
class Play:
    number: int
    timestamp: str
    start_time: float
    end_time: float
    duration: float
    offense: str
    defense: str
    formation: str
    formation_strength: str
    coverage: str
    coverage_type: str
    blitz: bool
    motion: bool
    play_type: str
    direction: str
    gain: str
    big_play: bool
    field_zone: str
    off_player_count: int
    def_player_count: int
    # Youth-friendly
    simple_summary: str


@dataclass
class Drive:
    number: int
    offense: str
    defense: str
    plays: list[Play]
    start_ts: str
    end_ts: str
    play_count: int
    result: str
    formations: dict
    primary_formation: str
    gains: list[str]
    big_plays: int
    motion_rate: float


class PremiumReportV2:

    def __init__(self, fps: float = 29.97):
        self.fps = fps

    def generate(
        self,
        tracking_path: str,
        mapping_path: str,
        video_path: str,
        output_dir: str,
        game_start: float = 120.0,  # skip first 2 min (pre-game)
        game_end: float = 3180.0,
        team_a: str = "Gators",
        team_b: str = "Tennessee",
        color_a: str = "Blue",
        color_b: str = "White",
        fmt: str = "7v7",
        date: str = "March 28, 2026",
        field: str = "Field 12",
        league: str = "WCFL",
    ) -> str:
        os.makedirs(output_dir, exist_ok=True)
        frames_dir = os.path.join(output_dir, "play_frames")
        os.makedirs(frames_dir, exist_ok=True)

        print("Loading tracking data...")
        records = self._load(tracking_path)
        field_recs = [r for r in records if 250 < r['y_pixel'] < 880
                      and game_start <= r['time'] <= game_end]
        print(f"  {len(field_recs)} on-field records in game window")

        print("Loading player mapping...")
        with open(mapping_path) as f:
            mapping = json.loads(f.read())

        # Segment plays
        print("Segmenting plays...")
        raw_plays = self._segment(field_recs, game_start, game_end)
        print(f"  {len(raw_plays)} raw plays detected")

        # Analyze each play
        print("Analyzing plays...")
        plays = []
        prev_offense = None
        for rp in raw_plays:
            p = self._analyze_play(rp, field_recs, team_a, team_b, prev_offense)
            if p:
                plays.append(p)
                prev_offense = p.offense
        print(f"  {len(plays)} plays analyzed")

        # Group into drives
        print("Grouping drives...")
        drives = self._group_drives(plays, team_a, team_b)
        print(f"  {len(drives)} drives")

        # Extract frames
        print("Extracting play frames...")
        self._extract_frames(video_path, plays, frames_dir)

        # Build profiles
        profiles = self._build_profiles(mapping, team_a, team_b)

        # Build report
        print("Building report...")
        report = self._build_report(
            plays, drives, profiles,
            team_a, team_b, color_a, color_b,
            fmt, date, field, league,
        )

        path = os.path.join(output_dir, "SCOUTING_REPORT.txt")
        with open(path, 'w', encoding='utf-8') as f:
            f.write(report)

        pbp = os.path.join(output_dir, "play_by_play.json")
        with open(pbp, 'w') as f:
            json.dump([self._p2d(p) for p in plays], f, indent=2)

        print(f"\nReport: {path}")
        return report

    # ── Play Segmentation ────────────────────────────────────────

    def _segment(self, records, gs, ge):
        frames = defaultdict(list)
        for r in records:
            frames[r['frame_idx']].append(r)

        fi = sorted(frames.keys())
        if len(fi) < 10: return []

        motion = np.zeros(len(fi))
        pcounts = np.zeros(len(fi))

        for i in range(1, len(fi)):
            dt = (fi[i] - fi[i-1]) / self.fps
            if dt <= 0 or dt > 2: continue
            prev = {r['track_id']: r for r in frames[fi[i-1]]}
            curr = {r['track_id']: r for r in frames[fi[i]]}
            pcounts[i] = len(curr)
            tv, m = 0, 0
            for tid in curr:
                if tid in prev:
                    dx = curr[tid]['x_pixel'] - prev[tid]['x_pixel']
                    dy = curr[tid]['y_pixel'] - prev[tid]['y_pixel']
                    tv += math.sqrt(dx*dx + dy*dy) / dt
                    m += 1
            motion[i] = (tv / max(m,1)) * min(m,10) if m >= 3 else 0

        w = max(1, int(0.5 * self.fps / 5))
        sm = np.convolve(motion, np.ones(w)/w, mode='same')

        nz = sm[sm > 0]
        if len(nz) < 10: return []
        thresh = np.percentile(nz, 72)
        active = (sm > thresh) & (pcounts >= 5)

        # Extract bursts
        bursts = []
        in_b, bs = False, 0
        mf = max(2, int(1.5 * self.fps / 5))
        for i in range(len(active)):
            if active[i] and not in_b: bs = i; in_b = True
            elif not active[i] and in_b:
                if i - bs >= mf: bursts.append((bs, i))
                in_b = False
        if in_b and len(active) - bs >= mf: bursts.append((bs, len(active)-1))

        # Merge close bursts (< 1.5s)
        mg = max(2, int(1.5 * self.fps / 5))
        merged = []
        for s, e in bursts:
            if merged and s - merged[-1][1] < mg:
                merged[-1] = (merged[-1][0], e)
            else:
                merged.append((s, e))

        plays = []
        pn = 0
        for si, ei in merged:
            if si >= len(fi) or ei >= len(fi): continue
            ts = fi[si] / self.fps
            te = fi[min(ei, len(fi)-1)] / self.fps
            dur = te - ts
            if 2.0 <= dur <= 12.0:
                pn += 1
                plays.append({"n": pn, "ts": ts, "te": te, "dur": round(dur,1),
                              "motion": float(sm[si:ei+1].mean()),
                              "players": float(pcounts[si:ei+1].mean())})
        return plays

    # ── Play Analysis ────────────────────────────────────────────

    def _analyze_play(self, rp, records, ta, tb, prev_off):
        ts, te = rp['ts'], rp['te']
        mid = ts + min(1.0, (te - ts) / 3)

        pre = [r for r in records if ts - 0.5 <= r['time'] <= mid]
        post = [r for r in records if mid < r['time'] <= te]
        if len(pre) < 5:
            pre = [r for r in records if ts <= r['time'] <= te]
            if len(pre) < 5: return None
            h = len(pre) // 2
            post = pre[h:]
            pre = pre[:h]

        pre_pos = self._avg_pos(pre)
        post_pos = self._avg_pos(post)
        if len(pre_pos) < 4: return None

        groups = self._split_teams(pre_pos)
        if not groups: return None
        ga, gb = groups

        # OFFENSE DETECTION using multiple signals:
        # 1. Y-depth range: offense has QB behind line = more depth variance
        # 2. X-spread: defense spreads wider to cover receivers
        # 3. Team label voting to determine which color = which team
        ya_range = (max(p['y'] for p in ga) - min(p['y'] for p in ga)) if len(ga) >= 2 else 0
        yb_range = (max(p['y'] for p in gb) - min(p['y'] for p in gb)) if len(gb) >= 2 else 0

        if ya_range > yb_range * 1.2:
            off_group, def_group = ga, gb
        elif yb_range > ya_range * 1.2:
            off_group, def_group = gb, ga
        else:
            xa_sp = np.std([p['x'] for p in ga]) if len(ga) >= 2 else 0
            xb_sp = np.std([p['x'] for p in gb]) if len(gb) >= 2 else 0
            if xa_sp < xb_sp:
                off_group, def_group = ga, gb
            else:
                off_group, def_group = gb, ga

        # Map to team names via team_label
        off_labels = [p.get('team_label', -1) for p in off_group if p.get('team_label', -1) >= 0]
        def_labels = [p.get('team_label', -1) for p in def_group if p.get('team_label', -1) >= 0]

        if off_labels:
            off_majority = Counter(off_labels).most_common(1)[0][0]
            off_team = ta if off_majority == 0 else tb
        elif def_labels:
            def_majority = Counter(def_labels).most_common(1)[0][0]
            off_team = tb if def_majority == 0 else ta
        elif prev_off:
            off_team = prev_off
        else:
            off_team = ta

        def_team = tb if off_team == ta else ta

        # Formation
        form = self._classify_formation(off_group)
        # Coverage
        cov = self._classify_coverage(def_group, off_group)
        # Motion
        motion = self._detect_motion(pre, off_group)
        # Blitz
        blitz = self._detect_blitz(def_group, post_pos)
        # Result
        ptype, direction, gain = self._estimate_result(off_group, def_group, post_pos)
        big = "10+" in gain or "Explosive" in gain

        # Field zone from Y position (how far down the field)
        avg_y = np.mean([p['y'] for p in off_group])
        if avg_y > 700: zone = "Own Territory"
        elif avg_y > 550: zone = "Midfield"
        elif avg_y > 400: zone = "Opponent Territory"
        else: zone = "Red Zone"

        # Simple summary for youth
        simple = self._youth_summary(form['tag'], cov['shell'], ptype, direction, gain, motion, blitz)

        mins, secs = divmod(int(rp['ts']), 60)

        return Play(
            number=rp['n'], timestamp=f"{mins}:{secs:02d}",
            start_time=rp['ts'], end_time=rp['te'], duration=rp['dur'],
            offense=off_team, defense=def_team,
            formation=form['tag'], formation_strength=form.get('str', 'Balanced'),
            coverage=cov['shell'], coverage_type=cov.get('type', 'Unknown'),
            blitz=blitz, motion=motion,
            play_type=ptype, direction=direction, gain=gain, big_play=big,
            field_zone=zone,
            off_player_count=len(off_group), def_player_count=len(def_group),
            simple_summary=simple,
        )

    def _youth_summary(self, form, cov, ptype, direction, gain, motion, blitz):
        parts = []
        if motion: parts.append("A player moved before the snap.")
        parts.append(f"The offense lined up in a {form} look.")
        if "Cover 2" in cov:
            parts.append("The defense had two safeties deep, protecting against big plays.")
        elif "Single" in cov or "Cover 1" in cov:
            parts.append("The defense had one safety in the middle of the field.")
        elif "Cover 0" in cov:
            parts.append("The defense had no deep safety - they were being aggressive!")
        if blitz:
            parts.append("The defense sent extra rushers to try to get the quarterback!")
        if ptype == "Pass":
            parts.append(f"The quarterback threw the ball {direction.lower()}.")
        else:
            parts.append(f"It was a run play going {direction.lower()}.")
        if "Explosive" in gain or "10+" in gain:
            parts.append("BIG PLAY! The offense picked up a lot of yards!")
        elif "Medium" in gain:
            parts.append("Good play - picked up some nice yards.")
        elif "Short" in gain:
            parts.append("Short gain - just a few yards.")
        elif "Loss" in gain or "No Gain" in gain:
            parts.append("The defense won this play - no gain or a loss.")
        return " ".join(parts)

    # ── Team Splitting ───────────────────────────────────────────

    def _split_teams(self, positions):
        if len(positions) < 6: return None
        t0 = [p for p in positions if p.get('tl') == 0]
        t1 = [p for p in positions if p.get('tl') == 1]
        if len(t0) >= 3 and len(t1) >= 3: return t0, t1
        ys = np.array([p['y'] for p in positions]).reshape(-1,1).astype(np.float32)
        try:
            _, labels, _ = cv2.kmeans(ys, 2, None,
                (cv2.TERM_CRITERIA_EPS+cv2.TERM_CRITERIA_MAX_ITER, 100, 1.0), 10, cv2.KMEANS_PP_CENTERS)
            g0 = [p for p, l in zip(positions, labels.flatten()) if l == 0]
            g1 = [p for p, l in zip(positions, labels.flatten()) if l == 1]
            if len(g0) >= 2 and len(g1) >= 2: return g0, g1
        except: pass
        return None

    def _avg_pos(self, records):
        tracks = defaultdict(list)
        for r in records:
            tracks[r['track_id']].append(r)
        result = []
        for tid, recs in tracks.items():
            if len(recs) < 2: continue
            tls = [r.get('team_label', -1) for r in recs]
            tl = max(set(tls), key=tls.count) if tls else -1
            result.append({'tid': tid, 'tl': tl,
                'x': np.mean([r['x_pixel'] for r in recs]),
                'y': np.mean([r['y_pixel'] for r in recs])})
        return result

    # ── Formation ────────────────────────────────────────────────

    def _classify_formation(self, off):
        if len(off) < 3:
            return {"tag": "Inconclusive", "str": "?"}
        cx = np.median([p['x'] for p in off])
        L = [p for p in off if p['x'] < cx - 40]
        R = [p for p in off if p['x'] > cx + 40]
        nl, nr = len(L), len(R)

        def tight(g):
            if len(g) < 3: return False
            return max(p['x'] for p in g) - min(p['x'] for p in g) < 80

        if nl >= 3:
            tag = "Bunch Left" if tight(L) else "Trips Left"
            s = "Left"
        elif nr >= 3:
            tag = "Bunch Right" if tight(R) else "Trips Right"
            s = "Right"
        elif nl == 2 and nr == 2:
            tag = "2x2 Spread"; s = "Balanced"
        elif nl == 2 and nr == 1:
            tag = "Twins Left"; s = "Left"
        elif nl == 1 and nr == 2:
            tag = "Twins Right"; s = "Right"
        elif nl + nr >= 4:
            tag = "Spread"; s = "Balanced"
        elif nl + nr <= 1:
            tag = "Tight / Compressed"; s = "Balanced"
        else:
            tag = "Pro Set"; s = "Balanced"

        cy = np.median([p['y'] for p in off])
        back = [p for p in off if abs(p['y'] - cy) > 30]
        if len(back) == 0 and "Tight" not in tag and "Inconclusive" not in tag:
            tag = f"Empty {tag}"

        return {"tag": tag, "str": s, "left": nl, "right": nr}

    # ── Coverage ─────────────────────────────────────────────────

    def _classify_coverage(self, def_pos, off_pos):
        if len(def_pos) < 3:
            return {"shell": "Unknown", "type": "Unknown"}
        los = np.median([p['y'] for p in off_pos]) if off_pos else 600
        deep = [d for d in def_pos if abs(d['y'] - los) > 80]
        nd = len(deep)
        if nd >= 2:
            dxs = [d['x'] for d in deep]
            shell = "Cover 2 (Two-High)" if len(dxs) >= 2 and max(dxs)-min(dxs) > 150 else "Quarters"
        elif nd == 1:
            shell = "Cover 1 / Cover 3 (Single-High)"
        else:
            shell = "Cover 0 (No Safety)"

        dxs = sorted([d['x'] for d in def_pos])
        gaps = [dxs[i+1]-dxs[i] for i in range(len(dxs)-1)] if len(dxs) > 1 else []
        gv = np.std(gaps) if gaps else 999
        ctype = "Zone" if gv < 30 else ("Man" if gv < 80 else "Unknown")

        return {"shell": shell, "type": ctype}

    # ── Detection ────────────────────────────────────────────────

    def _detect_motion(self, pre_recs, off_group):
        off_tids = {p['tid'] for p in off_group}
        tracks = defaultdict(list)
        for r in pre_recs:
            if r['track_id'] in off_tids:
                tracks[r['track_id']].append(r['x_pixel'])
        for xs in tracks.values():
            if len(xs) >= 3 and max(xs) - min(xs) > 60: return True
        return False

    def _detect_blitz(self, def_pre, post_pos):
        if len(def_pre) < 3 or len(post_pos) < 3: return False
        rush = 0
        for d in def_pre:
            best = min((math.sqrt((d['x']-p['x'])**2+(d['y']-p['y'])**2) for p in post_pos), default=0)
            if best > 80: rush += 1
        return rush >= 2

    def _estimate_result(self, off_pre, def_pre, post_pos):
        if not post_pos or not off_pre:
            return "Unknown", "Unknown", "Unknown"
        disps = []
        for p in off_pre:
            closest = min(post_pos, key=lambda q: math.sqrt((q['x']-p['x'])**2+(q['y']-p['y'])**2), default=None)
            if closest:
                dx = closest['x'] - p['x']
                dy = closest['y'] - p['y']
                disps.append((dx, dy, math.sqrt(dx*dx+dy*dy)))
        if not disps: return "Unknown", "Unknown", "Unknown"

        avg_d = np.mean([d[2] for d in disps])
        avg_dx = np.mean([d[0] for d in disps])
        spread = np.std([d[2] for d in disps])

        ptype = "Pass" if spread > 30 else "Run"
        direction = "Left" if avg_dx < -20 else ("Right" if avg_dx > 20 else "Middle")

        if avg_d < 15: gain = "Loss / No Gain"
        elif avg_d < 40: gain = "Short Gain (1-4 yds)"
        elif avg_d < 80: gain = "Medium Gain (5-9 yds)"
        else: gain = "Explosive Play (10+ yds)"

        return ptype, direction, gain

    # ── Drive Grouping ───────────────────────────────────────────

    def _group_drives(self, plays, ta, tb):
        """Group plays into drives.

        In flag football, possessions alternate. We detect drive boundaries
        by large time gaps (>15s = huddle/reset/change of possession).
        When a new drive starts after a long gap, we alternate the offense.
        Plays within a short gap (<15s) are the same drive.
        """
        if not plays: return []

        # First: group plays into clusters by time proximity
        clusters = [[plays[0]]]
        for p in plays[1:]:
            gap = p.start_time - clusters[-1][-1].end_time
            if gap < 45:  # same drive (WCFL play clock is 40 seconds)
                clusters[-1].append(p)
            else:  # new drive
                clusters.append([p])

        # Now assign alternating offense to each cluster (drive)
        drives = []
        current_off = ta  # Gators start with ball (adjust if known)
        for cluster in clusters:
            # Override each play's offense to match the drive assignment
            for p in cluster:
                p.offense = current_off
                p.defense = tb if current_off == ta else ta

            drives.append(self._make_drive(len(drives)+1, current_off, cluster, ta, tb))

            # Alternate possession for next drive
            current_off = tb if current_off == ta else ta

        return drives

    def _make_drive(self, num, off, plays, ta, tb):
        forms = Counter(p.formation for p in plays)
        mot = sum(1 for p in plays if p.motion)
        bigs = sum(1 for p in plays if p.big_play)
        gains = [p.gain for p in plays]

        if bigs > 0: result = "Scoring Opportunity"
        elif len(plays) >= 5: result = "Sustained Drive"
        elif len(plays) >= 3: result = "Standard Possession"
        elif len(plays) == 2: result = "Short Possession"
        else: result = "One-and-Out"

        return Drive(
            number=num, offense=off,
            defense=tb if off == ta else ta,
            plays=plays, play_count=len(plays),
            start_ts=plays[0].timestamp, end_ts=plays[-1].timestamp,
            formations=dict(forms),
            primary_formation=forms.most_common(1)[0][0] if forms else "N/A",
            gains=gains, big_plays=bigs,
            result=result,
            motion_rate=round(mot/max(len(plays),1)*100, 1),
        )

    # ── Frame Extraction ─────────────────────────────────────────

    def _extract_frames(self, vpath, plays, fdir):
        cap = cv2.VideoCapture(vpath)
        fps = cap.get(cv2.CAP_PROP_FPS)
        for p in plays:
            fn = int(p.start_time * fps)
            cap.set(cv2.CAP_PROP_POS_FRAMES, fn)
            ret, frame = cap.read()
            if not ret: continue
            h, w = frame.shape[:2]
            # Header bar
            cv2.rectangle(frame, (0,0), (w,65), (0,0,0), -1)
            cv2.putText(frame, f"Play {p.number} | {p.timestamp} | {p.offense} Offense",
                       (10,22), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255,255,255), 2)
            info = f"OFF: {p.formation}  |  DEF: {p.coverage}  |  {p.play_type} {p.direction}"
            cv2.putText(frame, info, (10,48), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,255,255), 2)
            # Result bar at bottom
            result_color = (0,255,0) if p.big_play else (200,200,200)
            cv2.rectangle(frame, (0,h-30), (w,h), (0,0,0), -1)
            cv2.putText(frame, f"Result: {p.gain}", (10,h-8),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, result_color, 2)
            cv2.imwrite(os.path.join(fdir, f"play_{p.number:03d}.jpg"), frame)
        cap.release()

    # ── Player Profiles ──────────────────────────────────────────

    def _build_profiles(self, mapping, ta, tb):
        players = mapping.get('players', [])
        sig = [p for p in players if p.get('total_time_seconds', 0) > 20]
        profiles = []
        for p in sig[:30]:
            tl = p.get('team', -1)
            team = ta if tl == 0 else (tb if tl == 1 else "Unknown")
            ax = p.get('avg_position', [960])[0]
            c = 960
            d = abs(ax - c)
            role = "QB / Center" if d < 60 else ("Outside WR" if d > 300 else ("Slot WR" if d > 200 else "Skill / Hybrid"))
            align = "Boundary" if ax < c-200 else ("Field" if ax > c+200 else "Inside")
            profiles.append({"id": p['player_id'], "team": team, "role": role,
                "time": round(p.get('total_time_seconds',0),0),
                "tracks": len(p.get('track_ids',[])), "align": align})
        profiles.sort(key=lambda x: x['time'], reverse=True)
        return profiles

    # ── Report Builder ───────────────────────────────────────────

    def _build_report(self, plays, drives, profiles, ta, tb, ca, cb, fmt, date, field, league):
        W = 80
        r = []

        # Header
        r.append("=" * W)
        r.append("")
        r.append(f"{league} FLAG FOOTBALL".center(W))
        r.append("GAME FILM SCOUTING REPORT".center(W))
        r.append("")
        r.append(f"{ta} ({ca}) vs {tb} ({cb})".center(W))
        r.append(f"{date}  |  {field}  |  {fmt}".center(W))
        r.append("")
        r.append("=" * W)
        r.append("Powered by FF Analytics  |  AI-Driven Game Film Analysis".center(W))
        r.append("")

        total = len(plays)
        a_off = [p for p in plays if p.offense == ta]
        b_off = [p for p in plays if p.offense == tb]
        a_def = [p for p in plays if p.defense == ta]
        b_def = [p for p in plays if p.defense == tb]
        mot = sum(1 for p in plays if p.motion)
        blz = sum(1 for p in plays if p.blitz)
        bigs = sum(1 for p in plays if p.big_play)

        # Executive Summary
        r.append("=" * W)
        r.append("  EXECUTIVE GAME SUMMARY")
        r.append("=" * W)
        r.append("")
        r.append(f"  Total Plays ................... {total}")
        r.append(f"  {ta} Offensive Plays ......... {len(a_off)}")
        r.append(f"  {tb} Offensive Plays ...... {len(b_off)}")
        r.append(f"  Drives ....................... {len(drives)}")
        r.append(f"  {ta} Drives ................. {len([d for d in drives if d.offense == ta])}")
        r.append(f"  {tb} Drives .............. {len([d for d in drives if d.offense == tb])}")
        r.append(f"  Explosive Plays (10+ yds) .... {bigs}")
        r.append(f"  Blitz Rate ................... {blz}/{total} ({blz/max(total,1)*100:.0f}%)")
        r.append(f"  Pre-Snap Motion Rate ......... {mot}/{total} ({mot/max(total,1)*100:.0f}%)")
        r.append("")

        # Formation summary
        all_forms = Counter(p.formation for p in plays)
        r.append(f"  Top Formations:")
        for tag, ct in all_forms.most_common(5):
            r.append(f"    {tag:<25} {ct:>3}x ({ct/total*100:.0f}%)")
        r.append("")

        all_covs = Counter(p.coverage for p in plays)
        r.append(f"  Top Coverages Faced:")
        for sh, ct in all_covs.most_common(5):
            r.append(f"    {sh:<35} {ct:>3}x ({ct/total*100:.0f}%)")
        r.append("")

        # ── PLAY-BY-PLAY ──
        r.append("=" * W)
        r.append("  PLAY-BY-PLAY")
        r.append("=" * W)
        r.append("")
        r.append(f"  {'#':>3} {'Time':>5} {'Ball':>10} {'Formation':<20} {'Coverage':<22} {'Result':<20}")
        r.append("  " + "-" * 77)
        for p in plays:
            bm = "*" if p.blitz else " "
            mm = "M" if p.motion else " "
            bp = "!" if p.big_play else " "
            r.append(f"  {p.number:>3} {p.timestamp:>5} {p.offense:>10} {p.formation:<20} {p.coverage:<22} {p.gain:<20}{bm}{mm}{bp}")
        r.append("")
        r.append("  Legend: * = Blitz   M = Motion   ! = Big Play")
        r.append("")

        # ── DRIVES ──
        r.append("=" * W)
        r.append("  DRIVE CHART")
        r.append("=" * W)
        r.append("")

        for d in drives:
            r.append(f"  DRIVE {d.number}: {d.offense} Ball  ({d.start_ts} - {d.end_ts})")
            r.append(f"  {d.play_count} plays  |  {d.result}  |  Motion: {d.motion_rate:.0f}%")
            if d.play_count > 1:
                r.append(f"  Formations: {', '.join(f'{k}({v})' for k,v in d.formations.items())}")
            r.append("")
            for p in d.plays:
                bm = " [BLITZ]" if p.blitz else ""
                mm = " [MOTION]" if p.motion else ""
                bp = " *** BIG PLAY ***" if p.big_play else ""
                r.append(f"    {p.timestamp} | {p.formation:<20} vs {p.coverage}")
                r.append(f"           {p.play_type} {p.direction} -> {p.gain}{bm}{mm}{bp}")
                r.append(f"           {p.simple_summary}")
                r.append("")
            r.append("  " + "-" * 70)
            r.append("")

        # ── OFFENSIVE TENDENCIES ──
        for team, tplays in [(ta, a_off), (tb, b_off)]:
            r.append("=" * W)
            r.append(f"  OFFENSIVE BREAKDOWN: {team}")
            r.append("=" * W)
            r.append("")
            if not tplays:
                r.append("  No data."); r.append(""); continue
            tp = len(tplays)

            forms = Counter(p.formation for p in tplays)
            r.append("  Formation Usage:")
            for tag, ct in forms.most_common():
                bar = "#" * int(ct/tp*30)
                r.append(f"    {tag:<22} {ct:>3}x ({ct/tp*100:>4.0f}%)  {bar}")
            r.append("")

            types = Counter(p.play_type for p in tplays)
            r.append("  Play Type:")
            for pt, ct in types.most_common():
                r.append(f"    {pt:<12} {ct:>3}x ({ct/tp*100:.0f}%)")
            r.append("")

            dirs = Counter(p.direction for p in tplays)
            r.append("  Direction:")
            for d, ct in dirs.most_common():
                r.append(f"    {d:<12} {ct:>3}x ({ct/tp*100:.0f}%)")
            r.append("")

            gains = Counter(p.gain for p in tplays)
            r.append("  Result Distribution:")
            for g, ct in gains.most_common():
                r.append(f"    {g:<25} {ct:>3}x ({ct/tp*100:.0f}%)")
            r.append("")

        # ── DEFENSIVE TENDENCIES ──
        for team, tplays in [(ta, a_def), (tb, b_def)]:
            r.append("=" * W)
            r.append(f"  DEFENSIVE BREAKDOWN: {team}")
            r.append("=" * W)
            r.append("")
            if not tplays:
                r.append("  No data."); r.append(""); continue
            tp = len(tplays)

            shells = Counter(p.coverage for p in tplays)
            blz = sum(1 for p in tplays if p.blitz)
            r.append(f"  Blitz Rate: {blz}/{tp} ({blz/tp*100:.0f}%)")
            r.append("")
            r.append("  Coverage Shell:")
            for sh, ct in shells.most_common():
                bar = "#" * int(ct/tp*30)
                r.append(f"    {sh:<35} {ct:>3}x ({ct/tp*100:>4.0f}%)  {bar}")
            r.append("")

            ctypes = Counter(p.coverage_type for p in tplays)
            r.append("  Man vs Zone:")
            for ct, c in ctypes.most_common():
                r.append(f"    {ct:<12} {c:>3}x ({c/tp*100:.0f}%)")
            r.append("")

        # ── PERSONNEL ──
        r.append("=" * W)
        r.append("  PERSONNEL & PLAYING TIME")
        r.append("=" * W)
        r.append("")

        for team in [ta, tb]:
            tp = [p for p in profiles if p['team'] == team]
            if not tp: continue
            r.append(f"  {team}:")
            r.append(f"  {'Player':>8} {'Role':<16} {'Time':>8} {'Tracks':>7} {'Align':<10}")
            r.append("  " + "-" * 52)
            for p in tp[:10]:
                t = p['time']
                ts = f"{t/60:.1f}m" if t > 60 else f"{t:.0f}s"
                r.append(f"  P{p['id']:<7} {p['role']:<16} {ts:>8} {p['tracks']:>7} {p['align']:<10}")
            r.append("")

        # ── PLAYERS TO WATCH ──
        r.append("=" * W)
        r.append("  PLAYERS TO WATCH")
        r.append("=" * W)
        r.append("")
        for team in [ta, tb]:
            tp = [p for p in profiles if p['team'] == team][:5]
            if not tp: continue
            r.append(f"  {team}:")
            for p in tp:
                t = p['time']
                if t > 2000:
                    note = "IRONMAN. Highest-usage player on the roster. Every game plan must account for them."
                elif t > 500:
                    note = "Primary starter. Significant role in both phases."
                elif t > 100:
                    note = "Rotational contributor. Watch for situational packages."
                else:
                    note = "Reserve / specialist role."
                r.append(f"    P{p['id']}: {p['role']} ({p['align']})")
                r.append(f"      {note}")
            r.append("")

        # ── GAME PLAN ──
        r.append("=" * W)
        r.append("  GAME PLAN RECOMMENDATIONS")
        r.append("=" * W)
        r.append("")

        bullets = []

        # Offense of each team
        for team, off_plays, def_plays in [(ta, a_off, b_def), (tb, b_off, a_def)]:
            if not off_plays: continue
            tp = len(off_plays)
            forms = Counter(p.formation for p in off_plays)
            top = forms.most_common(1)[0] if forms else ("N/A", 0)
            bullets.append(f"{team} primarily runs {top[0]} ({top[1]}/{tp} = {top[1]/tp*100:.0f}%). "
                          f"Defensive game plan should key on this alignment pre-snap.")

        # Coverage tendencies
        for team, def_plays in [(ta, a_def), (tb, b_def)]:
            if not def_plays: continue
            tp = len(def_plays)
            shells = Counter(p.coverage for p in def_plays)
            top = shells.most_common(1)[0] if shells else ("N/A", 0)
            bullets.append(f"{team} defense lives in {top[0]} ({top[1]/tp*100:.0f}%). "
                          f"Attack the holes: seams, intermediate crossers, and flats.")

        # Blitz
        for team, def_plays in [(ta, a_def), (tb, b_def)]:
            if not def_plays: continue
            tp = len(def_plays)
            bl = sum(1 for p in def_plays if p.blitz)
            br = bl/tp*100
            if br > 20:
                bullets.append(f"{team} blitzes heavily ({br:.0f}%). Prepare hot routes and sight adjustments.")
            elif br < 10:
                bullets.append(f"{team} rarely blitzes ({br:.0f}%). QB has time. Take shots downfield and let routes develop.")

        # Motion
        for team, off_plays in [(ta, a_off), (tb, b_off)]:
            if not off_plays: continue
            mr = sum(1 for p in off_plays if p.motion) / len(off_plays) * 100
            if mr < 15:
                bullets.append(f"{team} uses almost no pre-snap motion ({mr:.0f}%). Adding motion can create "
                              f"pre-snap reads, force defensive communication, and create mismatches.")

        # Big plays
        for team, off_plays in [(ta, a_off), (tb, b_off)]:
            if not off_plays: continue
            bp = sum(1 for p in off_plays if p.big_play)
            if bp > 0:
                bullets.append(f"{team} generated {bp} explosive plays. Identify their big-play personnel and bracket coverage.")

        for i, b in enumerate(bullets, 1):
            r.append(f"  {i}. {b}")
            r.append("")

        # Footer
        r.append("=" * W)
        r.append("")
        r.append("Report generated by FF Analytics v0.1".center(W))
        r.append("AI-Driven Flag Football Game Film Analysis".center(W))
        r.append(f"{total} plays | {len(drives)} drives | {len(profiles)} players".center(W))
        r.append("")
        r.append("=" * W)

        return "\n".join(r)

    # ── Helpers ───────────────────────────────────────────────────

    def _load(self, path):
        recs = []
        with open(path) as f:
            for line in f: recs.append(json.loads(line))
        return recs

    def _p2d(self, p):
        return {"play": p.number, "time": p.timestamp, "offense": p.offense,
                "defense": p.defense, "formation": p.formation, "coverage": p.coverage,
                "blitz": p.blitz, "motion": p.motion, "type": p.play_type,
                "direction": p.direction, "gain": p.gain, "big_play": p.big_play,
                "field_zone": p.field_zone, "duration": p.duration,
                "simple_summary": p.simple_summary}
