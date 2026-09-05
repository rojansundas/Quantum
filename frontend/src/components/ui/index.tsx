import { useState, useEffect, useRef, ReactNode, CSSProperties } from "react";

// ── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ children, color = "var(--color-accent)" }: { children: ReactNode; color?: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: `${color}12`, border: `1px solid ${color}30`,
      borderRadius: 50, padding: "5px 16px", marginBottom: "1.5rem",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block" }} />
      <span style={{ color, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

// ── SectionTitle ─────────────────────────────────────────────────────────────
export function SectionTitle({ label, title, sub, center = true, align = "center" }: {
  label?: string; title: string; sub?: string; center?: boolean; align?: "center" | "left";
}) {
  return (
    <div style={{ textAlign: align, marginBottom: "3.5rem" }}>
      {label && <Badge>{label}</Badge>}
      <h2 className="font-display" style={{
        fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 700, color: "var(--color-text)",
        lineHeight: 1.15, letterSpacing: "-1.5px", marginBottom: "1rem",
      }}>{title}</h2>
      {sub && (
        <p style={{
          fontSize: "1.05rem", color: "var(--color-muted)", lineHeight: 1.75,
          maxWidth: 560, margin: align === "center" ? "0 auto" : "0",
        }}>{sub}</p>
      )}
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, style = {}, className = "", onClick }: {
  children: ReactNode; style?: CSSProperties; className?: string; onClick?: () => void;
}) {
  return (
    <div className={`glass-card ${className}`} onClick={onClick} style={{ padding: "1.75rem", ...style }}>
      {children}
    </div>
  );
}

// ── Tag ──────────────────────────────────────────────────────────────────────
export function Tag({ children, color = "var(--color-muted)" }: { children: ReactNode; color?: string }) {
  return (
    <span style={{
      fontSize: 11, padding: "3px 10px", borderRadius: 6,
      background: "rgba(255,255,255,0.05)", color,
      border: "1px solid rgba(255,255,255,0.08)", fontWeight: 500,
    }}>{children}</span>
  );
}

// ── FilterTabs ───────────────────────────────────────────────────────────────
export function FilterTabs({ items, active, onChange }: {
  items: string[]; active: string; onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
      {items.map(item => (
        <button key={item} onClick={() => onChange(item)} style={{
          padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer",
          border: `1.5px solid ${active === item ? "var(--color-accent)" : "rgba(0,212,255,0.12)"}`,
          background: active === item ? "rgba(0,212,255,0.1)" : "transparent",
          color: active === item ? "var(--color-accent)" : "var(--color-muted)",
          transition: "all 0.2s", fontFamily: "var(--font-body)",
        }}>{item}</button>
      ))}
    </div>
  );
}

// ── useInView ─────────────────────────────────────────────────────────────────
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

// ── useCounter ────────────────────────────────────────────────────────────────
export function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── AnimatedNumber ────────────────────────────────────────────────────────────
export function AnimatedNumber({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const val = useCounter(target, 2200, started);
  return <span>{val}{suffix}</span>;
}

// ── FormInput ─────────────────────────────────────────────────────────────────
export function FormInput({ label, type = "text", placeholder, value, onChange, required }: {
  label: string; type?: string; placeholder: string; value: string;
  onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ color: "var(--color-muted)", fontSize: 13, fontWeight: 500 }}>
        {label}{required && <span style={{ color: "var(--color-accent)", marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: "11px 14px", borderRadius: 8, fontSize: 14,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)",
          color: "var(--color-text)", transition: "border-color 0.2s, box-shadow 0.2s",
          fontFamily: "var(--font-body)",
        }}
      />
    </div>
  );
}

// ── FormTextarea ──────────────────────────────────────────────────────────────
export function FormTextarea({ label, placeholder, value, onChange, rows = 5, required }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; rows?: number; required?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ color: "var(--color-muted)", fontSize: 13, fontWeight: 500 }}>
        {label}{required && <span style={{ color: "var(--color-accent)", marginLeft: 3 }}>*</span>}
      </label>
      <textarea
        rows={rows} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: "11px 14px", borderRadius: 8, fontSize: 14,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)",
          color: "var(--color-text)", resize: "vertical", fontFamily: "var(--font-body)",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      />
    </div>
  );
}

// ── FormSelect ────────────────────────────────────────────────────────────────
export function FormSelect({ label, value, onChange, options, required }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; required?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ color: "var(--color-muted)", fontSize: 13, fontWeight: 500 }}>
        {label}{required && <span style={{ color: "var(--color-accent)", marginLeft: 3 }}>*</span>}
      </label>
      <select
        value={value} onChange={e => onChange(e.target.value)}
        style={{
          padding: "11px 14px", borderRadius: 8, fontSize: 14,
          background: "rgba(13,17,23,0.98)", border: "1px solid rgba(0,212,255,0.15)",
          color: value ? "var(--color-text)" : "var(--color-muted)",
          fontFamily: "var(--font-body)", cursor: "pointer",
          transition: "border-color 0.2s",
        }}
      >
        {options.map(o => (
          <option key={o.value} value={o.value} style={{ background: "#0D1117" }}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
