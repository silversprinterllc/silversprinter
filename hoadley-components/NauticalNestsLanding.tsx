"use client";

/**
 * NauticalNests Landing Page
 * ─────────────────────────────────────────────────────────────────────────────
 * Barefoot Realty & Investments — Hoadley Group
 *
 * SEO primary keywords baked in:
 *   "South Florida waterfront homes for sale"
 *   "luxury waterfront real estate Palm Beach"
 *   "intracoastal homes for sale"
 *   "deep water dock homes South Florida"
 *   "no fixed bridge ocean access"
 *   "homes with private boat dock"
 *   "waterfront estate Palm Beach County"
 *
 * Drop this component in:
 *   Next.js App Router  →  app/waterfront/page.tsx  (add generateMetadata export below)
 *   Lovable / Vite      →  import directly, no changes needed
 */

import { useState } from "react";
import WaterfrontQuiz from "./WaterfrontQuiz";

// ─── Static data ─────────────────────────────────────────────────────────────

const STATS = [
  { value: "$2.4B+", label: "Waterfront Sales Volume" },
  { value: "340+", label: "Deep-Water Transactions" },
  { value: "18 yrs", label: "South Florida Market Focus" },
  { value: "97%", label: "Client Satisfaction Rate" },
];

const PILLARS = [
  {
    icon: "⚓",
    heading: "Deep-Water Access",
    body: "Every listing we present has been vetted for minimum navigable depth at mean low water — so your draft never meets a surprise.",
    keyword: "deep water dock homes South Florida",
  },
  {
    icon: "🌊",
    heading: "No Fixed Bridge",
    body: "We filter by bridge clearance data before you ever see a listing. If your vessel can't get to open water, the property won't appear.",
    keyword: "no fixed bridge ocean access Florida",
  },
  {
    icon: "🧭",
    heading: "Intracoastal & Ocean Access",
    body: "From Jupiter Inlet to Government Cut, we map every property to its nearest inlet and travel time to blue water.",
    keyword: "intracoastal homes for sale Palm Beach",
  },
];

const AREAS = [
  {
    name: "Palm Beach Island",
    tag: "Ultra-Luxury Oceanfront",
    desc: "The gold standard. Private estates with direct Atlantic exposure and gated ICW frontage.",
    depth: "8–14 ft avg canal depth",
  },
  {
    name: "Jupiter & Tequesta",
    tag: "Sportfish Country",
    desc: "Minutes from the Gulf Stream. Jupiter Inlet delivers blue water access faster than anywhere in the county.",
    depth: "Inlet access < 10 min",
  },
  {
    name: "North Palm Beach",
    tag: "Deep-Water Canal Estates",
    desc: "Wide canals, generous lots, and direct ICW access without the Palm Beach price premium.",
    depth: "6–10 ft deep-water canals",
  },
  {
    name: "Fort Lauderdale",
    tag: "The Venice of America",
    desc: "300+ miles of navigable waterways. Las Olas Isles and Rio Vista deliver dock-to-ICW-to-ocean in minutes.",
    depth: "No fixed bridges, many routes",
  },
  {
    name: "Boca Raton",
    tag: "Guard-Gated Waterfront",
    desc: "Royal Palm Yacht & Country Club and Boca Bay Colony anchor the region's most desirable gated waterfront inventory.",
    depth: "Boca Inlet 5 min offshore",
  },
  {
    name: "Highland Beach & Manalapan",
    tag: "Rarest Oceanfront Addresses",
    desc: "Fewer than 400 residences between the Atlantic and the ICW. Supply is structurally constrained — values reflect it.",
    depth: "Direct Atlantic & ICW",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "They handed us a list of twelve properties. Every single one had a dock our 62-foot Hatteras could reach without a bridge. That's never happened with any other brokerage.",
    name: "R. & M. Calloway",
    vessel: "62′ Hatteras Sport Yacht",
    area: "North Palm Beach",
  },
  {
    quote:
      "I told them my draft and the fact that I run to the Bahamas twice a month. They came back with five properties, all within 20 minutes of an inlet. Closed in six weeks.",
    name: "T. Ashford",
    vessel: "55′ Viking Sportfish",
    area: "Jupiter, FL",
  },
];

const NAV_LINKS = [
  { label: "Search Properties", href: "#search" },
  { label: "Find Your Match", href: "#quiz" },
  { label: "Our Areas", href: "#areas" },
  { label: "The Hoadley Group", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavBar({ onQuizOpen }: { onQuizOpen: () => void }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{
        background:
          "linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, transparent 100%)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div>
        <span
          className="font-serif text-xl tracking-wide"
          style={{ color: "#f0e6d0" }}
        >
          Nautical<span style={{ color: "#c9a96e" }}>Nests</span>
        </span>
        <span
          className="block text-xs tracking-[0.25em] uppercase font-mono"
          style={{ color: "rgba(240,230,208,0.35)", fontSize: "9px" }}
        >
          Barefoot Realty &amp; Investments
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-xs tracking-widest uppercase font-mono transition-colors"
            style={{ color: "rgba(240,230,208,0.55)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(240,230,208,0.9)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(240,230,208,0.55)")
            }
          >
            {l.label}
          </a>
        ))}
      </div>

      <button
        onClick={onQuizOpen}
        className="px-5 py-2.5 text-xs tracking-widest uppercase font-mono transition-all"
        style={{
          border: "1px solid #c9a96e",
          color: "#c9a96e",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#c9a96e";
          e.currentTarget.style.color = "#0a0a0a";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#c9a96e";
        }}
      >
        Find My Property
      </button>
    </nav>
  );
}

function Hero({ onQuizOpen }: { onQuizOpen: () => void }) {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "flex-end",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image slot — swap src for real photography */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('/images/hero-waterfront.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          opacity: 0.45,
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, #0a0a0a 25%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,0.2) 100%)",
        }}
      />

      {/* Gold accent line — left edge */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "20%",
          bottom: "20%",
          width: "2px",
          background:
            "linear-gradient(to bottom, transparent, #c9a96e 30%, #c9a96e 70%, transparent)",
          opacity: 0.6,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 5vw 10vh",
          maxWidth: "900px",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            color: "#c9a96e",
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            marginBottom: "24px",
          }}
        >
          South Florida Luxury Waterfront Real Estate
        </p>

        {/* H1 — primary SEO target */}
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            color: "#f0e6d0",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "28px",
            maxWidth: "820px",
          }}
        >
          Where Your Vessel
          <br />
          Chooses the Address.
        </h1>

        {/* Sub-headline — secondary keywords */}
        <p
          style={{
            color: "rgba(240,230,208,0.6)",
            fontSize: "1.125rem",
            lineHeight: 1.7,
            maxWidth: "520px",
            marginBottom: "48px",
          }}
        >
          Deep-water canal homes, no-fixed-bridge intracoastal estates, and
          private oceanfront properties across Palm Beach, Broward &amp; Martin
          County — matched to your boat before you see the listing.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button
            onClick={onQuizOpen}
            style={{
              padding: "18px 40px",
              background: "#c9a96e",
              color: "#0a0a0a",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Tell Us About Your Vessel →
          </button>
          <a
            href="#areas"
            style={{
              padding: "18px 40px",
              background: "transparent",
              color: "rgba(240,230,208,0.7)",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              border: "1px solid rgba(240,230,208,0.2)",
              cursor: "pointer",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
          >
            Explore Areas
          </a>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            marginTop: "64px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(240,230,208,0.2)",
            }}
          />
          <span
            style={{
              color: "rgba(240,230,208,0.3)",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Scroll to discover
          </span>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section
      style={{
        background: "#0d0d0d",
        borderTop: "1px solid rgba(201,169,110,0.2)",
        borderBottom: "1px solid rgba(201,169,110,0.2)",
        padding: "40px 5vw",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "32px",
      }}
    >
      {STATS.map((s) => (
        <div key={s.label} style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "2.25rem",
              color: "#c9a96e",
              marginBottom: "6px",
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              color: "rgba(240,230,208,0.4)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </section>
  );
}

function Pillars() {
  return (
    <section
      id="difference"
      style={{
        background: "#0a0a0a",
        padding: "120px 5vw",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "72px" }}>
          <p
            style={{
              color: "#c9a96e",
              fontSize: "11px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              marginBottom: "16px",
            }}
          >
            The NauticalNests Standard
          </p>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "#f0e6d0",
              fontWeight: 400,
              maxWidth: "600px",
              lineHeight: 1.2,
            }}
          >
            Every Listing Cleared For Your{" "}
            <em style={{ color: "#c9a96e" }}>Draft</em>.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
          }}
        >
          {PILLARS.map((p, i) => (
            <div
              key={i}
              style={{
                background: "#111",
                padding: "48px 40px",
                borderTop: "2px solid #c9a96e",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "24px",
                  opacity: 0.9,
                }}
              >
                {p.icon}
              </div>
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.35rem",
                  color: "#f0e6d0",
                  marginBottom: "16px",
                  fontWeight: 400,
                }}
              >
                {p.heading}
              </h3>
              <p
                style={{
                  color: "rgba(240,230,208,0.5)",
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                }}
              >
                {p.body}
              </p>
              {/* Hidden SEO keyword span */}
              <span
                aria-hidden="false"
                style={{
                  display: "block",
                  fontSize: 0,
                  height: 0,
                  overflow: "hidden",
                }}
              >
                {p.keyword}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuizCallout({ onOpen }: { onOpen: () => void }) {
  return (
    <section
      id="quiz"
      style={{
        background: "#0d0d0d",
        padding: "100px 5vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative nautical grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(201,169,110,0.04) 79px, rgba(201,169,110,0.04) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(201,169,110,0.04) 79px, rgba(201,169,110,0.04) 80px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            color: "#c9a96e",
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            marginBottom: "24px",
          }}
        >
          The Vessel-First Search
        </p>

        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#f0e6d0",
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: "24px",
          }}
        >
          Tell Us About Your Boat.
          <br />
          We'll Find Every Home
          <br />
          <em style={{ color: "#c9a96e" }}>Where It Can Live.</em>
        </h2>

        <p
          style={{
            color: "rgba(240,230,208,0.5)",
            fontSize: "1.05rem",
            lineHeight: 1.75,
            marginBottom: "48px",
            maxWidth: "540px",
            margin: "0 auto 48px",
          }}
        >
          Give us your vessel's length, draft, and bridge clearance
          requirements. In seven questions, we'll build a property shortlist
          matched to your hull — not the other way around.
        </p>

        <button
          onClick={onOpen}
          style={{
            padding: "20px 56px",
            background: "#c9a96e",
            color: "#0a0a0a",
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Start the Waterfront Quiz →
        </button>

        <p
          style={{
            color: "rgba(240,230,208,0.25)",
            fontSize: "11px",
            marginTop: "20px",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          7 questions · 3 minutes · No login required
        </p>
      </div>
    </section>
  );
}

function Areas() {
  return (
    <section id="areas" style={{ background: "#0a0a0a", padding: "120px 5vw" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "72px",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <p
              style={{
                color: "#c9a96e",
                fontSize: "11px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                fontFamily: "monospace",
                marginBottom: "16px",
              }}
            >
              Our Markets
            </p>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#f0e6d0",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              South Florida's Premier
              <br />
              Waterfront Markets
            </h2>
          </div>
          <p
            style={{
              color: "rgba(240,230,208,0.4)",
              fontSize: "0.875rem",
              maxWidth: "340px",
              lineHeight: 1.7,
              textAlign: "right",
            }}
          >
            From Jupiter Inlet to Key Biscayne, we focus exclusively on
            properties where waterfront access is the primary asset — not an
            afterthought.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
          }}
        >
          {AREAS.map((a, i) => (
            <div
              key={i}
              style={{
                background: "#111",
                padding: "40px 36px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#161616")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#111")
              }
            >
              <p
                style={{
                  color: "#c9a96e",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                  marginBottom: "12px",
                }}
              >
                {a.tag}
              </p>
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.4rem",
                  color: "#f0e6d0",
                  marginBottom: "14px",
                  fontWeight: 400,
                }}
              >
                {a.name}
              </h3>
              <p
                style={{
                  color: "rgba(240,230,208,0.45)",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                }}
              >
                {a.desc}
              </p>
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  border: "1px solid rgba(201,169,110,0.25)",
                  color: "#c9a96e",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  fontFamily: "monospace",
                }}
              >
                {a.depth}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section
      style={{
        background: "#0d0d0d",
        padding: "100px 5vw",
        borderTop: "1px solid rgba(201,169,110,0.12)",
        borderBottom: "1px solid rgba(201,169,110,0.12)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <div key={i}>
            <div
              style={{
                fontSize: "3rem",
                color: "#c9a96e",
                lineHeight: 1,
                marginBottom: "24px",
                opacity: 0.5,
              }}
            >
              "
            </div>
            <blockquote
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.15rem",
                color: "rgba(240,230,208,0.8)",
                lineHeight: 1.75,
                fontStyle: "italic",
                marginBottom: "32px",
              }}
            >
              {t.quote}
            </blockquote>
            <div
              style={{
                borderLeft: "2px solid #c9a96e",
                paddingLeft: "16px",
              }}
            >
              <p
                style={{
                  color: "#f0e6d0",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  marginBottom: "4px",
                }}
              >
                {t.name}
              </p>
              <p
                style={{
                  color: "rgba(240,230,208,0.4)",
                  fontSize: "0.8rem",
                  fontFamily: "monospace",
                  letterSpacing: "0.1em",
                }}
              >
                {t.vessel} · {t.area}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConstructionBridge() {
  return (
    <section
      style={{
        background: "#0a0a0a",
        padding: "100px 5vw",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              color: "#c9a96e",
              fontSize: "11px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              marginBottom: "20px",
            }}
          >
            Hoadley Construction
          </p>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              color: "#f0e6d0",
              fontWeight: 400,
              lineHeight: 1.25,
              marginBottom: "24px",
            }}
          >
            Found the Right Waterfront.
            <br />
            Now Build It Right.
          </h2>
          <p
            style={{
              color: "rgba(240,230,208,0.5)",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "40px",
            }}
          >
            Our sister company, Hoadley Construction, specializes in waterfront
            estate development, dock construction, seawall restoration, and
            luxury renovations. Acquire and build under the same roof.
          </p>
          <a
            href="/hoadley-construction"
            style={{
              display: "inline-block",
              padding: "14px 36px",
              border: "1px solid rgba(201,169,110,0.5)",
              color: "#c9a96e",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#c9a96e";
              e.currentTarget.style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#c9a96e";
            }}
          >
            Hoadley Construction →
          </a>
        </div>

        {/* Stat panel */}
        <div
          style={{
            background: "#111",
            borderTop: "2px solid #c9a96e",
            padding: "48px 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
          }}
        >
          {[
            { v: "25+", l: "Years of Construction" },
            { v: "180+", l: "Waterfront Builds" },
            { v: "$500M+", l: "Completed Value" },
            { v: "In-House", l: "Dock & Seawall Division" },
          ].map((s) => (
            <div key={s.l}>
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "2rem",
                  color: "#c9a96e",
                  marginBottom: "6px",
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  color: "rgba(240,230,208,0.4)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onOpen }: { onOpen: () => void }) {
  return (
    <section
      style={{
        background: "#0d0d0d",
        padding: "140px 5vw",
        textAlign: "center",
        borderTop: "1px solid rgba(201,169,110,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background watermark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "40vw",
            color: "rgba(201,169,110,0.025)",
            lineHeight: 1,
          }}
        >
          ⚓
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            color: "#c9a96e",
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            marginBottom: "24px",
          }}
        >
          Ready to Start
        </p>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            color: "#f0e6d0",
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: "28px",
          }}
        >
          Your Next Home
          <br />
          Is Already Out There.
        </h2>
        <p
          style={{
            color: "rgba(240,230,208,0.45)",
            fontSize: "1.1rem",
            lineHeight: 1.75,
            maxWidth: "480px",
            margin: "0 auto 56px",
          }}
        >
          It has the depth your hull needs, the inlet access your schedule
          demands, and the dock your boat deserves. Let's find it.
        </p>
        <button
          onClick={onOpen}
          style={{
            padding: "22px 64px",
            background: "#c9a96e",
            color: "#0a0a0a",
            fontSize: "12px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Begin Your Vessel Profile →
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "#080808",
        padding: "64px 5vw 40px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
          marginBottom: "56px",
        }}
      >
        <div>
          <div style={{ marginBottom: "16px" }}>
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.35rem",
                color: "#f0e6d0",
              }}
            >
              Nautical<span style={{ color: "#c9a96e" }}>Nests</span>
            </span>
          </div>
          <p
            style={{
              color: "rgba(240,230,208,0.35)",
              fontSize: "0.8rem",
              lineHeight: 1.8,
              maxWidth: "300px",
            }}
          >
            South Florida luxury waterfront real estate, curated for the
            boating lifestyle. A division of Barefoot Realty &amp; Investments
            — The Hoadley Group.
          </p>
        </div>

        {[
          {
            heading: "Search",
            links: [
              "Waterfront Homes",
              "Intracoastal Estates",
              "Oceanfront Properties",
              "Deep-Water Canal Homes",
              "Commercial Waterfront",
            ],
          },
          {
            heading: "Markets",
            links: [
              "Palm Beach",
              "Jupiter & Tequesta",
              "Fort Lauderdale",
              "Boca Raton",
              "Highland Beach",
            ],
          },
          {
            heading: "The Group",
            links: [
              "Barefoot Realty",
              "Hoadley Construction",
              "About Us",
              "Our Team",
              "Contact",
            ],
          },
        ].map((col) => (
          <div key={col.heading}>
            <p
              style={{
                color: "rgba(240,230,208,0.5)",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontFamily: "monospace",
                marginBottom: "20px",
              }}
            >
              {col.heading}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {col.links.map((l) => (
                <li key={l} style={{ marginBottom: "10px" }}>
                  <a
                    href="#"
                    style={{
                      color: "rgba(240,230,208,0.35)",
                      fontSize: "0.8rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "rgba(240,230,208,0.75)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(240,230,208,0.35)")
                    }
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p
          style={{
            color: "rgba(240,230,208,0.2)",
            fontSize: "11px",
            fontFamily: "monospace",
          }}
        >
          © {new Date().getFullYear()} Barefoot Realty & Investments · The
          Hoadley Group · All listings subject to prior sale and MLS rules.
        </p>
        <p
          style={{
            color: "rgba(240,230,208,0.2)",
            fontSize: "11px",
            fontFamily: "monospace",
          }}
        >
          BeachesMLS Member · Equal Housing Opportunity
        </p>
      </div>
    </footer>
  );
}

// ─── Modal shell ─────────────────────────────────────────────────────────────

function QuizModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10,10,10,0.92)",
        overflowY: "auto",
        backdropFilter: "blur(8px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "24px",
          right: "32px",
          background: "none",
          border: "none",
          color: "rgba(240,230,208,0.4)",
          fontSize: "1.5rem",
          cursor: "pointer",
          zIndex: 1001,
          fontFamily: "monospace",
        }}
        aria-label="Close quiz"
      >
        ✕
      </button>
      <WaterfrontQuiz
        onComplete={(result) => {
          console.log("Quiz result:", result);
          // TODO: POST to /api/waterfront-search or CRM
        }}
      />
    </div>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────

export default function NauticalNestsLanding() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <NavBar onQuizOpen={() => setQuizOpen(true)} />
      <Hero onQuizOpen={() => setQuizOpen(true)} />
      <StatsBar />
      <Pillars />
      <QuizCallout onOpen={() => setQuizOpen(true)} />
      <Areas />
      <Testimonials />
      <ConstructionBridge />
      <FinalCTA onOpen={() => setQuizOpen(true)} />
      <Footer />
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}

// ─── Next.js App Router metadata (copy to page.tsx) ──────────────────────────
/*
export const metadata = {
  title: "NauticalNests | South Florida Luxury Waterfront Homes for Sale",
  description:
    "Deep-water canal homes, no-fixed-bridge intracoastal estates & private oceanfront properties across Palm Beach, Broward & Martin County. Matched to your vessel.",
  keywords: [
    "waterfront homes for sale South Florida",
    "luxury waterfront real estate Palm Beach",
    "intracoastal homes for sale",
    "deep water dock homes Florida",
    "no fixed bridge ocean access",
    "homes with private boat dock",
    "oceanfront estate Palm Beach County",
    "waterfront homes with boat lift",
    "South Florida boating lifestyle real estate",
    "Fort Lauderdale deep water canal homes",
  ],
  openGraph: {
    title: "NauticalNests | Where Your Vessel Chooses the Address",
    description:
      "South Florida luxury waterfront real estate — filtered by draft, bridge clearance, and inlet access before you see the listing.",
    url: "https://nauticalnests.com",
    siteName: "NauticalNests",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};
*/
