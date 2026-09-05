import { useState } from 'react';
import Head from 'next/head';
import { submitContact, fetchServices } from '../lib/api';
import { Spinner } from '../components/ui';

export async function getStaticProps() {
  const services = (await fetchServices()) || [];
  return { props: { services }, revalidate: 60 };
}

const CONTACT_INFO = [
  { icon: '📍', label: 'Address',   value: 'Dharan, Nepal' },
  { icon: '📧', label: 'Email',     value: 'quantumtechnepal2083@gmail.com', href: 'mailto:quantumtechnepal2083@gmail.com' },
  { icon: '📞', label: 'Phone',     value: '+977 9840357490', href: 'tel:+9779840357490' },
  { icon: '💬', label: 'WhatsApp',  value: '+977 9819075360', href: 'https://wa.me/9779819075360' },
];

export default function ContactPage({ services }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', service:'', budget:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState('');

  const budgets = ['Under NPR 10K','NPR 10K–30K','NPR 30K–80K','NPR 80K–200K','NPR 200K+','Custom/Discuss'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError('Please fill in name, email and message.'); return; }
    setLoading(true); setError('');
    try {
      await submitContact({
        name: form.name, email: form.email, phone: form.phone,
        service: form.service,
        message: `Budget: ${form.budget || 'Not specified'}\n\n${form.message}`,
      });
      setSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again or email us directly.');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Head>
        <title>Contact — Quantum Tech Nepal</title>
        <meta name="description" content="Get in touch with Quantum Tech Nepal. Free consultation for web, mobile, AI, and digital services." />
      </Head>

      {/* Header */}
      <section style={{ padding: '8rem 1.5rem 4rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="badge" style={{ marginBottom: '1.25rem' }}>Contact</div>
          <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '1rem', fontFamily: 'var(--font-head)' }}>
            Let's Start a Conversation
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.75 }}>
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '3rem', alignItems: 'start' }}>

            {/* Left: info */}
            <div>
              {CONTACT_INFO.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(0,212,255,0.07)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ color: 'var(--muted)', fontSize: '.78rem', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '.06em' }}>{item.label}</div>
                    {item.href
                      ? <a href={item.href} style={{ color: 'var(--text)', fontWeight: 500, textDecoration: 'none', fontSize: '.95rem' }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
                        >{item.value}</a>
                      : <div style={{ color: 'var(--text)', fontWeight: 500, fontSize: '.95rem' }}>{item.value}</div>
                    }
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '2rem' }}>
                <div style={{ color: 'var(--muted)', fontSize: '.8rem', marginBottom: '.75rem', textTransform: 'uppercase', letterSpacing: '.07em' }}>Find Us On</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {['LinkedIn','Twitter','Facebook','Instagram'].map(s => (
                    <button key={s} style={{
                      padding: '7px 14px', borderRadius: 8, fontSize: '.82rem', fontWeight: 500,
                      background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                      color: 'var(--muted)', cursor: 'pointer', transition: 'all .2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
                    >{s}</button>
                  ))}
                </div>
              </div>

              {/* Office hours */}
              <div className="card" style={{ marginTop: '2rem', padding: '1.25rem' }}>
                <h4 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '.75rem', fontSize: '.9rem', fontFamily: 'var(--font-head)' }}>Office Hours</h4>
                {[['Sunday–Friday', '9:00 AM – 5:00 PM'], ['Saturday', '10:00 AM – 4:00 PM']].map(([d,h]) => (
                  <div key={d} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem' }}>
                    <span style={{ color: 'var(--muted)', fontSize: '.85rem' }}>{d}</span>
                    <span style={{ color: 'var(--text)', fontSize: '.85rem', fontWeight: 500 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="card" style={{ padding: '2rem' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                  <div style={{ fontSize: 56, marginBottom: '1rem' }}>✅</div>
                  <h3 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '.5rem', fontFamily: 'var(--font-head)' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    Thanks {form.name}! We'll get back to you within 24 hours.
                  </p>
                  <button className="btn-outline" onClick={() => { setSent(false); setForm({ name:'',email:'',phone:'',service:'',budget:'',message:'' }); }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '.4rem', fontFamily: 'var(--font-head)', fontSize: '1.2rem' }}>Send Us a Message</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '.87rem', marginBottom: '1.5rem' }}>
                    We typically respond within a few hours during business days.
                  </p>

                  {error && (
                    <div style={{
                      background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: 8, padding: '.7rem 1rem', color: '#FCA5A5',
                      fontSize: '.85rem', marginBottom: '1.1rem',
                    }}>{error}</div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="field">
                        <label>Full Name *</label>
                        <input type="text" placeholder="Ramesh Sharma" value={form.name} onChange={e => setForm({...form,name:e.target.value})} />
                      </div>
                      <div className="field">
                        <label>Email *</label>
                        <input type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="field">
                        <label>Phone / WhatsApp</label>
                        <input type="tel" placeholder="+977 98XXXXXXXX" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} />
                      </div>
                      <div className="field">
                        <label>Budget Range</label>
                        <select value={form.budget} onChange={e => setForm({...form,budget:e.target.value})}>
                          <option value="">Select budget</option>
                          {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="field">
                      <label>Service Needed</label>
                      <select value={form.service} onChange={e => setForm({...form,service:e.target.value})}>
                        <option value="">Select a service</option>
                        {services.map(s => <option key={s.slug} value={s.title}>{s.title}</option>)}
                      </select>
                    </div>

                    <div className="field">
                      <label>Your Message *</label>
                      <textarea rows={5} placeholder="Tell us about your project, goals, timeline..." value={form.message} onChange={e => setForm({...form,message:e.target.value})} />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}
                      style={{ justifyContent: 'center', opacity: loading ? .75 : 1 }}>
                      {loading ? <><Spinner /> Sending...</> : '🚀 Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
