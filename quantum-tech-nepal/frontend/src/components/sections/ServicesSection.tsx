import { useState } from "react";
import { SERVICES } from "@/constants";
import { SectionTitle, Card, useInView, FormInput, FormTextarea, FormSelect } from "@/components/ui";

interface ServicesSectionProps { setActive: (page: string) => void; }

// ── Service Inquiry Modal ─────────────────────────────────────────────────────
function InquiryModal({ service, onClose }: { service: typeof SERVICES[0]; onClose: () => void }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    budget: "", timeline: "", details: "",
  });
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.details.trim()) e.details = "Please describe your project";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    // Simulate API call — replace with actual contactApi.send(...)
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setStep("success");
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(7,9,15,0.92)", backdropFilter: "blur(16px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1.5rem", animation: "fadeIn 0.2s ease",
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "#0D1117", border: "1px solid rgba(0,212,255,0.2)",
        borderRadius: 20, padding: "2.5rem", width: "100%", maxWidth: 560,
        maxHeight: "90vh", overflowY: "auto",
        animation: "fadeInUp 0.3s ease",
        position: "relative",
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(255,255,255,0.07)", border: "none",
          borderRadius: 8, width: 32, height: 32,
          color: "var(--color-muted)", cursor: "pointer", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>✕</button>

        {step === "success" ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%", margin: "0 auto 1.5rem",
              background: "rgba(16,185,129,0.12)", border: "2px solid rgba(16,185,129,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32,
            }}>✅</div>
            <h3 className="font-display" style={{ color: "var(--color-text)", fontSize: "1.5rem", marginBottom: "0.75rem" }}>Inquiry Sent!</h3>
            <p style={{ color: "var(--color-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
              Thank you! We'll review your <strong style={{ color: service.color }}>{service.title}</strong> inquiry
              and get back to you within <strong style={{ color: "var(--color-text)" }}>24 hours</strong>.
            </p>
            <div style={{
              background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)",
              borderRadius: 12, padding: "1rem 1.5rem", marginBottom: "1.5rem", textAlign: "left",
            }}>
              <p style={{ fontSize: 13, color: "var(--color-muted)", margin: 0 }}>📧 Confirmation sent to <strong style={{ color: "var(--color-text)" }}>{form.email}</strong></p>
              <p style={{ fontSize: 13, color: "var(--color-muted)", margin: "0.5rem 0 0" }}>📞 Or reach us at <strong style={{ color: "var(--color-accent)" }}>+977 9812345678</strong></p>
            </div>
            <button onClick={onClose} className="btn-primary" style={{ padding: "12px 32px" }}>Close</button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.75rem" }}>
              <div style={{
                width: 50, height: 50, borderRadius: 12, fontSize: 22,
                background: `${service.color}15`, border: `1px solid ${service.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{service.icon}</div>
              <div>
                <h3 className="font-display" style={{ color: "var(--color-text)", fontSize: "1.2rem", marginBottom: 2 }}>
                  Inquire About {service.title}
                </h3>
                <p style={{ color: "var(--color-muted)", fontSize: 13, margin: 0 }}>Fill in the details and we'll get back within 24h</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {/* Row 1 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                <div>
                  <FormInput label="Full Name" placeholder="Ramesh Sharma" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
                  {errors.name && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 3 }}>{errors.name}</p>}
                </div>
                <div>
                  <FormInput label="Email" type="email" placeholder="ramesh@company.com" value={form.email} onChange={v => setForm({ ...form, email: v })} required />
                  {errors.email && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 3 }}>{errors.email}</p>}
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                <FormInput label="Phone / WhatsApp" type="tel" placeholder="+977 98XXXXXXXX" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />
                <FormInput label="Company / Organization" placeholder="Your Company" value={form.company} onChange={v => setForm({ ...form, company: v })} />
              </div>

              {/* Row 3 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                <FormSelect
                  label="Budget Range"
                  value={form.budget}
                  onChange={v => setForm({ ...form, budget: v })}
                  options={[
                    { value: "", label: "Select budget..." },
                    { value: "under-15k", label: "Under NPR 15K" },
                    { value: "15k-50k", label: "NPR 15K – 50K" },
                    { value: "50k-150k", label: "NPR 50K – 1.5L" },
                    { value: "150k-500k", label: "NPR 1.5L – 5L" },
                    { value: "500k+", label: "NPR 5L+" },
                    { value: "discuss", label: "Let's Discuss" },
                  ]}
                />
                <FormSelect
                  label="Timeline"
                  value={form.timeline}
                  onChange={v => setForm({ ...form, timeline: v })}
                  options={[
                    { value: "", label: "Select timeline..." },
                    { value: "asap", label: "ASAP" },
                    { value: "1-month", label: "Within 1 month" },
                    { value: "1-3months", label: "1–3 months" },
                    { value: "3-6months", label: "3–6 months" },
                    { value: "6months+", label: "6+ months" },
                    { value: "flexible", label: "Flexible" },
                  ]}
                />
              </div>

              {/* Project details */}
              <div>
                <FormTextarea
                  label="Project Details"
                  placeholder={`Tell us about your ${service.title.toLowerCase()} needs — goals, features, any existing systems, and anything else that's important...`}
                  value={form.details}
                  onChange={v => setForm({ ...form, details: v })}
                  rows={4}
                  required
                />
                {errors.details && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 3 }}>{errors.details}</p>}
              </div>

              {/* Service tag */}
              <div style={{
                background: `${service.color}0D`, border: `1px solid ${service.color}25`,
                borderRadius: 8, padding: "0.65rem 0.9rem",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ fontSize: 16 }}>{service.icon}</span>
                <span style={{ fontSize: 13, color: service.color, fontWeight: 500 }}>Service: {service.title}</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary"
                style={{ padding: "14px", fontSize: 15, opacity: loading ? 0.75 : 1 }}
              >
                {loading ? "Sending Inquiry..." : "Send Inquiry 🚀"}
              </button>

              <p style={{ textAlign: "center", fontSize: 12, color: "var(--color-muted)" }}>
                🔒 Your information is private and never shared with third parties.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function ServicesSection({ setActive }: ServicesSectionProps) {
  const [ref, inView] = useInView();
  const [inquiryService, setInquiryService] = useState<typeof SERVICES[0] | null>(null);

  return (
    <section ref={ref} className="section" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      <SectionTitle
        label="What We Do"
        title="Services Built for Growth"
        sub="From concept to deployment — every digital service your business needs, under one roof."
      />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
        gap: "1.25rem",
      }}>
        {SERVICES.map((s, i) => (
          <Card key={i} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(28px)",
            transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`,
            cursor: "pointer", position: "relative", overflow: "hidden",
          }}>
            {/* Tag badge */}
            {s.tag && (
              <div style={{
                position: "absolute", top: 14, right: 14,
                fontSize: 10, fontWeight: 700, padding: "3px 9px",
                borderRadius: 20, background: `${s.color}20`, color: s.color,
                border: `1px solid ${s.color}35`, letterSpacing: "0.05em",
              }}>{s.tag}</div>
            )}

            {/* Color bar */}
            <div style={{
              width: 36, height: 4, borderRadius: 2, marginBottom: "1.1rem",
              background: `linear-gradient(90deg, ${s.color}, ${s.color}50)`,
            }} />

            <div style={{ fontSize: 32, marginBottom: "0.75rem" }}>{s.icon}</div>
            <h3 className="font-display" style={{ color: "var(--color-text)", fontWeight: 600, fontSize: 15.5, margin: "0 0 0.6rem" }}>{s.title}</h3>
            <p style={{ color: "var(--color-muted)", fontSize: 13.5, lineHeight: 1.65, margin: "0 0 1.25rem" }}>{s.desc}</p>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button
                onClick={() => setInquiryService(s)}
                style={{
                  padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  background: `${s.color}15`, border: `1px solid ${s.color}35`,
                  color: s.color, cursor: "pointer", fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${s.color}25`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${s.color}15`; }}
              >Get Quote</button>
              <button
                onClick={() => setActive("Services")}
                style={{ background: "none", border: "none", color: s.color, cursor: "pointer", fontSize: 13, fontWeight: 600, padding: 0, fontFamily: "var(--font-body)" }}
              >Learn more →</button>
            </div>
          </Card>
        ))}
      </div>

      {/* Inquiry Modal */}
      {inquiryService && (
        <InquiryModal service={inquiryService} onClose={() => setInquiryService(null)} />
      )}
    </section>
  );
}
