import { useState, useEffect, useRef } from "react";

// ─── THEME & GLOBALS ───────────────────────────────────────────────────────
const COLORS = {
  primary: "#0A0E1A",
  secondary: "#111827",
  accent: "#00D4FF",
  accent2: "#7C3AED",
  accentGold: "#F59E0B",
  text: "#F1F5F9",
  muted: "#94A3B8",
  card: "rgba(17,24,39,0.85)",
  border: "rgba(0,212,255,0.15)",
};

const SERVICES = [
  { icon: "🌐", title: "Website Development", desc: "Modern, fast, scalable websites built with cutting-edge frameworks.", color: "#00D4FF" },
  { icon: "📱", title: "Mobile App Development", desc: "Cross-platform and native apps for iOS and Android.", color: "#7C3AED" },
  { icon: "🎨", title: "UI/UX Design", desc: "Pixel-perfect designs that convert visitors into customers.", color: "#F59E0B" },
  { icon: "🤖", title: "AI Solutions", desc: "Custom AI integrations, automation, and machine learning pipelines.", color: "#10B981" },
  { icon: "📈", title: "Digital Marketing", desc: "Data-driven marketing strategies to grow your online presence.", color: "#EF4444" },
  { icon: "🔍", title: "SEO Services", desc: "Top-of-page rankings through technical and content SEO.", color: "#00D4FF" },
  { icon: "✏️", title: "Graphic Design", desc: "Memorable brand identity and visual storytelling.", color: "#7C3AED" },
  { icon: "☁️", title: "Cloud & Hosting", desc: "Secure, scalable cloud infrastructure and managed hosting.", color: "#F59E0B" },
  { icon: "💼", title: "IT Consulting", desc: "Strategic technology roadmaps for business transformation.", color: "#10B981" },
  { icon: "📣", title: "Social Media Mgmt", desc: "Engage and grow your audience across all platforms.", color: "#EF4444" },
];

const STATS = [
  { value: 250, suffix: "+", label: "Projects Completed" },
  { value: 180, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 12, suffix: "", label: "Team Members" },
];

const TEAM = [
  { name: "Arjun Sharma", role: "CEO & Founder", initials: "AS", color: "#00D4FF" },
  { name: "Priya Thapa", role: "Lead Developer", initials: "PT", color: "#7C3AED" },
  { name: "Bikash Rai", role: "UI/UX Director", initials: "BR", color: "#F59E0B" },
  { name: "Sarita Karki", role: "AI Engineer", initials: "SK", color: "#10B981" },
];

const TESTIMONIALS = [
  { name: "Ramesh Koirala", company: "EcoMart Nepal", text: "Quantum Tech Nepal transformed our e-commerce platform. Sales doubled within 3 months. Exceptional work!", rating: 5 },
  { name: "Anita Gurung", company: "Summit Academy", text: "Our school management system is now seamless. Parents, teachers, and students love it. Highly recommended!", rating: 5 },
  { name: "Dev Poudel", company: "GreenField Agri", text: "Their AI-powered crop monitoring system is a game changer for our agri-tech business.", rating: 5 },
];

const PORTFOLIO = [
  { title: "EcoMart Platform", category: "E-commerce", tech: ["React", "Node.js", "PostgreSQL"], color: "#00D4FF", icon: "🛒" },
  { title: "Summit LMS", category: "School System", tech: ["Next.js", "Django", "Redis"], color: "#7C3AED", icon: "🎓" },
  { title: "GreenField AI", category: "Agri-tech", tech: ["Python", "TensorFlow", "React"], color: "#10B981", icon: "🌾" },
  { title: "TailorPro", category: "Tailoring System", tech: ["React Native", "Firebase"], color: "#F59E0B", icon: "✂️" },
  { title: "NepalSaaS", category: "SaaS Platform", tech: ["Vue.js", "FastAPI", "Docker"], color: "#EF4444", icon: "🚀" },
  { title: "QuickAI Tools", category: "AI Tools", tech: ["Next.js", "OpenAI", "Stripe"], color: "#7C3AED", icon: "🤖" },
];

const TECH_STACK = ["React", "Next.js", "Vue.js", "Node.js", "Django", "Python", "PostgreSQL", "MongoDB", "Docker", "AWS", "TensorFlow", "Figma"];

const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Blog", "Careers", "Contact"];

// ─── HOOKS ─────────────────────────────────────────────────────────────────
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─── SUBCOMPONENTS ─────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix, started }) {
  const val = useCounter(target, 2000, started);
  return <span>{val}{suffix}</span>;
}

function NavBar({ active, setActive, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,14,26,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
      transition: "all 0.3s ease", padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setActive("Home")}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700
          }}>Q</div>
          <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, letterSpacing: "-0.3px" }}>
            Quantum<span style={{ color: COLORS.accent }}> Tech</span>
          </span>
        </div>
        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => setActive(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "6px 14px", borderRadius: 8,
              color: active === l ? COLORS.accent : COLORS.muted,
              fontWeight: active === l ? 600 : 400, fontSize: 14,
              transition: "all 0.2s",
              borderBottom: active === l ? `2px solid ${COLORS.accent}` : "2px solid transparent",
            }}>{l}</button>
          ))}
          <button onClick={() => setDarkMode(!darkMode)} style={{
            background: "rgba(255,255,255,0.07)", border: "none", cursor: "pointer",
            padding: "6px 12px", borderRadius: 8, color: COLORS.text, fontSize: 16, marginLeft: 8
          }}>{darkMode ? "☀️" : "🌙"}</button>
          <button onClick={() => setActive("Contact")} style={{
            background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
            border: "none", cursor: "pointer", padding: "8px 20px",
            borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, marginLeft: 8,
            transition: "opacity 0.2s",
          }}>Get Started</button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ setActive }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return (
    <section style={{
      minHeight: "100vh", position: "relative", display: "flex", alignItems: "center",
      justifyContent: "center", overflow: "hidden", padding: "6rem 2rem 4rem",
    }}>
      {/* Animated mesh background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at ${mousePos.x}px ${mousePos.y}px, rgba(0,212,255,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(0,212,255,0.08) 0%, transparent 50%)`,
          transition: "background 0.1s ease",
        }} />
        {/* Grid lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00D4FF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Floating orbs */}
        {[
          { cx: "15%", cy: "25%", r: 180, c: "rgba(0,212,255,0.06)", dur: "8s" },
          { cx: "85%", cy: "70%", r: 220, c: "rgba(124,58,237,0.07)", dur: "10s" },
          { cx: "60%", cy: "15%", r: 130, c: "rgba(245,158,11,0.05)", dur: "12s" },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%",
            left: o.cx, top: o.cy, width: o.r * 2, height: o.r * 2,
            background: `radial-gradient(circle, ${o.c}, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            animation: `pulse ${o.dur} ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(0,212,255,0.08)", border: `1px solid rgba(0,212,255,0.25)`,
          borderRadius: 50, padding: "6px 20px", marginBottom: "2rem",
          animation: "fadeInUp 0.6s ease",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00D4FF", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ color: COLORS.accent, fontSize: 13, fontWeight: 500, letterSpacing: "0.05em" }}>Nepal's Premier Tech Partner</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 800, lineHeight: 1.08,
          color: COLORS.text, margin: "0 0 1.5rem",
          animation: "fadeInUp 0.7s ease 0.1s both",
          letterSpacing: "-2px",
          fontFamily: "'Sora', 'DM Sans', sans-serif",
        }}>
          We Build Digital<br />
          <span style={{
            background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 50%, #F59E0B 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Experiences</span> That Matter
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.25rem)", color: COLORS.muted, lineHeight: 1.7,
          maxWidth: 640, margin: "0 auto 3rem",
          animation: "fadeInUp 0.8s ease 0.2s both",
        }}>
          From startups to enterprises — we craft world-class software, apps, and digital solutions
          that drive growth, delight users, and define the future of business in Nepal and beyond.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeInUp 0.9s ease 0.3s both" }}>
          <button onClick={() => setActive("Services")} style={{
            background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
            border: "none", cursor: "pointer", padding: "14px 32px",
            borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 16,
            boxShadow: "0 0 40px rgba(0,212,255,0.3)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(0,212,255,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,212,255,0.3)"; }}
          >🚀 Get Started</button>
          <button onClick={() => setActive("Contact")} style={{
            background: "transparent",
            border: `1.5px solid ${COLORS.border}`,
            cursor: "pointer", padding: "14px 32px",
            borderRadius: 12, color: COLORS.text, fontWeight: 600, fontSize: 16,
            transition: "all 0.2s", backdropFilter: "blur(8px)",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.text; }}
          >📅 Book Consultation</button>
        </div>

        {/* Stats mini */}
        <div style={{
          display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap",
          marginTop: "4rem", animation: "fadeInUp 1s ease 0.4s both",
        }}>
          {STATS.slice(0, 3).map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: COLORS.accent }}>{s.value}{s.suffix}</div>
              <div style={{ fontSize: 13, color: COLORS.muted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        animation: "bounce 2s infinite",
      }}>
        <span style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.1em" }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${COLORS.accent}, transparent)` }} />
      </div>
    </section>
  );
}

function SectionTitle({ label, title, sub, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: "3rem" }}>
      {label && <div style={{
        display: "inline-block", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em",
        color: COLORS.accent, textTransform: "uppercase", marginBottom: "0.75rem",
        padding: "4px 14px", background: "rgba(0,212,255,0.08)", borderRadius: 20,
        border: "1px solid rgba(0,212,255,0.2)",
      }}>{label}</div>}
      <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: COLORS.text, margin: "0 0 1rem", lineHeight: 1.2, letterSpacing: "-1px", fontFamily: "'Sora', sans-serif" }}>{title}</h2>
      {sub && <p style={{ fontSize: "1.05rem", color: COLORS.muted, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

function Card({ children, style = {}, hover = true }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: "rgba(17,24,39,0.7)",
        border: `1px solid ${h ? "rgba(0,212,255,0.35)" : COLORS.border}`,
        borderRadius: 16, padding: "1.75rem",
        backdropFilter: "blur(12px)",
        transition: "all 0.3s ease",
        transform: h ? "translateY(-4px)" : "none",
        boxShadow: h ? "0 20px 60px rgba(0,212,255,0.1)" : "none",
        ...style,
      }}
    >{children}</div>
  );
}

function ServicesSection({ setActive }) {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
      <SectionTitle label="What We Do" title="Services Built for Growth" sub="From concept to deployment — every digital service your business needs, under one roof." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
        {SERVICES.map((s, i) => (
          <Card key={i} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: `all 0.5s ease ${i * 0.06}s`, cursor: "pointer" }}>
            <div style={{ fontSize: 32, marginBottom: "0.75rem" }}>{s.icon}</div>
            <div style={{
              width: 32, height: 3, borderRadius: 2, marginBottom: "1rem",
              background: `linear-gradient(90deg, ${s.color}, transparent)`,
            }} />
            <h3 style={{ color: COLORS.text, fontWeight: 700, fontSize: 16, margin: "0 0 0.5rem" }}>{s.title}</h3>
            <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            <div style={{ marginTop: "1rem" }}>
              <button onClick={() => setActive("Services")} style={{
                background: "none", border: "none", color: s.color, cursor: "pointer",
                fontSize: 13, fontWeight: 600, padding: 0, display: "flex", alignItems: "center", gap: 4,
              }}>Learn more →</button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
  const [ref, inView] = useInView(0.3);
  return (
    <section ref={ref} style={{ padding: "5rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(124,58,237,0.06) 100%)",
        borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`,
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", position: "relative", zIndex: 1 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-2px",
              background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              <AnimatedNumber target={s.value} suffix={s.suffix} started={inView} />
            </div>
            <div style={{ color: COLORS.muted, fontSize: 15, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PortfolioSection({ setActive }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "E-commerce", "School System", "Agri-tech", "SaaS Platform", "AI Tools"];
  const filtered = filter === "All" ? PORTFOLIO : PORTFOLIO.filter(p => p.category === filter);
  return (
    <section style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
      <SectionTitle label="Our Work" title="Featured Projects" sub="Real solutions we've built for real businesses across Nepal and beyond." />
      {/* Filter */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer",
            border: `1.5px solid ${filter === c ? COLORS.accent : COLORS.border}`,
            background: filter === c ? "rgba(0,212,255,0.12)" : "transparent",
            color: filter === c ? COLORS.accent : COLORS.muted, transition: "all 0.2s",
          }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
        {filtered.map((p, i) => (
          <Card key={i} style={{ cursor: "pointer" }}>
            <div style={{
              height: 140, borderRadius: 12, marginBottom: "1.25rem", overflow: "hidden",
              background: `linear-gradient(135deg, ${p.color}18, ${p.color}30)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${p.color}30`, fontSize: 48,
            }}>{p.icon}</div>
            <div style={{ display: "flex", gap: 8, marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${p.color}18`, color: p.color, fontWeight: 600 }}>{p.category}</span>
            </div>
            <h3 style={{ color: COLORS.text, fontWeight: 700, margin: "0 0 0.75rem", fontSize: 17 }}>{p.title}</h3>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {p.tech.map(t => (
                <span key={t} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)", color: COLORS.muted, border: `1px solid ${COLORS.border}` }}>{t}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <button onClick={() => setActive("Portfolio")} style={{
          padding: "12px 32px", borderRadius: 10,
          border: `1.5px solid ${COLORS.border}`, background: "transparent",
          color: COLORS.text, cursor: "pointer", fontWeight: 600, fontSize: 15,
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accent; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.text; }}
        >View All Projects →</button>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
      <SectionTitle label="The Team" title="People Behind Quantum Tech" sub="A passionate crew of designers, developers, and strategists." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
        {TEAM.map((m, i) => (
          <Card key={i} style={{ textAlign: "center" }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%", margin: "0 auto 1rem",
              background: `linear-gradient(135deg, ${m.color}40, ${m.color}20)`,
              border: `2px solid ${m.color}50`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontWeight: 700, color: m.color,
            }}>{m.initials}</div>
            <h3 style={{ color: COLORS.text, fontWeight: 700, margin: "0 0 0.25rem", fontSize: 15 }}>{m.name}</h3>
            <p style={{ color: COLORS.muted, fontSize: 13, margin: 0 }}>{m.role}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[active];
  return (
    <section style={{ padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(124,58,237,0.04), rgba(0,212,255,0.04))" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <SectionTitle label="Testimonials" title="What Clients Say" />
        <div style={{
          background: "rgba(17,24,39,0.8)", border: `1px solid ${COLORS.border}`,
          borderRadius: 20, padding: "2.5rem", backdropFilter: "blur(12px)",
          transition: "all 0.4s ease",
        }}>
          <div style={{ fontSize: 32, marginBottom: "1rem" }}>⭐⭐⭐⭐⭐</div>
          <p style={{ color: COLORS.text, fontSize: "1.1rem", lineHeight: 1.7, margin: "0 0 1.5rem", fontStyle: "italic" }}>"{t.text}"</p>
          <div>
            <div style={{ fontWeight: 700, color: COLORS.accent }}>{t.name}</div>
            <div style={{ color: COLORS.muted, fontSize: 13 }}>{t.company}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: "1.5rem" }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 24 : 8, height: 8, borderRadius: 4,
              background: i === active ? COLORS.accent : "rgba(255,255,255,0.2)",
              border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section style={{ padding: "4rem 2rem", maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
      <SectionTitle label="Tech Stack" title="Technologies We Master" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        {TECH_STACK.map((t, i) => (
          <div key={i} style={{
            padding: "10px 22px", borderRadius: 10,
            background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.border}`,
            color: COLORS.muted, fontSize: 14, fontWeight: 500,
            transition: "all 0.2s", cursor: "default",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accent; e.currentTarget.style.background = "rgba(0,212,255,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.muted; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          >{t}</div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ setActive }) {
  return (
    <section style={{ padding: "6rem 2rem" }}>
      <div style={{
        maxWidth: 800, margin: "0 auto", textAlign: "center",
        background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.1))",
        border: `1px solid ${COLORS.border}`, borderRadius: 24, padding: "4rem 2rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(0,212,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(124,58,237,0.08)", pointerEvents: "none" }} />
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: COLORS.text, margin: "0 0 1rem", letterSpacing: "-1px" }}>
          Ready to Build Something Amazing?
        </h2>
        <p style={{ color: COLORS.muted, fontSize: "1.05rem", margin: "0 0 2rem", lineHeight: 1.6 }}>
          Let's turn your idea into a product that stands out. Get a free consultation today.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setActive("Contact")} style={{
            background: "linear-gradient(135deg, #00D4FF, #7C3AED)", border: "none",
            cursor: "pointer", padding: "14px 36px", borderRadius: 12,
            color: "#fff", fontWeight: 700, fontSize: 16,
            boxShadow: "0 0 40px rgba(0,212,255,0.25)",
          }}>Start a Project</button>
          <button onClick={() => setActive("Portfolio")} style={{
            background: "transparent", border: `1.5px solid ${COLORS.border}`,
            cursor: "pointer", padding: "14px 36px", borderRadius: 12,
            color: COLORS.text, fontWeight: 600, fontSize: 16,
          }}>View Our Work</button>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  const timeline = [
    { year: "2019", event: "Founded in Kathmandu with 3 developers" },
    { year: "2020", event: "Delivered 20+ projects, expanded to UI/UX" },
    { year: "2021", event: "Launched AI Solutions division" },
    { year: "2022", event: "100+ clients milestone, expanded team to 10" },
    { year: "2023", event: "International clients, cloud practice launched" },
    { year: "2024", event: "250+ projects, 12 team members, growing fast" },
  ];
  const values = [
    { icon: "🎯", title: "Excellence", desc: "We don't ship good — we ship exceptional." },
    { icon: "🤝", title: "Trust", desc: "Long-term partnerships built on honesty and results." },
    { icon: "🔬", title: "Innovation", desc: "Constantly pushing the boundaries of what's possible." },
    { icon: "⚡", title: "Speed", desc: "On-time delivery without compromising quality." },
  ];
  return (
    <div style={{ padding: "8rem 2rem 6rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle label="About Us" title="Nepal's Most Trusted Tech Company" sub="We started with a bold vision: to build world-class software from Nepal. Today, we're making it real." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", marginBottom: "5rem" }}>
        <div>
          <h3 style={{ color: COLORS.text, fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Our Story</h3>
          <p style={{ color: COLORS.muted, lineHeight: 1.8, marginBottom: "1rem" }}>
            Quantum Tech Nepal was born in 2019 from a simple belief: that top-tier software development
            shouldn't be limited to Silicon Valley. Our founders — engineers who had worked at international
            firms — came back to build something Nepal could be proud of.
          </p>
          <p style={{ color: COLORS.muted, lineHeight: 1.8 }}>
            Today we serve clients from Kathmandu to Zurich, building everything from e-commerce platforms
            to AI-powered enterprise tools. Every line of code reflects our commitment to craft, clarity, and results.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {[
            { label: "Mission", text: "Empower businesses with technology that actually works.", icon: "🎯" },
            { label: "Vision", text: "Make Nepal a global hub for premium software development.", icon: "🌍" },
          ].map((item, i) => (
            <Card key={i}>
              <div style={{ fontSize: 28, marginBottom: "0.5rem" }}>{item.icon}</div>
              <div style={{ color: COLORS.accent, fontWeight: 700, fontSize: 13, marginBottom: "0.4rem" }}>{item.label.toUpperCase()}</div>
              <p style={{ color: COLORS.muted, fontSize: 14, margin: 0, lineHeight: 1.6 }}>{item.text}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Values */}
      <h3 style={{ color: COLORS.text, fontSize: "1.5rem", fontWeight: 700, textAlign: "center", marginBottom: "2rem" }}>Core Values</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "5rem" }}>
        {values.map((v, i) => (
          <Card key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: "0.75rem" }}>{v.icon}</div>
            <h4 style={{ color: COLORS.text, fontWeight: 700, margin: "0 0 0.5rem" }}>{v.title}</h4>
            <p style={{ color: COLORS.muted, fontSize: 14, margin: 0 }}>{v.desc}</p>
          </Card>
        ))}
      </div>

      {/* Timeline */}
      <h3 style={{ color: COLORS.text, fontSize: "1.5rem", fontWeight: 700, textAlign: "center", marginBottom: "2.5rem" }}>Company Timeline</h3>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {timeline.map((t, i) => (
          <div key={i} style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 60 }}>
              <div style={{
                background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
                color: "#fff", fontWeight: 700, fontSize: 13, padding: "4px 10px",
                borderRadius: 8, whiteSpace: "nowrap",
              }}>{t.year}</div>
              {i < timeline.length - 1 && <div style={{ width: 2, flex: 1, background: COLORS.border, marginTop: 6 }} />}
            </div>
            <div style={{ paddingTop: 4, paddingBottom: i < timeline.length - 1 ? "1rem" : 0 }}>
              <p style={{ color: COLORS.text, margin: 0, lineHeight: 1.6 }}>{t.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesPage({ setActive }) {
  const plans = [
    { name: "Starter", price: "NPR 15K", color: "#00D4FF", features: ["5-page website", "Mobile responsive", "Basic SEO", "1 month support"] },
    { name: "Growth", price: "NPR 40K", color: "#7C3AED", features: ["15-page website", "Custom design", "Advanced SEO", "CMS integration", "3 months support"], popular: true },
    { name: "Enterprise", price: "Custom", color: "#F59E0B", features: ["Unlimited pages", "Custom development", "AI integration", "Dedicated manager", "12 months support"] },
  ];
  return (
    <div style={{ padding: "8rem 2rem 6rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle label="Services" title="Everything Your Business Needs" sub="We cover the full technology spectrum — so you don't have to go anywhere else." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "5rem" }}>
        {SERVICES.map((s, i) => (
          <Card key={i}>
            <div style={{ fontSize: 36, marginBottom: "0.75rem" }}>{s.icon}</div>
            <h3 style={{ color: COLORS.text, fontWeight: 700, margin: "0 0 0.5rem" }}>{s.title}</h3>
            <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.6, margin: "0 0 1rem" }}>{s.desc}</p>
            <button onClick={() => setActive("Contact")} style={{
              padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: `${s.color}15`, border: `1px solid ${s.color}40`,
              color: s.color, cursor: "pointer",
            }}>Inquire →</button>
          </Card>
        ))}
      </div>

      {/* Pricing */}
      <SectionTitle label="Pricing" title="Transparent & Flexible Plans" sub="No hidden fees. Choose what fits your business stage." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.25rem" }}>
        {plans.map((p, i) => (
          <div key={i} style={{
            background: "rgba(17,24,39,0.7)", border: `1.5px solid ${p.popular ? p.color : COLORS.border}`,
            borderRadius: 16, padding: "2rem", backdropFilter: "blur(12px)",
            position: "relative", transition: "all 0.3s",
          }}>
            {p.popular && <div style={{
              position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
              background: `linear-gradient(135deg, #7C3AED, #00D4FF)`,
              color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 16px",
              borderRadius: 20, whiteSpace: "nowrap",
            }}>MOST POPULAR</div>}
            <div style={{ color: p.color, fontWeight: 700, fontSize: 13, marginBottom: "0.5rem" }}>{p.name.toUpperCase()}</div>
            <div style={{ fontSize: "2.5rem", fontWeight: 900, color: COLORS.text, margin: "0.5rem 0 1.5rem" }}>{p.price}</div>
            {p.features.map((f, j) => (
              <div key={j} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ color: p.color, fontSize: 16 }}>✓</span>
                <span style={{ color: COLORS.muted, fontSize: 14 }}>{f}</span>
              </div>
            ))}
            <button onClick={() => setActive("Contact")} style={{
              width: "100%", marginTop: "1.5rem", padding: "12px",
              borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer",
              background: p.popular ? `linear-gradient(135deg, ${p.color}, #00D4FF)` : "transparent",
              border: p.popular ? "none" : `1.5px solid ${p.color}`,
              color: p.popular ? "#fff" : p.color,
            }}>Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "E-commerce", "School System", "Agri-tech", "SaaS Platform", "AI Tools", "Tailoring System"];
  const filtered = filter === "All" ? PORTFOLIO : PORTFOLIO.filter(p => p.category === filter);
  return (
    <div style={{ padding: "8rem 2rem 6rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle label="Portfolio" title="Projects We're Proud Of" sub="A curated selection of work spanning industries, technologies, and business sizes." />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: "2.5rem" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer",
            border: `1.5px solid ${filter === c ? COLORS.accent : COLORS.border}`,
            background: filter === c ? "rgba(0,212,255,0.1)" : "transparent",
            color: filter === c ? COLORS.accent : COLORS.muted, transition: "all 0.2s",
          }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
        {filtered.map((p, i) => (
          <Card key={i}>
            <div style={{
              height: 160, borderRadius: 12, marginBottom: "1.25rem",
              background: `linear-gradient(135deg, ${p.color}20, ${p.color}35)`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56,
            }}>{p.icon}</div>
            <div style={{ marginBottom: "0.75rem" }}>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${p.color}15`, color: p.color, fontWeight: 600 }}>{p.category}</span>
            </div>
            <h3 style={{ color: COLORS.text, fontWeight: 700, margin: "0 0 0.75rem", fontSize: 18 }}>{p.title}</h3>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {p.tech.map(t => (
                <span key={t} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)", color: COLORS.muted, border: `1px solid ${COLORS.border}` }}>{t}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BlogPage() {
  const posts = [
    { cat: "AI", title: "How AI is Reshaping Software Development in 2024", date: "Dec 10, 2024", read: "5 min", icon: "🤖" },
    { cat: "Web Dev", title: "Next.js 15: What's New and Why It Matters", date: "Nov 25, 2024", read: "4 min", icon: "⚡" },
    { cat: "Cybersecurity", title: "Top 10 Security Practices for Your Web App", date: "Nov 12, 2024", read: "7 min", icon: "🔐" },
    { cat: "Business", title: "Why Your Nepal Business Needs a Digital Presence Now", date: "Oct 28, 2024", read: "6 min", icon: "📊" },
    { cat: "Design", title: "The Psychology of Color in UI/UX Design", date: "Oct 15, 2024", read: "5 min", icon: "🎨" },
    { cat: "Startups", title: "Building a MVP: Lessons from 50+ Projects", date: "Oct 2, 2024", read: "8 min", icon: "🚀" },
  ];
  const cats = ["All", "AI", "Web Dev", "Cybersecurity", "Business", "Design", "Startups"];
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? posts : posts.filter(p => p.cat === cat);
  return (
    <div style={{ padding: "8rem 2rem 6rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle label="Blog" title="Insights from the Trenches" sub="Tech articles, startup lessons, and industry perspectives from our team." />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: "2.5rem" }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer",
            border: `1.5px solid ${cat === c ? COLORS.accent : COLORS.border}`,
            background: cat === c ? "rgba(0,212,255,0.1)" : "transparent",
            color: cat === c ? COLORS.accent : COLORS.muted, transition: "all 0.2s",
          }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
        {filtered.map((p, i) => (
          <Card key={i} style={{ cursor: "pointer" }}>
            <div style={{
              height: 120, borderRadius: 10, marginBottom: "1.25rem",
              background: "rgba(0,212,255,0.05)", border: `1px solid ${COLORS.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48,
            }}>{p.icon}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "rgba(0,212,255,0.1)", color: COLORS.accent, fontWeight: 600 }}>{p.cat}</span>
              <span style={{ fontSize: 12, color: COLORS.muted }}>{p.date} · {p.read} read</span>
            </div>
            <h3 style={{ color: COLORS.text, fontWeight: 700, margin: "0 0 1rem", fontSize: 15, lineHeight: 1.4 }}>{p.title}</h3>
            <button style={{ color: COLORS.accent, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, padding: 0 }}>Read Article →</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CareersPage() {
  const jobs = [
    { title: "Senior React Developer", type: "Full-time", dept: "Engineering", loc: "Kathmandu" },
    { title: "UI/UX Designer", type: "Full-time", dept: "Design", loc: "Remote" },
    { title: "AI/ML Engineer", type: "Full-time", dept: "Engineering", loc: "Kathmandu" },
    { title: "Digital Marketing Specialist", type: "Full-time", dept: "Marketing", loc: "Kathmandu" },
    { title: "Backend Developer Intern", type: "Internship", dept: "Engineering", loc: "Kathmandu" },
    { title: "UI/UX Design Intern", type: "Internship", dept: "Design", loc: "Remote" },
  ];
  return (
    <div style={{ padding: "8rem 2rem 6rem", maxWidth: 900, margin: "0 auto" }}>
      <SectionTitle label="Careers" title="Join Our Team" sub="Help us build the future of tech in Nepal. We're looking for passionate people who love solving hard problems." />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "4rem" }}>
        {jobs.map((j, i) => (
          <Card key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h3 style={{ color: COLORS.text, fontWeight: 700, margin: "0 0 0.35rem" }}>{j.title}</h3>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: 12, color: COLORS.muted }}>{j.dept}</span>
                <span style={{ fontSize: 12, color: COLORS.muted }}>·</span>
                <span style={{ fontSize: 12, color: COLORS.muted }}>{j.loc}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{
                fontSize: 12, padding: "4px 12px", borderRadius: 20, fontWeight: 600,
                background: j.type === "Internship" ? "rgba(245,158,11,0.12)" : "rgba(0,212,255,0.1)",
                color: j.type === "Internship" ? "#F59E0B" : COLORS.accent,
              }}>{j.type}</span>
              <button style={{
                padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                background: "linear-gradient(135deg, #00D4FF, #7C3AED)", border: "none",
                color: "#fff", cursor: "pointer",
              }}>Apply</button>
            </div>
          </Card>
        ))}
      </div>
      <Card style={{ textAlign: "center" }}>
        <h3 style={{ color: COLORS.text, fontWeight: 700, marginBottom: "0.5rem" }}>Don't see the right role?</h3>
        <p style={{ color: COLORS.muted, marginBottom: "1.5rem", lineHeight: 1.6 }}>Send us your CV anyway. We're always on the lookout for exceptional talent.</p>
        <button style={{
          padding: "12px 28px", borderRadius: 10, fontWeight: 600, cursor: "pointer",
          background: "transparent", border: `1.5px solid ${COLORS.accent}`, color: COLORS.accent,
        }}>Send Open Application</button>
      </Card>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSend = () => {
    if (form.name && form.email && form.message) { setSent(true); }
  };
  return (
    <div style={{ padding: "8rem 2rem 6rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle label="Contact" title="Let's Start a Conversation" sub="Tell us about your project and we'll get back to you within 24 hours." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "3rem", alignItems: "start" }}>
        {/* Info */}
        <div>
          {[
            { icon: "📍", label: "Address", value: "Thamel, Kathmandu, Nepal" },
            { icon: "📧", label: "Email", value: "hello@quantumtechnepal.com" },
            { icon: "📞", label: "Phone", value: "+977 9812345678" },
            { icon: "💬", label: "WhatsApp", value: "+977 9812345678" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: "rgba(0,212,255,0.08)", border: `1px solid ${COLORS.border}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
              }}>{item.icon}</div>
              <div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 3 }}>{item.label}</div>
                <div style={{ color: COLORS.text, fontWeight: 500 }}>{item.value}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "2rem" }}>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: "0.75rem" }}>Find us on</div>
            <div style={{ display: "flex", gap: 10 }}>
              {["LinkedIn", "Twitter", "Facebook", "Instagram"].map(s => (
                <button key={s} style={{
                  padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                  background: "rgba(255,255,255,0.05)", border: `1px solid ${COLORS.border}`,
                  color: COLORS.muted, cursor: "pointer",
                }}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <Card>
          {sent ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: 52, marginBottom: "1rem" }}>✅</div>
              <h3 style={{ color: COLORS.text, fontWeight: 700, marginBottom: "0.5rem" }}>Message Sent!</h3>
              <p style={{ color: COLORS.muted }}>We'll get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)} style={{ marginTop: "1.5rem", padding: "10px 24px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: "transparent", color: COLORS.muted, cursor: "pointer" }}>Send Another</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ color: COLORS.text, fontWeight: 700, margin: "0 0 0.5rem" }}>Send Us a Message</h3>
              {[
                { key: "name", label: "Full Name", placeholder: "Ramesh Sharma", type: "text" },
                { key: "email", label: "Email Address", placeholder: "ramesh@company.com", type: "email" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: "block", color: COLORS.muted, fontSize: 13, marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 8, fontSize: 14,
                      background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.border}`,
                      color: COLORS.text, outline: "none", boxSizing: "border-box",
                    }} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", color: COLORS.muted, fontSize: 13, marginBottom: 6 }}>Service Needed</label>
                <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8, fontSize: 14,
                  background: "rgba(17,24,39,0.95)", border: `1px solid ${COLORS.border}`,
                  color: COLORS.text, outline: "none",
                }}>
                  <option value="">Select a service</option>
                  {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", color: COLORS.muted, fontSize: 13, marginBottom: 6 }}>Your Message</label>
                <textarea rows={5} placeholder="Tell us about your project..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: 8, fontSize: 14,
                    background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.border}`,
                    color: COLORS.text, outline: "none", resize: "vertical", boxSizing: "border-box",
                    fontFamily: "inherit",
                  }} />
              </div>
              <button onClick={handleSend} style={{
                padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer",
                background: "linear-gradient(135deg, #00D4FF, #7C3AED)", border: "none", color: "#fff",
              }}>Send Message 🚀</button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Footer({ setActive }) {
  return (
    <footer style={{
      borderTop: `1px solid ${COLORS.border}`,
      background: "rgba(10,14,26,0.98)",
      padding: "4rem 2rem 2rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 16,
              }}>Q</div>
              <span style={{ fontWeight: 700, color: COLORS.text, fontSize: 16 }}>Quantum Tech Nepal</span>
            </div>
            <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 280, margin: "0 0 1.5rem" }}>
              Building digital experiences that transform businesses. Your vision, our expertise.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["🐦", "💼", "📘", "📸"].map((icon, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: 8, cursor: "pointer",
                  background: "rgba(255,255,255,0.05)", border: `1px solid ${COLORS.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{icon}</div>
              ))}
            </div>
          </div>
          {[
            { title: "Company", links: ["About", "Services", "Portfolio", "Blog", "Careers"] },
            { title: "Services", links: ["Web Development", "Mobile Apps", "UI/UX Design", "AI Solutions", "Digital Marketing"] },
            { title: "Contact", links: ["hello@quantumtechnepal.com", "+977 9812345678", "Thamel, Kathmandu", "Mon–Fri 9AM–6PM"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ color: COLORS.text, fontWeight: 700, fontSize: 14, marginBottom: "1.25rem" }}>{col.title}</h4>
              {col.links.map((l, j) => (
                <div key={j} style={{ marginBottom: "0.6rem" }}>
                  <span onClick={() => NAV_LINKS.includes(l) && setActive(l)} style={{
                    color: COLORS.muted, fontSize: 13, cursor: NAV_LINKS.includes(l) ? "pointer" : "default",
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={e => { if (NAV_LINKS.includes(l)) e.currentTarget.style.color = COLORS.accent; }}
                    onMouseLeave={e => { e.currentTarget.style.color = COLORS.muted; }}
                  >{l}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ color: COLORS.muted, fontSize: 13 }}>© 2024 Quantum Tech Nepal. All rights reserved.</span>
          <span style={{ color: COLORS.muted, fontSize: 13 }}>Built with ❤️ in Kathmandu</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingButtons({ setActive }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      {/* WhatsApp */}
      <button style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 999,
        width: 52, height: 52, borderRadius: "50%", border: "none", cursor: "pointer",
        background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
      }}>💬</button>
      {/* Back to top */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
          position: "fixed", bottom: 84, right: 24, zIndex: 999,
          width: 44, height: 44, borderRadius: "50%", cursor: "pointer",
          background: "rgba(0,212,255,0.15)", border: `1px solid ${COLORS.accent}`,
          color: COLORS.accent, fontSize: 18,
          boxShadow: "0 4px 20px rgba(0,212,255,0.2)",
        }}>↑</button>
      )}
    </>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("Home");
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [active]);

  if (loading) return (
    <div style={{
      position: "fixed", inset: 0, background: COLORS.primary,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem",
      zIndex: 9999,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 18,
        background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 32, fontWeight: 900, animation: "pulse 1s ease infinite",
      }}>Q</div>
      <div style={{ color: COLORS.text, fontSize: 18, fontWeight: 700, letterSpacing: "-0.5px" }}>
        Quantum Tech<span style={{ color: COLORS.accent }}> Nepal</span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: "50%", background: COLORS.accent,
            animation: `bounce 1.2s ease ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0);opacity:0.5} 50%{transform:translateY(-10px);opacity:1} }
        @keyframes pulse { 0%,100%{opacity:0.8;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );

  return (
    <div style={{
      background: COLORS.primary, minHeight: "100vh", color: COLORS.text,
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.primary}; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 3px; }
        input, select, textarea { color-scheme: dark; }
      `}</style>

      <NavBar active={active} setActive={setActive} darkMode={darkMode} setDarkMode={setDarkMode} />

      {active === "Home" && (
        <>
          <HeroSection setActive={setActive} />
          <TechStackSection />
          <ServicesSection setActive={setActive} />
          <StatsSection />
          <PortfolioSection setActive={setActive} />
          <TestimonialsSection />
          <TeamSection />
          <CTASection setActive={setActive} />
        </>
      )}
      {active === "About" && <AboutPage />}
      {active === "Services" && <ServicesPage setActive={setActive} />}
      {active === "Portfolio" && <PortfolioPage />}
      {active === "Blog" && <BlogPage />}
      {active === "Careers" && <CareersPage />}
      {active === "Contact" && <ContactPage />}

      <Footer setActive={setActive} />
      <FloatingButtons setActive={setActive} />
    </div>
  );
}
