import { useState, useEffect } from "react";
import { STATS } from "@/constants";

interface HeroProps { setActive: (page: string) => void; }

export default function HeroSection({ setActive }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fn = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section style={{
      minHeight: "100vh", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", padding: "7rem 2rem 5rem",
    }}>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Mouse-follow gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: mounted
            ? `radial-gradient(ellipse 800px 600px at ${mousePos.x}px ${mousePos.y}px, rgba(0,212,255,0.06) 0%, transparent 70%)`
            : "none",
          transition: "background 0.08s ease",
        }} />
        {/* Static gradients */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 10% 20%, rgba(0,212,255,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 90% 80%, rgba(124,58,237,0.09) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)
          `,
        }} />
        {/* Grid */}
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        {/* Floating orbs */}
        {[
          { left: "8%", top: "20%", size: 320, color: "rgba(0,212,255,0.05)", dur: "9s" },
          { left: "82%", top: "65%", size: 380, color: "rgba(124,58,237,0.06)", dur: "11s" },
          { left: "55%", top: "10%", size: 240, color: "rgba(245,158,11,0.04)", dur: "13s" },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%",
            left: o.left, top: o.top, width: o.size, height: o.size,
            background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            animation: `floatY ${o.dur} ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 920, textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div className="animate-fade-in-up" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)",
          borderRadius: 50, padding: "6px 20px", marginBottom: "2rem",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00D4FF", display: "inline-block", animation: "pulse-glow 2s infinite" }} />
          <span style={{ color: "var(--color-accent)", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Nepal's Premier Tech Partner
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display animate-fade-in-up delay-100" style={{
          fontSize: "clamp(3rem, 7.5vw, 5.8rem)", fontWeight: 700, lineHeight: 1.07,
          color: "var(--color-text)", margin: "0 0 1.75rem", letterSpacing: "-3px",
        }}>
          We Build Digital<br />
          <span className="gradient-text">Experiences</span> That Matter
        </h1>

        <p className="animate-fade-in-up delay-200" style={{
          fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--color-muted)", lineHeight: 1.8,
          maxWidth: 620, margin: "0 auto 3rem",
        }}>
          From startups to enterprises — we craft world-class software, apps, and digital solutions
          that drive growth, delight users, and define the future of business in Nepal and beyond.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up delay-300" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setActive("Services")} className="btn-primary" style={{ fontSize: 16, padding: "15px 36px" }}>
            🚀 Explore Services
          </button>
          <button onClick={() => setActive("Contact")} className="btn-outline" style={{ fontSize: 16, padding: "14px 34px" }}>
            📅 Book Consultation
          </button>
        </div>

        {/* Trust badges */}
        <div className="animate-fade-in-up delay-400" style={{
          display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap",
          marginTop: "3.5rem",
        }}>
          {["✓ Free Consultation", "✓ On-time Delivery", "✓ Post-launch Support"].map(badge => (
            <span key={badge} style={{
              fontSize: 13, color: "var(--color-muted)", display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ color: "var(--color-success)" }}>{badge.split(" ")[0]}</span>
              {badge.split(" ").slice(1).join(" ")}
            </span>
          ))}
        </div>

        {/* Quick stats */}
        <div className="animate-fade-in-up delay-500" style={{
          display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap",
          marginTop: "4rem", paddingTop: "3rem",
          borderTop: "1px solid rgba(0,212,255,0.08)",
        }}>
          {STATS.slice(0, 3).map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="font-display" style={{
                fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-1px",
                background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>{s.value}{s.suffix}</div>
              <div style={{ fontSize: 13, color: "var(--color-muted)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.5,
      }}>
        <span style={{ fontSize: 11, color: "var(--color-muted)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{
          width: 24, height: 38, border: "1.5px solid rgba(0,212,255,0.3)", borderRadius: 12,
          display: "flex", justifyContent: "center", padding: "5px 0",
        }}>
          <div style={{
            width: 4, height: 8, borderRadius: 2, background: "var(--color-accent)",
            animation: "scroll-down 1.5s ease infinite",
          }} />
        </div>
      </div>
    </section>
  );
}
