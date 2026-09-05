import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/constants";

interface NavBarProps {
  active: string;
  setActive: (page: string) => void;
}

export default function NavBar({ active, setActive }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on nav
  const handleNav = (link: string) => {
    setActive(link);
    setMobileOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(7,9,15,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
        transition: "all 0.35s ease",
        padding: "0 2rem",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 68,
        }}>
          {/* Logo */}
          <div
            onClick={() => handleNav("Home")}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 9,
              background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "#fff",
            }}>Q</div>
            <span className="font-display" style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text)", letterSpacing: "-0.4px" }}>
              Quantum<span style={{ color: "var(--color-accent)" }}> Tech</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: 2, alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => handleNav(l)} style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "6px 13px", borderRadius: 8,
                color: active === l ? "var(--color-accent)" : "var(--color-muted)",
                fontWeight: active === l ? 600 : 400, fontSize: 14,
                fontFamily: "var(--font-body)",
                transition: "all 0.2s",
                borderBottom: active === l ? "2px solid var(--color-accent)" : "2px solid transparent",
              }}>{l}</button>
            ))}
            <button onClick={() => handleNav("Contact")} className="btn-primary" style={{
              marginLeft: 12, padding: "8px 20px", fontSize: 14,
            }}>Get Started →</button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--color-text)", padding: 8, borderRadius: 8,
              display: "none",
            }}
          >
            <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ height: 2, background: mobileOpen ? "var(--color-accent)" : "var(--color-text)", display: "block", transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ height: 2, background: "var(--color-text)", display: "block", opacity: mobileOpen ? 0 : 1, transition: "all 0.3s" }} />
              <span style={{ height: 2, background: mobileOpen ? "var(--color-accent)" : "var(--color-text)", display: "block", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 999,
          background: "rgba(7,9,15,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,212,255,0.1)",
          padding: "1.5rem 2rem 2rem",
          animation: "fadeInUp 0.25s ease",
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => handleNav(l)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              padding: "13px 0", fontSize: 16,
              color: active === l ? "var(--color-accent)" : "var(--color-text)",
              fontWeight: active === l ? 700 : 400,
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              fontFamily: "var(--font-body)",
            }}>{l}</button>
          ))}
          <button onClick={() => handleNav("Contact")} className="btn-primary" style={{ width: "100%", marginTop: "1.25rem", padding: "13px" }}>
            Get Started →
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
