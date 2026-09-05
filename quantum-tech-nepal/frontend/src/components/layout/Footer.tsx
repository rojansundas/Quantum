import { NAV_LINKS } from "@/constants";

interface FooterProps { setActive: (page: string) => void; }

const FOOTER_COLS = [
  { title: "Company", links: ["About", "Services", "Portfolio", "Blog", "Careers"] },
  { title: "Services", links: ["Web Development", "Mobile Apps", "UI/UX Design", "AI Solutions", "Cloud & Hosting"] },
  { title: "Contact", links: ["hello@quantumtechnepal.com", "+977 9812345678", "Thamel, Kathmandu, Nepal", "Mon–Fri 9AM–6PM NST"] },
];

const SOCIALS = [
  { label: "LinkedIn", icon: "in" },
  { label: "Twitter", icon: "𝕏" },
  { label: "Facebook", icon: "f" },
  { label: "Instagram", icon: "▶" },
];

export default function Footer({ setActive }: FooterProps) {
  return (
    <footer style={{
      borderTop: "1px solid rgba(0,212,255,0.1)",
      background: "rgba(7,9,15,0.98)",
      padding: "5rem 2rem 2.5rem",
      position: "relative",
    }}>
      {/* Top glow */}
      <div style={{
        position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
        width: 300, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "2.5rem",
          marginBottom: "3.5rem",
        }}>
          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "#fff",
              }}>Q</div>
              <span className="font-display" style={{ fontWeight: 600, color: "var(--color-text)", fontSize: 15 }}>
                Quantum Tech Nepal
              </span>
            </div>
            <p style={{ color: "var(--color-muted)", fontSize: 14, lineHeight: 1.75, maxWidth: 260, marginBottom: "1.5rem" }}>
              Building digital experiences that transform businesses. Your vision, our expertise — crafted in Nepal.
            </p>
            {/* Newsletter */}
            <p style={{ color: "var(--color-muted)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Newsletter</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="email" placeholder="your@email.com"
                style={{
                  flex: 1, padding: "9px 12px", borderRadius: 8, fontSize: 13,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)",
                  color: "var(--color-text)", fontFamily: "var(--font-body)",
                }}
              />
              <button className="btn-primary" style={{ padding: "9px 14px", fontSize: 13, whiteSpace: "nowrap" }}>
                Subscribe
              </button>
            </div>
            {/* Socials */}
            <div style={{ display: "flex", gap: 8, marginTop: "1.25rem" }}>
              {SOCIALS.map(s => (
                <button key={s.label} title={s.label} style={{
                  width: 34, height: 34, borderRadius: 8, cursor: "pointer",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.12)",
                  color: "var(--color-muted)", fontSize: 13, fontWeight: 700,
                  transition: "all 0.2s", fontFamily: "var(--font-body)",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)"; (e.currentTarget as HTMLElement).style.color = "var(--color-accent)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "var(--color-muted)"; }}
                >{s.icon}</button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, fontSize: 13, marginBottom: "1.25rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {col.title}
              </h4>
              {col.links.map(l => (
                <div key={l} style={{ marginBottom: "0.65rem" }}>
                  <span
                    onClick={() => NAV_LINKS.includes(l) && setActive(l)}
                    style={{
                      color: "var(--color-muted)", fontSize: 13.5,
                      cursor: NAV_LINKS.includes(l) ? "pointer" : "default",
                      transition: "color 0.2s", lineHeight: 1.5,
                    }}
                    onMouseEnter={e => { if (NAV_LINKS.includes(l)) (e.currentTarget as HTMLElement).style.color = "var(--color-accent)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-muted)"; }}
                  >{l}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "0.75rem",
        }}>
          <span style={{ color: "var(--color-muted)", fontSize: 13 }}>
            © 2025 Quantum Tech Nepal. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <span key={l} style={{ color: "var(--color-muted)", fontSize: 13, cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-muted)"; }}
              >{l}</span>
            ))}
          </div>
          <span style={{ color: "var(--color-muted)", fontSize: 13 }}>Built with ❤️ in Kathmandu</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
