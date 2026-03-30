"""
Premium HTML Report Generator.

Produces a beautiful, responsive HTML scouting report from
autonomous game analysis data. This is the customer-facing product.
"""

import json
import os
from pathlib import Path


def generate_html_report(
    drives_path: str,
    tendencies_path: str,
    output_path: str,
    team_a: str, team_b: str,
    color_a: str, color_b: str,
    score_a: int, score_b: int,
    date: str = "", field: str = "", league: str = "WCFL",
    game_format: str = "7v7",
    notes: str = "",
):
    with open(drives_path) as f:
        drives = json.loads(f.read())
    with open(tendencies_path) as f:
        tendencies = json.loads(f.read())

    total_plays = sum(d["plays"] for d in drives)
    a_drives = [d for d in drives if d["offense"] == team_a]
    b_drives = [d for d in drives if d["offense"] == team_b]
    a_tds = sum(1 for d in a_drives if "Touchdown" in d["result"])
    b_tds = sum(1 for d in b_drives if "Touchdown" in d["result"])
    a_off = tendencies.get(team_a, {}).get("offense", {})
    b_off = tendencies.get(team_b, {}).get("offense", {})
    a_def = tendencies.get(team_a, {}).get("defense", {})
    b_def = tendencies.get(team_b, {}).get("defense", {})

    winner = team_a if score_a > score_b else (team_b if score_b > score_a else "TIE")

    def form_bars(forms_dict, color="#3b82f6"):
        html = ""
        for name, data in list(forms_dict.items())[:6]:
            pct = data["pct"]
            w = max(3, pct)
            html += f'<div class="bar-row"><span class="bar-label">{name}</span>'
            html += f'<div class="bar-track"><div class="bar-fill" style="width:{w}%;background:{color}">{data["count"]}x</div></div>'
            html += f'<span class="bar-pct">{pct:.0f}%</span></div>\n'
        return html

    def cov_bars(covs_dict, color="#06b6d4"):
        html = ""
        for name, data in list(covs_dict.items())[:5]:
            pct = data["pct"]
            w = max(3, pct)
            html += f'<div class="bar-row"><span class="bar-label">{name}</span>'
            html += f'<div class="bar-track"><div class="bar-fill" style="width:{w}%;background:{color}">{data["count"]}x</div></div>'
            html += f'<span class="bar-pct">{pct:.0f}%</span></div>\n'
        return html

    def drive_rows(drives_list):
        html = ""
        for d in drives_list:
            cls = ""
            badge = ""
            if "Touchdown" in d["result"]:
                cls = "drive-td"
                badge = '<span class="badge-td">TD</span>'
            elif "Turnover" in d["result"]:
                cls = "drive-tod"
                badge = '<span class="badge-tod">TOD</span>'
            elif d["result"] == "Punt":
                badge = '<span class="badge-punt">PUNT</span>'
            elif "Half" in d["result"]:
                badge = '<span class="badge-half">HALF</span>'

            html += f'<tr class="{cls}">'
            html += f'<td>{d["drive"]}</td>'
            html += f'<td>{d["offense"]}</td>'
            html += f'<td>{d["plays"]}</td>'
            html += f'<td>{d["start_yard"]:.0f}</td>'
            html += f'<td>{d["end_yard"]:.0f}</td>'
            html += f'<td>{d["yards"]:+.0f}</td>'
            html += f'<td>{d["first_downs"]}</td>'
            html += f'<td>{d["result"]} {badge}</td>'
            html += '</tr>\n'

            # Expandable play details
            html += f'<tr class="play-detail-row"><td colspan="8"><div class="play-details">'
            html += f'<div class="drive-narrative">{d["narrative"]}</div>'
            for p in d.get("play_details", []):
                dn = {1:"1st",2:"2nd",3:"3rd",4:"4th"}.get(p["down"],f"{p['down']}th")
                big_cls = " big-play" if p.get("big_play") else ""
                html += f'<div class="play-line{big_cls}">'
                html += f'<span class="play-time">{p["time"]}</span> '
                html += f'<span class="play-down">{dn}</span> & '
                html += f'<span class="play-yard">{p["yard"]:.0f}</span> | '
                html += f'{p["formation"]} vs {p["coverage"]} | '
                html += f'<span class="play-gain">{p["gain"]:+.0f} yds</span>'
                if p.get("big_play"):
                    html += ' <span class="badge-big">BIG PLAY</span>'
                html += '</div>\n'
            html += '</div></td></tr>\n'

        return html

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{team_a} vs {team_b} | Game Film Report</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
:root {{
  --bg: #0a0f1a; --surface: #111827; --surface2: #1a2236;
  --border: #2a3450; --text: #e2e8f0; --dim: #94a3b8;
  --accent: #3b82f6; --cyan: #06b6d4; --green: #22c55e;
  --red: #ef4444; --orange: #f59e0b; --gold: #eab308;
}}
* {{ margin:0; padding:0; box-sizing:border-box; }}
body {{ font-family:'Inter',sans-serif; background:var(--bg); color:var(--text); line-height:1.6; }}
.wrap {{ max-width:960px; margin:0 auto; padding:16px; }}

.header {{ text-align:center; padding:40px 20px; background:linear-gradient(135deg,#0f172a,#1e293b,#0f172a);
  border:1px solid var(--border); border-radius:16px; margin-bottom:24px; position:relative; overflow:hidden; }}
.header::before {{ content:''; position:absolute; top:0; left:0; right:0; height:4px;
  background:linear-gradient(90deg,var(--accent),var(--cyan),var(--accent)); }}
.header .league {{ font-size:12px; letter-spacing:4px; text-transform:uppercase; color:var(--cyan); font-weight:600; }}
.header h1 {{ font-size:24px; font-weight:800; margin:8px 0 4px; }}
.header .meta {{ font-size:13px; color:var(--dim); margin-top:6px; }}
.header .powered {{ font-size:11px; color:var(--dim); margin-top:16px; opacity:.6; }}

.score-box {{ display:flex; justify-content:center; align-items:center; gap:32px; padding:32px;
  background:var(--surface); border:1px solid var(--border); border-radius:16px; margin-bottom:24px; }}
.team-score {{ text-align:center; min-width:140px; }}
.team-score .name {{ font-size:16px; font-weight:700; }}
.team-score .clr {{ font-size:11px; color:var(--dim); text-transform:uppercase; letter-spacing:2px; }}
.team-score .score {{ font-size:56px; font-weight:900; line-height:1; }}
.team-score.winner .score {{ color:var(--green); }}
.team-score.loser .score {{ color:var(--red); }}
.score-vs {{ font-size:28px; color:var(--dim); font-weight:300; }}
.result-badge {{ display:inline-block; padding:4px 16px; border-radius:16px; font-size:12px;
  font-weight:700; letter-spacing:2px; text-transform:uppercase;
  background:rgba(34,197,94,.12); color:var(--green); border:1px solid rgba(34,197,94,.25); margin-top:8px; }}

.section {{ background:var(--surface); border:1px solid var(--border); border-radius:12px; margin-bottom:20px; overflow:hidden; }}
.section-hdr {{ padding:14px 20px; background:var(--surface2); border-bottom:1px solid var(--border);
  font-size:12px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--cyan); }}
.section-body {{ padding:20px; }}

.stat-grid {{ display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }}
.stat {{ background:var(--surface2); border:1px solid var(--border); border-radius:8px; padding:14px; text-align:center; }}
.stat-val {{ font-size:28px; font-weight:800; color:var(--accent); }}
.stat-lbl {{ font-size:10px; color:var(--dim); text-transform:uppercase; letter-spacing:1px; margin-top:2px; }}

.bar-row {{ display:flex; align-items:center; padding:4px 0; gap:8px; }}
.bar-label {{ min-width:160px; font-size:13px; font-weight:500; }}
.bar-track {{ flex:1; height:22px; background:var(--surface2); border-radius:4px; overflow:hidden; }}
.bar-fill {{ height:100%; border-radius:4px; display:flex; align-items:center; padding-left:6px;
  font-size:11px; font-weight:600; color:#fff; min-width:30px; }}
.bar-pct {{ min-width:40px; text-align:right; font-size:12px; color:var(--dim); }}

table {{ width:100%; border-collapse:collapse; font-size:13px; }}
th {{ text-align:left; padding:8px 6px; border-bottom:2px solid var(--border);
  color:var(--dim); font-size:10px; text-transform:uppercase; letter-spacing:1px; }}
td {{ padding:7px 6px; border-bottom:1px solid rgba(42,52,80,.4); }}
tr:hover {{ background:rgba(59,130,246,.04); }}
.drive-td {{ background:rgba(34,197,94,.06); }}
.drive-tod {{ background:rgba(239,68,68,.04); }}

.badge-td {{ background:rgba(34,197,94,.2); color:var(--green); padding:2px 6px; border-radius:4px; font-size:10px; font-weight:700; }}
.badge-tod {{ background:rgba(239,68,68,.15); color:var(--red); padding:2px 6px; border-radius:4px; font-size:10px; font-weight:700; }}
.badge-punt {{ background:rgba(245,158,11,.15); color:var(--orange); padding:2px 6px; border-radius:4px; font-size:10px; font-weight:700; }}
.badge-half {{ background:rgba(148,163,184,.15); color:var(--dim); padding:2px 6px; border-radius:4px; font-size:10px; font-weight:700; }}
.badge-big {{ background:rgba(34,197,94,.2); color:var(--green); padding:1px 5px; border-radius:3px; font-size:9px; font-weight:700; }}

.play-detail-row {{ display:none; }}
.play-detail-row td {{ padding:0; }}
.play-details {{ padding:8px 20px 12px; background:var(--surface2); border-left:3px solid var(--accent); }}
.drive-narrative {{ font-size:13px; color:var(--dim); margin-bottom:8px; font-style:italic; }}
.play-line {{ font-size:12px; padding:3px 0; font-family:'JetBrains Mono',monospace; color:var(--dim); }}
.play-line.big-play {{ color:var(--green); font-weight:600; }}
.play-time {{ color:var(--text); }}
.play-gain {{ font-weight:600; }}

.two-col {{ display:grid; grid-template-columns:1fr 1fr; gap:20px; }}

.gp-item {{ padding:14px; background:var(--surface2); border:1px solid var(--border); border-radius:8px;
  margin-bottom:10px; border-left:3px solid var(--accent); font-size:14px; }}
.gp-item strong {{ color:var(--cyan); }}

.footer {{ text-align:center; padding:30px; color:var(--dim); font-size:11px; }}

@media(max-width:640px) {{
  .score-box {{ flex-direction:column; gap:16px; padding:20px; }}
  .team-score .score {{ font-size:40px; }}
  .stat-grid {{ grid-template-columns:1fr 1fr; }}
  .two-col {{ grid-template-columns:1fr; }}
  .bar-label {{ min-width:100px; font-size:11px; }}
}}
</style>
<script>
document.addEventListener('DOMContentLoaded',()=>{{
  document.querySelectorAll('table tbody tr:not(.play-detail-row)').forEach(row=>{{
    row.style.cursor='pointer';
    row.addEventListener('click',()=>{{
      const next=row.nextElementSibling;
      if(next&&next.classList.contains('play-detail-row')){{
        next.style.display=next.style.display==='table-row'?'none':'table-row';
      }}
    }});
  }});
}});
</script>
</head>
<body>
<div class="wrap">

<div class="header">
  <div class="league">{league} Flag Football</div>
  <h1>Game Film Scouting Report</h1>
  <div class="meta">{team_a} ({color_a}) vs {team_b} ({color_b})</div>
  <div class="meta">{date} | {field} | {game_format}</div>
  <div class="powered">Powered by FF Analytics | Autonomous AI Game Film Analysis</div>
</div>

<div class="score-box">
  <div class="team-score {'winner' if score_a > score_b else 'loser'}">
    <div class="clr">{color_a}</div>
    <div class="name">{team_a}</div>
    <div class="score">{score_a}</div>
  </div>
  <div class="score-vs">-</div>
  <div class="team-score {'winner' if score_b > score_a else 'loser'}">
    <div class="clr">{color_b}</div>
    <div class="name">{team_b}</div>
    <div class="score">{score_b}</div>
  </div>
</div>
{'<div style="text-align:center;margin-top:-16px;margin-bottom:24px;"><span class="result-badge">' + winner + ' Wins</span></div>' if winner != 'TIE' else ''}

<div class="section">
  <div class="section-hdr">Game Overview</div>
  <div class="section-body">
    <div class="stat-grid">
      <div class="stat"><div class="stat-val">{total_plays}</div><div class="stat-lbl">Total Plays</div></div>
      <div class="stat"><div class="stat-val">{len(drives)}</div><div class="stat-lbl">Drives</div></div>
      <div class="stat"><div class="stat-val">{a_tds + b_tds}</div><div class="stat-lbl">Touchdowns</div></div>
      <div class="stat"><div class="stat-val">{sum(1 for d in drives if 'Turnover' in d['result'])}</div><div class="stat-lbl">Turnovers</div></div>
    </div>
    <div style="margin-top:16px;font-size:13px;color:var(--dim);">
      {team_a}: {len(a_drives)} drives, {a_tds} TDs, {a_off.get('total_yards',0):.0f} yards |
      {team_b}: {len(b_drives)} drives, {b_tds} TDs, {b_off.get('total_yards',0):.0f} yards
    </div>
    {'<div style="margin-top:8px;font-size:13px;color:var(--dim);">' + notes + '</div>' if notes else ''}
  </div>
</div>

<div class="section">
  <div class="section-hdr">Drive Chart <span style="font-weight:400;font-size:10px;letter-spacing:0;">(click a drive to expand play-by-play)</span></div>
  <div class="section-body" style="padding:0;overflow-x:auto;">
    <table>
      <thead>
        <tr><th>#</th><th>Offense</th><th>Plays</th><th>Start</th><th>End</th><th>Yards</th><th>1st Dn</th><th>Result</th></tr>
      </thead>
      <tbody>
        {drive_rows(drives)}
      </tbody>
    </table>
  </div>
</div>

<div class="two-col">
  <div class="section">
    <div class="section-hdr">Offensive Formations: {team_a}</div>
    <div class="section-body">
      {form_bars(a_off.get('formations', {}), '#3b82f6')}
      <div style="margin-top:12px;font-size:12px;color:var(--dim);">
        {a_off.get('plays',0)} plays | {a_off.get('touchdowns',0)} TDs | {a_off.get('big_plays',0)} big plays
      </div>
    </div>
  </div>
  <div class="section">
    <div class="section-hdr">Offensive Formations: {team_b}</div>
    <div class="section-body">
      {form_bars(b_off.get('formations', {}), '#94a3b8')}
      <div style="margin-top:12px;font-size:12px;color:var(--dim);">
        {b_off.get('plays',0)} plays | {b_off.get('touchdowns',0)} TDs | {b_off.get('big_plays',0)} big plays
      </div>
    </div>
  </div>
</div>

<div class="two-col">
  <div class="section">
    <div class="section-hdr">Defensive Coverage: {team_a}</div>
    <div class="section-body">
      {cov_bars(a_def.get('coverages', {}), '#06b6d4')}
    </div>
  </div>
  <div class="section">
    <div class="section-hdr">Defensive Coverage: {team_b}</div>
    <div class="section-body">
      {cov_bars(b_def.get('coverages', {}), '#94a3b8')}
    </div>
  </div>
</div>

<div class="section">
  <div class="section-hdr">Game Plan Recommendations</div>
  <div class="section-body">
    {"".join(f'<div class="gp-item"><strong>{i}.</strong> {b}</div>' for i, b in enumerate([
        f"vs {team_a} Offense: Primary formation is {list(a_off.get('formations',{}).keys())[0] if a_off.get('formations') else 'N/A'} ({list(a_off.get('formations',{}).values())[0]['pct']:.0f}%). Key your defensive alignment to this look pre-snap." if a_off.get('formations') else '',
        f"vs {team_b} Offense: Primary formation is {list(b_off.get('formations',{}).keys())[0] if b_off.get('formations') else 'N/A'} ({list(b_off.get('formations',{}).values())[0]['pct']:.0f}%). Prepare coverage checks for this formation." if b_off.get('formations') else '',
        f"vs {team_a} Defense: Plays {list(a_def.get('coverages',{}).keys())[0] if a_def.get('coverages') else 'Cover 2'} {list(a_def.get('coverages',{}).values())[0]['pct']:.0f}% of the time. Attack the seams and intermediate crossers." if a_def.get('coverages') else '',
        f"vs {team_b} Defense: Plays {list(b_def.get('coverages',{}).keys())[0] if b_def.get('coverages') else 'Cover 2'} {list(b_def.get('coverages',{}).values())[0]['pct']:.0f}% of the time. Attack the holes in this coverage." if b_def.get('coverages') else '',
    ], 1) if b)}
  </div>
</div>

<div class="footer">
  Report generated by <strong style="color:var(--cyan);">FF Analytics</strong><br>
  Autonomous AI-Driven Flag Football Game Film Analysis<br>
  {total_plays} plays | {len(drives)} drives | {a_tds + b_tds} touchdowns detected
</div>

</div>
</body>
</html>"""

    Path(output_path).write_text(html, encoding="utf-8")
    return output_path
