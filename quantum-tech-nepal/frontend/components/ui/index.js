import { useState, useEffect, useRef } from 'react';

// ── Animated counter ──────────────────────────────────────────────────────
export function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── IntersectionObserver hook ─────────────────────────────────────────────
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── Section title block ───────────────────────────────────────────────────
export function SectionTitle({ label, title, sub, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '3rem' }}>
      {label && <div className="badge section-label">{label}</div>}
      <h2 className="section-title">{title}</h2>
      {sub && <p className={`section-sub ${center ? 'center' : ''}`}>{sub}</p>}
    </div>
  );
}

// ── Animated stat number ──────────────────────────────────────────────────
export function AnimatedStat({ value, suffix, label, started }) {
  const count = useCounter(value, 2000, started);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 'clamp(2.4rem,5vw,3.8rem)', fontWeight: 900, letterSpacing: '-2px',
        background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        fontFamily: 'var(--font-head)',
      }}>
        {count}{suffix}
      </div>
      <div style={{ color: 'var(--muted)', fontSize: '.9rem', fontWeight: 500, marginTop: '.25rem' }}>{label}</div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────
export function Card({ children, style = {}, className = '' }) {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
}

// ── Loading spinner ───────────────────────────────────────────────────────
export function Spinner() {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      border: '3px solid var(--border)',
      borderTopColor: 'var(--accent)',
      animation: 'spin .8s linear infinite',
      margin: '0 auto',
    }} />
  );
}

// ── Toast notification ────────────────────────────────────────────────────
export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div style={{
      position: 'fixed', bottom: 100, right: 24, zIndex: 9999,
      background: type === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
      border: `1px solid ${type === 'success' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
      borderRadius: 'var(--radius)', padding: '.85rem 1.25rem',
      color: 'var(--text)', fontSize: '.9rem', fontWeight: 500,
      backdropFilter: 'blur(12px)',
      animation: 'fadeUp .3s ease',
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      maxWidth: 320,
    }}>
      <span>{type === 'success' ? '✅' : '❌'}</span>
      {message}
    </div>
  );
}

// ── ServiceInquiryModal ───────────────────────────────────────────────────
export function ServiceInquiryModal({ service, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', budget: '', timeline: '', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const budgets   = ['Under NPR 10K','NPR 10K–30K','NPR 30K–80K','NPR 80K–200K','NPR 200K+','Custom/Discuss'];
  const timelines = ['ASAP (rush)','1–2 weeks','1 month','2–3 months','3–6 months','Flexible'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in name, email, and message.');
      return;
    }
    setLoading(true); setError('');
    try {
      await onSubmit({ ...form, service: service?.title || '' });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Close on ESC
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem', animation: 'fadeIn .25s ease',
      }}
    >
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 560,
        maxHeight: '90vh', overflowY: 'auto',
        padding: '2rem', position: 'relative',
        animation: 'fadeUp .3s ease',
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'rgba(255,255,255,0.07)', border: 'none',
          color: 'var(--muted)', fontSize: 18, width: 32, height: 32,
          borderRadius: 8, cursor: 'pointer', lineHeight: 1,
        }}>✕</button>

        {done ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: 56, marginBottom: '1rem' }}>🎉</div>
            <h3 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '.5rem', fontFamily: 'var(--font-head)' }}>
              Inquiry Sent!
            </h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Thanks {form.name}! We've received your inquiry for <strong style={{ color: 'var(--accent)' }}>{service?.title}</strong>.
              We'll get back to you within 24 hours.
            </p>
            <button className="btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: '1.75rem' }}>
              {service && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.75rem' }}>
                  <span style={{ fontSize: 28 }}>{service.icon}</span>
                  <span style={{
                    fontSize: '.8rem', fontWeight: 600, color: service.color || 'var(--accent)',
                    textTransform: 'uppercase', letterSpacing: '.08em',
                  }}>{service.title}</span>
                </div>
              )}
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text)' }}>
                Service Inquiry
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginTop: '.35rem' }}>
                Tell us about your project — we'll respond within 24 hours.
              </p>
            </div>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 8, padding: '.7rem 1rem', color: '#FCA5A5',
                fontSize: '.85rem', marginBottom: '1rem',
              }}>{error}</div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Row: name + email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="field">
                  <label>Full Name *</label>
                  <input type="text" placeholder="Ramesh Sharma"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field">
                  <label>Email Address *</label>
                  <input type="email" placeholder="you@company.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              {/* Row: phone + budget */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="field">
                  <label>Phone / WhatsApp</label>
                  <input type="tel" placeholder="+977 98XXXXXXXX"
                    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="field">
                  <label>Company (optional)</label>
                  <input type="text" placeholder="Your company name"
                    value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
              </div>

              {/* Budget */}
              <div className="field">
                <label>Budget Range</label>
                <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                  <option value="">Select budget</option>
                  {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Timeline */}
              <div className="field">
                <label>Expected Timeline</label>
                <select value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })}>
                  <option value="">Select timeline</option>
                  {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Message */}
              <div className="field">
                <label>Project Details *</label>
                <textarea rows={4} placeholder="Describe your project, goals, any specific requirements..."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>

              <button type="submit" className="btn-primary" disabled={loading}
                style={{ justifyContent: 'center', opacity: loading ? .7 : 1 }}>
                {loading ? <><Spinner /> Sending...</> : '🚀 Send Inquiry'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
