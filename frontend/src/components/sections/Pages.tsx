import { useState } from "react";
import { SERVICES, PORTFOLIO, BLOG_POSTS, JOBS, PLANS, TEAM } from "@/constants";
import { SectionTitle, Card, FilterTabs, Tag, FormInput, FormTextarea, FormSelect, Badge } from "@/components/ui";

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
export function AboutPage() {
  const timeline = [
    { year: "2019", event: "Founded in Kathmandu with 3 engineers, a bold vision, and zero clients." },
    { year: "2020", event: "Delivered 20+ projects, expanded to UI/UX, revenue NPR 2M+." },
    { year: "2021", event: "Launched AI Solutions division, hired 4 new engineers." },
    { year: "2022", event: "100+ client milestone. Team doubled to 10. First international client." },
    { year: "2023", event: "Clients in 8 countries. Launched Cloud & Hosting practice." },
    { year: "2025", event: "250+ projects, 12 team members, NPR 15M+ in annual revenue and growing." },
  ];
  const values = [
    { icon: "🎯", title: "Excellence", desc: "We don't ship good — we ship exceptional. Every pixel, every line of code.", color: "#00D4FF" },
    { icon: "🤝", title: "Trust", desc: "Long-term partnerships built on transparency, honesty, and consistent results.", color: "#7C3AED" },
    { icon: "🔬", title: "Innovation", desc: "Constantly pushing the boundaries of what technology can do for your business.", color: "#F59E0B" },
    { icon: "⚡", title: "Speed", desc: "On-time delivery every time, without ever compromising on quality.", color: "#10B981" },
  ];

  return (
    <div style={{ padding: "8rem 2rem 6rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle label="About Us" title="Nepal's Most Trusted Tech Company" sub="We started with a bold vision: to build world-class software from Nepal. Today, we're making it real — one project at a time." />

      {/* Story */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start", marginBottom: "5rem" }}>
        <div>
          <h3 className="font-display" style={{ color: "var(--color-text)", fontSize: "1.4rem", fontWeight: 600, marginBottom: "1.25rem" }}>Our Story</h3>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            Quantum Tech Nepal was born in 2019 from a simple belief: that world-class software
            development shouldn't be limited to Silicon Valley. Our founders — engineers who had
            worked at international firms — returned to Nepal to build something the country could be proud of.
          </p>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.85, marginBottom: "2rem" }}>
            Today we serve clients from Kathmandu to Zurich, building everything from e-commerce
            platforms to AI-powered enterprise tools. Every project reflects our commitment to craft,
            clarity, and outcomes that actually move the needle.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 10, padding: "0.75rem 1.25rem" }}>
              <div className="font-display" style={{ color: "var(--color-accent)", fontSize: "1.4rem", fontWeight: 700 }}>NPR 15M+</div>
              <div style={{ color: "var(--color-muted)", fontSize: 12 }}>Annual Revenue</div>
            </div>
            <div style={{ background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: 10, padding: "0.75rem 1.25rem" }}>
              <div className="font-display" style={{ color: "#7C3AED", fontSize: "1.4rem", fontWeight: 700 }}>8 Countries</div>
              <div style={{ color: "var(--color-muted)", fontSize: 12 }}>Clients Served</div>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {[
            { label: "Mission", text: "Empower businesses with technology that actually works and delivers measurable results.", icon: "🎯" },
            { label: "Vision", text: "Make Nepal a globally recognized hub for premium software development by 2030.", icon: "🌍" },
          ].map((item, i) => (
            <Card key={i} style={{ padding: "1.5rem" }}>
              <div style={{ fontSize: 26, marginBottom: "0.75rem" }}>{item.icon}</div>
              <div style={{ color: "var(--color-accent)", fontWeight: 700, fontSize: 11, marginBottom: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.label}</div>
              <p style={{ color: "var(--color-muted)", fontSize: 13.5, margin: 0, lineHeight: 1.65 }}>{item.text}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Values */}
      <div style={{ marginBottom: "5rem" }}>
        <h3 className="font-display" style={{ color: "var(--color-text)", fontSize: "1.4rem", fontWeight: 600, textAlign: "center", marginBottom: "2rem" }}>Core Values</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.1rem" }}>
          {values.map((v, i) => (
            <Card key={i} style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
              <div style={{ fontSize: 32, marginBottom: "0.75rem" }}>{v.icon}</div>
              <div style={{ width: 32, height: 3, borderRadius: 2, margin: "0 auto 1rem", background: `linear-gradient(90deg, ${v.color}, transparent)` }} />
              <h4 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, margin: "0 0 0.5rem" }}>{v.title}</h4>
              <p style={{ color: "var(--color-muted)", fontSize: 13.5, margin: 0, lineHeight: 1.65 }}>{v.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={{ marginBottom: "5rem" }}>
        <h3 className="font-display" style={{ color: "var(--color-text)", fontSize: "1.4rem", fontWeight: 600, textAlign: "center", marginBottom: "2rem" }}>Meet the Team</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.1rem" }}>
          {TEAM.map((m, i) => (
            <Card key={i} style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%", margin: "0 auto 1rem",
                background: `linear-gradient(135deg, ${m.color}40, ${m.color}15)`,
                border: `2px solid ${m.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: m.color,
              }}>{m.initials}</div>
              <h3 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, margin: "0 0 0.25rem", fontSize: 15 }}>{m.name}</h3>
              <p style={{ color: m.color, fontSize: 13, margin: "0 0 0.5rem", fontWeight: 500 }}>{m.role}</p>
              <p style={{ color: "var(--color-muted)", fontSize: 12.5, margin: 0 }}>{m.bio}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="font-display" style={{ color: "var(--color-text)", fontSize: "1.4rem", fontWeight: 600, textAlign: "center", marginBottom: "2.5rem" }}>Company Timeline</h3>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          {timeline.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 64 }}>
                <div className="font-mono" style={{
                  background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
                  color: "#fff", fontWeight: 700, fontSize: 12, padding: "4px 10px",
                  borderRadius: 7, whiteSpace: "nowrap",
                }}>{t.year}</div>
                {i < timeline.length - 1 && <div style={{ width: 1.5, flex: 1, background: "rgba(0,212,255,0.15)", marginTop: 6 }} />}
              </div>
              <div style={{ paddingTop: 3, paddingBottom: i < timeline.length - 1 ? "1rem" : 0 }}>
                <p style={{ color: "var(--color-text)", margin: 0, lineHeight: 1.65, fontSize: 14.5 }}>{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SERVICES PAGE ─────────────────────────────────────────────────────────────
export function ServicesPage({ setActive }: { setActive: (p: string) => void }) {
  const [inquiryOpen, setInquiryOpen] = useState<string | null>(null);

  return (
    <div style={{ padding: "8rem 2rem 6rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle label="Services" title="Everything Your Business Needs" sub="We cover the full technology spectrum — so you don't have to go anywhere else." />

      {/* Services grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1.25rem", marginBottom: "5rem" }}>
        {SERVICES.map((s, i) => (
          <Card key={i} style={{ position: "relative" }}>
            {s.tag && (
              <div style={{
                position: "absolute", top: 14, right: 14,
                fontSize: 10, fontWeight: 700, padding: "3px 9px",
                borderRadius: 20, background: `${s.color}20`, color: s.color,
                border: `1px solid ${s.color}35`,
              }}>{s.tag}</div>
            )}
            <div style={{ fontSize: 36, marginBottom: "0.75rem" }}>{s.icon}</div>
            <h3 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, margin: "0 0 0.5rem" }}>{s.title}</h3>
            <p style={{ color: "var(--color-muted)", fontSize: 13.5, lineHeight: 1.65, margin: "0 0 1.25rem" }}>{s.desc}</p>
            <button onClick={() => setActive("Contact")} style={{
              padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: `${s.color}12`, border: `1px solid ${s.color}35`,
              color: s.color, cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s",
            }}>Get Quote →</button>
          </Card>
        ))}
      </div>

      {/* Pricing */}
      <SectionTitle label="Pricing" title="Transparent & Flexible Plans" sub="No hidden fees. Choose what fits your business stage." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
        {PLANS.map((p, i) => (
          <div key={i} style={{
            background: "rgba(13,17,23,0.8)", border: `1.5px solid ${p.popular ? p.color : "rgba(0,212,255,0.12)"}`,
            borderRadius: 16, padding: "2rem", backdropFilter: "blur(12px)",
            position: "relative", transition: "transform 0.3s",
          }}>
            {p.popular && (
              <div style={{
                position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                background: `linear-gradient(135deg, ${p.color}, #00D4FF)`,
                color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 18px",
                borderRadius: 20, whiteSpace: "nowrap",
              }}>✦ MOST POPULAR</div>
            )}
            <div style={{ color: p.color, fontWeight: 700, fontSize: 11, marginBottom: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.name}</div>
            <div className="font-display" style={{ fontSize: "2.4rem", fontWeight: 700, color: "var(--color-text)", margin: "0.5rem 0 0.25rem" }}>{p.price}</div>
            <div style={{ color: "var(--color-muted)", fontSize: 12, marginBottom: "1.75rem" }}>{p.period}</div>
            {p.features.map((f, j) => (
              <div key={j} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ color: p.color, fontSize: 14, flexShrink: 0 }}>✓</span>
                <span style={{ color: "var(--color-muted)", fontSize: 13.5 }}>{f}</span>
              </div>
            ))}
            <button onClick={() => setActive("Contact")} style={{
              width: "100%", marginTop: "1.75rem", padding: "12px",
              borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer",
              fontFamily: "var(--font-body)",
              background: p.popular ? `linear-gradient(135deg, ${p.color}, #00D4FF)` : "transparent",
              border: p.popular ? "none" : `1.5px solid ${p.color}`,
              color: p.popular ? "#fff" : p.color,
              transition: "opacity 0.2s",
            }}>{p.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PORTFOLIO PAGE ────────────────────────────────────────────────────────────
export function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "E-commerce", "Education", "Agri-tech", "SaaS", "Mobile App", "AI Tools"];
  const filtered = filter === "All" ? PORTFOLIO : PORTFOLIO.filter(p => p.category === filter);

  return (
    <div style={{ padding: "8rem 2rem 6rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle label="Portfolio" title="Projects We're Proud Of" sub="A curated selection of work spanning industries, technologies, and business sizes." />
      <FilterTabs items={categories} active={filter} onChange={setFilter} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
        {filtered.map((p, i) => (
          <Card key={i} style={{ cursor: "pointer" }}>
            <div style={{
              height: 160, borderRadius: 12, marginBottom: "1.25rem",
              background: `linear-gradient(135deg, ${p.color}1A, ${p.color}30)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${p.color}25`, fontSize: 56,
            }}>{p.icon}</div>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${p.color}15`, color: p.color, fontWeight: 600, display: "inline-block", marginBottom: "0.75rem" }}>{p.category}</span>
            <h3 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, margin: "0 0 0.5rem", fontSize: 18 }}>{p.title}</h3>
            <p style={{ color: "var(--color-muted)", fontSize: 13.5, lineHeight: 1.6, margin: "0 0 1rem" }}>{p.desc}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {p.tech.map(t => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── BLOG PAGE ─────────────────────────────────────────────────────────────────
export function BlogPage() {
  const cats = ["All", "AI", "Web Dev", "Security", "Business", "Design", "Startups"];
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? BLOG_POSTS : BLOG_POSTS.filter(p => p.cat === cat);

  return (
    <div style={{ padding: "8rem 2rem 6rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle label="Blog" title="Insights from the Trenches" sub="Tech articles, startup lessons, and industry perspectives from our team." />
      <FilterTabs items={cats} active={cat} onChange={setCat} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
        {filtered.map((p, i) => (
          <Card key={i} style={{ cursor: "pointer" }}>
            <div style={{
              height: 120, borderRadius: 10, marginBottom: "1.25rem",
              background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48,
            }}>{p.icon}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "rgba(0,212,255,0.1)", color: "var(--color-accent)", fontWeight: 600 }}>{p.cat}</span>
              <span style={{ fontSize: 12, color: "var(--color-muted)" }}>{p.date} · {p.read} read</span>
            </div>
            <h3 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, margin: "0 0 0.6rem", fontSize: 15, lineHeight: 1.4 }}>{p.title}</h3>
            <p style={{ color: "var(--color-muted)", fontSize: 13.5, lineHeight: 1.6, margin: "0 0 1rem" }}>{p.excerpt}</p>
            <button style={{ color: "var(--color-accent)", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, padding: 0, fontFamily: "var(--font-body)" }}>
              Read Article →
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── CAREERS PAGE ──────────────────────────────────────────────────────────────
export function CareersPage() {
  const perks = [
    { icon: "💰", title: "Competitive Pay", desc: "Market-leading salaries with performance bonuses" },
    { icon: "🏡", title: "Remote Friendly", desc: "Work from anywhere — results over attendance" },
    { icon: "📚", title: "Learning Budget", desc: "NPR 30K/year for courses, books, and conferences" },
    { icon: "🏥", title: "Health Coverage", desc: "Full health insurance for you and your family" },
  ];

  return (
    <div style={{ padding: "8rem 2rem 6rem", maxWidth: 1000, margin: "0 auto" }}>
      <SectionTitle label="Careers" title="Join Our Team" sub="Help us build the future of tech in Nepal. We're looking for passionate people who love solving hard problems." />

      {/* Perks */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "3.5rem" }}>
        {perks.map((p, i) => (
          <Card key={i} style={{ textAlign: "center", padding: "1.5rem" }}>
            <div style={{ fontSize: 28, marginBottom: "0.6rem" }}>{p.icon}</div>
            <h4 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, fontSize: 14, margin: "0 0 0.4rem" }}>{p.title}</h4>
            <p style={{ color: "var(--color-muted)", fontSize: 13, margin: 0, lineHeight: 1.55 }}>{p.desc}</p>
          </Card>
        ))}
      </div>

      {/* Jobs list */}
      <h3 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, marginBottom: "1.5rem", fontSize: "1.3rem" }}>Open Positions</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "3.5rem" }}>
        {JOBS.map((j, i) => (
          <Card key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h3 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, margin: "0 0 0.35rem", fontSize: 15 }}>{j.title}</h3>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12.5, color: "var(--color-muted)" }}>🏢 {j.dept}</span>
                <span style={{ fontSize: 12.5, color: "var(--color-muted)" }}>📍 {j.loc}</span>
                <span style={{ fontSize: 12.5, color: "var(--color-muted)" }}>💰 {j.salary}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{
                fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 600,
                background: j.type === "Internship" ? "rgba(245,158,11,0.1)" : "rgba(0,212,255,0.1)",
                color: j.type === "Internship" ? "#F59E0B" : "var(--color-accent)",
                border: `1px solid ${j.type === "Internship" ? "rgba(245,158,11,0.2)" : "rgba(0,212,255,0.2)"}`,
              }}>{j.type}</span>
              <button className="btn-primary" style={{ padding: "8px 20px", fontSize: 13 }}>Apply</button>
            </div>
          </Card>
        ))}
      </div>

      {/* Open application */}
      <Card style={{ textAlign: "center", padding: "2.5rem" }}>
        <h3 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, marginBottom: "0.6rem" }}>Don't see your role?</h3>
        <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem", lineHeight: 1.7 }}>
          Send us your CV anyway. We're always on the lookout for exceptional talent and create roles for the right people.
        </p>
        <button className="btn-outline">Send Open Application</button>
      </Card>
    </div>
  );
}

// ── CONTACT PAGE ──────────────────────────────────────────────────────────────
export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message required";
    return e;
  };

  const handleSend = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep("success");
  };

  const contactInfo = [
    { icon: "📍", label: "Address", value: "Thamel, Kathmandu, Nepal" },
    { icon: "📧", label: "Email", value: "hello@quantumtechnepal.com" },
    { icon: "📞", label: "Phone", value: "+977 9812345678" },
    { icon: "💬", label: "WhatsApp", value: "+977 9812345678" },
    { icon: "🕐", label: "Hours", value: "Mon–Fri, 9AM–6PM NST" },
  ];

  return (
    <div style={{ padding: "8rem 2rem 6rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle label="Contact" title="Let's Start a Conversation" sub="Tell us about your project and we'll get back to you within 24 hours — guaranteed." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "3rem", alignItems: "start" }}>
        {/* Left: info */}
        <div>
          <div style={{ marginBottom: "2rem" }}>
            {contactInfo.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                }}>{item.icon}</div>
                <div>
                  <div style={{ color: "var(--color-muted)", fontSize: 12, marginBottom: 3, fontWeight: 500 }}>{item.label}</div>
                  <div style={{ color: "var(--color-text)", fontWeight: 500, fontSize: 14 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Response promise */}
          <Card style={{ padding: "1.5rem", background: "rgba(0,212,255,0.05)" }}>
            <h4 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, margin: "0 0 0.75rem", fontSize: 14 }}>Our Response Promise</h4>
            {[
              "📧 Email reply within 24 hours",
              "📞 Phone call within 2 business hours",
              "🎯 Free project consultation",
              "📄 Detailed proposal within 3 days",
            ].map((item, i) => (
              <div key={i} style={{ color: "var(--color-muted)", fontSize: 13.5, marginBottom: "0.5rem" }}>{item}</div>
            ))}
          </Card>

          {/* Socials */}
          <div style={{ marginTop: "1.75rem" }}>
            <p style={{ color: "var(--color-muted)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Find Us On</p>
            <div style={{ display: "flex", gap: 8 }}>
              {["LinkedIn", "Twitter", "Facebook", "Instagram"].map(s => (
                <button key={s} style={{
                  padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.12)",
                  color: "var(--color-muted)", cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)"; (e.currentTarget as HTMLElement).style.color = "var(--color-accent)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "var(--color-muted)"; }}
                >{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <Card>
          {step === "success" ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%", margin: "0 auto 1.5rem",
                background: "rgba(16,185,129,0.12)", border: "2px solid rgba(16,185,129,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32,
              }}>✅</div>
              <h3 className="font-display" style={{ color: "var(--color-text)", fontSize: "1.4rem", marginBottom: "0.75rem" }}>Message Sent!</h3>
              <p style={{ color: "var(--color-muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                We've received your message and will reply to <strong style={{ color: "var(--color-text)" }}>{form.email}</strong> within 24 hours.
              </p>
              <p style={{ color: "var(--color-muted)", fontSize: 13.5, marginBottom: "2rem" }}>
                Need it faster? Call us at <strong style={{ color: "var(--color-accent)" }}>+977 9812345678</strong>
              </p>
              <button onClick={() => { setStep("form"); setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" }); }} className="btn-outline">
                Send Another Message
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
              <h3 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, margin: "0 0 0.25rem", fontSize: "1.15rem" }}>Send Us a Message</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                <div>
                  <FormInput label="Full Name" placeholder="Ramesh Sharma" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
                  {errors.name && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 3 }}>{errors.name}</p>}
                </div>
                <div>
                  <FormInput label="Email Address" type="email" placeholder="ramesh@company.com" value={form.email} onChange={v => setForm({ ...form, email: v })} required />
                  {errors.email && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 3 }}>{errors.email}</p>}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                <FormInput label="Phone / WhatsApp" type="tel" placeholder="+977 98XXXXXXXX" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />
                <FormSelect
                  label="Service Needed"
                  value={form.service}
                  onChange={v => setForm({ ...form, service: v })}
                  options={[
                    { value: "", label: "Select a service..." },
                    ...SERVICES.map(s => ({ value: s.title, label: s.title })),
                    { value: "other", label: "Other / Not Sure" },
                  ]}
                />
              </div>

              <FormSelect
                label="Budget Range"
                value={form.budget}
                onChange={v => setForm({ ...form, budget: v })}
                options={[
                  { value: "", label: "Select your budget..." },
                  { value: "under-15k", label: "Under NPR 15K" },
                  { value: "15k-50k", label: "NPR 15K – 50K" },
                  { value: "50k-150k", label: "NPR 50K – 1.5L" },
                  { value: "150k+", label: "NPR 1.5L+" },
                  { value: "discuss", label: "Let's Discuss" },
                ]}
              />

              <div>
                <FormTextarea
                  label="Your Message"
                  placeholder="Tell us about your project — what you want to build, your goals, timeline, and any existing systems we should know about..."
                  value={form.message}
                  onChange={v => setForm({ ...form, message: v })}
                  rows={5}
                  required
                />
                {errors.message && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 3 }}>{errors.message}</p>}
              </div>

              <button onClick={handleSend} disabled={loading} className="btn-primary" style={{ padding: "14px", fontSize: 15, opacity: loading ? 0.75 : 1 }}>
                {loading ? "Sending..." : "Send Message 🚀"}
              </button>

              <p style={{ textAlign: "center", fontSize: 12, color: "var(--color-muted)" }}>
                🔒 Your information is private and never shared with third parties.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
