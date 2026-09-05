import { useState, useEffect } from "react";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/9779812345678"
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp"
        style={{
          position: "fixed", bottom: 26, right: 26, zIndex: 999,
          width: 52, height: 52, borderRadius: "50%",
          background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, boxShadow: "0 4px 20px rgba(37,211,102,0.4)", textDecoration: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
      >💬</a>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Back to top"
          style={{
            position: "fixed", bottom: 88, right: 26, zIndex: 999,
            width: 44, height: 44, borderRadius: "50%", cursor: "pointer",
            background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.3)",
            color: "var(--color-accent)", fontSize: 18,
            boxShadow: "0 4px 20px rgba(0,212,255,0.15)",
            transition: "all 0.2s", animation: "fadeIn 0.3s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.22)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.12)"; }}
        >↑</button>
      )}
    </>
  );
}
