import { useState } from "react";
import { STATS, PORTFOLIO, TESTIMONIALS, TECH_STACK } from "@/constants";
import { SectionTitle, Card, AnimatedNumber, FilterTabs, useInView } from "@/components/ui";

// ── Stats ─────────────────────────────────────────────────────────────────────
export function StatsSection() {
  const [ref, inView] = useInView(0.3);
  return (
    <section ref={ref} style={{ padding: "5rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(124,58,237,0.06) 100%)",
        borderTop: "1px solid rgba(0,212,255,0.08)", borderBottom: "1px solid rgba(0,212,255,0.08)",
      }} />
      <div style={{
        maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1,
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem",
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: "0.5rem" }}>{s.icon}</div>
            <div className="font-display" style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, letterSpacing: "-2px",
              background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              <AnimatedNumber target={s.value} suffix={s.suffix} started={inView} />
            </div>
            <div style={{ color: "var(--color-muted)", fontSize: 14.5, fontWeight: 500, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Portfolio ─────────────────────────────────────────────────────────────────
export function PortfolioSection({ setActive }: { setActive: (p: string) => void }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "E-commerce", "Education", "Agri-tech", "SaaS", "Mobile App", "AI Tools"];
  const filtered = filter === "All" ? PORTFOLIO : PORTFOLIO.filter(p => p.category === filter);

  return (
    <section className="section">
      <SectionTitle label="Our Work" title="Featured Projects" sub="Real solutions we've built for real businesses across Nepal and beyond." />
      <FilterTabs items={categories} active={filter} onChange={setFilter} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: "1.25rem" }}>
        {filtered.map((p, i) => (
          <Card key={i} style={{ cursor: "pointer" }}>
            <div style={{
              height: 150, borderRadius: 10, marginBottom: "1.25rem", overflow: "hidden",
              background: `linear-gradient(135deg, ${p.color}18, ${p.color}2E)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${p.color}25`, fontSize: 52,
              transition: "transform 0.3s",
            }}>{p.icon}</div>
            <div style={{ display: "flex", gap: 8, marginBottom: "0.75rem", alignItems: "center" }}>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${p.color}15`, color: p.color, fontWeight: 600 }}>{p.category}</span>
            </div>
            <h3 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, margin: "0 0 0.5rem", fontSize: 17 }}>{p.title}</h3>
            <p style={{ color: "var(--color-muted)", fontSize: 13.5, lineHeight: 1.6, margin: "0 0 1rem" }}>{p.desc}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {p.tech.map(t => (
                <span key={t} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 6, background: "rgba(255,255,255,0.05)", color: "var(--color-muted)", border: "1px solid rgba(255,255,255,0.07)" }}>{t}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <button onClick={() => setActive("Portfolio")} className="btn-outline">
          View All Projects →
        </button>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <section style={{ padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(124,58,237,0.04), rgba(0,212,255,0.04))",
      }} />
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <SectionTitle label="Testimonials" title="What Our Clients Say" />
        <div style={{
          background: "rgba(13,17,23,0.85)", border: "1px solid rgba(0,212,255,0.15)",
          borderRadius: 20, padding: "2.75rem", backdropFilter: "blur(12px)",
          transition: "all 0.4s ease", position: "relative",
        }}>
          {/* Quote icon */}
          <div style={{
            position: "absolute", top: 20, left: 24,
            fontSize: 48, color: "rgba(0,212,255,0.12)", lineHeight: 1,
            fontFamily: "Georgia, serif",
          }}>"</div>

          {/* Avatar */}
          <div style={{
            width: 60, height: 60, borderRadius: "50%", margin: "0 auto 1.25rem",
            background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))",
            border: "2px solid rgba(0,212,255,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700, color: "var(--color-accent)", fontFamily: "var(--font-display)",
          }}>{t.avatar}</div>

          {/* Stars */}
          <div style={{ fontSize: 18, marginBottom: "1rem", letterSpacing: 2 }}>
            {"⭐".repeat(t.rating)}
          </div>
          <p style={{ color: "var(--color-text)", fontSize: "1.1rem", lineHeight: 1.75, margin: "0 0 1.75rem", fontStyle: "italic", opacity: 0.9 }}>
            "{t.text}"
          </p>
          <div>
            <div className="font-display" style={{ fontWeight: 600, color: "var(--color-accent)", fontSize: 15 }}>{t.name}</div>
            <div style={{ color: "var(--color-muted)", fontSize: 13, marginTop: 2 }}>{t.company}</div>
          </div>
        </div>
        {/* Dots */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: "1.5rem" }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 28 : 8, height: 8, borderRadius: 4,
              background: i === active ? "var(--color-accent)" : "rgba(255,255,255,0.15)",
              border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Tech Stack ────────────────────────────────────────────────────────────────
export function TechStackSection() {
  const doubled = [...TECH_STACK, ...TECH_STACK];
  return (
    <section style={{ padding: "4rem 0", overflow: "hidden", borderTop: "1px solid rgba(0,212,255,0.06)", borderBottom: "1px solid rgba(0,212,255,0.06)" }}>
      <p style={{ textAlign: "center", color: "var(--color-muted)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "1.75rem" }}>Technologies We Master</p>
      <div style={{ overflow: "hidden" }}>
        <div className="animate-marquee" style={{ display: "flex", gap: "1rem", width: "max-content" }}>
          {doubled.map((t, i) => (
            <div key={i} style={{
              padding: "10px 22px", borderRadius: 10, whiteSpace: "nowrap",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.1)",
              color: "var(--color-muted)", fontSize: 14, fontWeight: 500,
            }}>{t}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
export function CTASection({ setActive }: { setActive: (p: string) => void }) {
  return (
    <section style={{ padding: "6rem 2rem" }}>
      <div style={{
        maxWidth: 820, margin: "0 auto", textAlign: "center",
        background: "linear-gradient(135deg, rgba(0,212,255,0.07), rgba(124,58,237,0.09))",
        border: "1px solid rgba(0,212,255,0.15)", borderRadius: 24, padding: "5rem 3rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 240, height: 240, borderRadius: "50%", background: "rgba(0,212,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(124,58,237,0.07)", pointerEvents: "none" }} />

        <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 700, color: "var(--color-text)", margin: "0 0 1rem", letterSpacing: "-1.5px" }}>
          Ready to Build Something Amazing?
        </h2>
        <p style={{ color: "var(--color-muted)", fontSize: "1.1rem", margin: "0 0 2.5rem", lineHeight: 1.7, maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
          Let's turn your idea into a product that stands out. Get a free consultation today — no commitment, no cost.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setActive("Contact")} className="btn-primary" style={{ padding: "15px 40px", fontSize: 16 }}>
            Start a Project
          </button>
          <button onClick={() => setActive("Portfolio")} className="btn-outline" style={{ padding: "14px 38px", fontSize: 16 }}>
            View Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
