import Head from 'next/head';
import Link from 'next/link';
import { SectionTitle } from '../components/ui';
import { fetchServices } from '../lib/api';
import { colorFor } from '../lib/display';
import { PRICING_PLANS } from '../lib/data';

// Pricing plans still come from lib/data.js — there is no PricingPlan model
// on the backend yet, so this section is left as-is on purpose.

export async function getStaticProps() {
  const services = (await fetchServices()) || [];
  return {
    props: { services },
    revalidate: 60, // re-fetch from the API at most once a minute, so a
    // new/edited Service added in Django Admin shows up without a manual
    // rebuild/redeploy — this is the actual fix for "admin changes don't
    // show on the site".
  };
}

export default function ServicesPage({ services }) {
  return (
    <>
      <Head>
        <title>Services — Quantum Tech Nepal</title>
        <meta name="description" content="Full-stack digital services: web development, mobile apps, UI/UX, AI, SEO, and more." />
      </Head>

      {/* Page header */}
      <section style={{ padding: '8rem 1.5rem 4rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <div className="badge" style={{ marginBottom: '1.25rem' }}>Services</div>
          <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '1rem', fontFamily: 'var(--font-head)' }}>
            Everything Your Business Needs
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.75 }}>
            We cover the full technology spectrum — so you don't have to go anywhere else.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {services.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--muted)' }}>
              No services published yet. Add one from Django Admin.
            </p>
          ) : (
            <div className="grid-3">
              {services.map((s, i) => {
                const color = colorFor(i);
                return (
                  <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 36, marginBottom: '.6rem' }}>{s.icon}</div>
                    <div style={{ width: 36, height: 3, borderRadius: 2, marginBottom: '1rem', background: `linear-gradient(90deg,${color},transparent)` }} />
                    <h3 style={{ color: 'var(--text)', fontWeight: 700, margin: '0 0 .5rem', fontFamily: 'var(--font-head)' }}>{s.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '.87rem', lineHeight: 1.65, flexGrow: 1 }}>{s.short_desc}</p>
                    <Link
                      href={`/services/${s.slug}`}
                      style={{
                        marginTop: '1.25rem', padding: '9px 20px', borderRadius: 8,
                        fontSize: '.85rem', fontWeight: 600, cursor: 'pointer',
                        background: `${color}14`, border: `1px solid ${color}35`,
                        color, transition: 'all .2s', alignSelf: 'flex-start',
                        textDecoration: 'none', display: 'inline-block',
                      }}
                    >
                      View Details →
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionTitle label="Pricing" title="Transparent & Flexible Plans" sub="No hidden fees. Choose what fits your business stage." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.25rem', maxWidth: 900, margin: '0 auto' }}>
            {PRICING_PLANS.map((p, i) => (
              <div key={i} style={{
                background: 'var(--card)', backdropFilter: 'blur(12px)',
                border: `1.5px solid ${p.popular ? p.color : 'var(--border)'}`,
                borderRadius: 'var(--radius-lg)', padding: '2rem',
                position: 'relative', transition: 'transform .3s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                {p.popular && (
                  <div style={{
                    position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                    background: `linear-gradient(135deg,${p.color},var(--accent))`,
                    color: '#fff', fontSize: '.7rem', fontWeight: 700,
                    padding: '4px 16px', borderRadius: 20, whiteSpace: 'nowrap',
                  }}>MOST POPULAR</div>
                )}
                <div style={{ color: p.color, fontWeight: 700, fontSize: '.8rem', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '.5rem' }}>{p.name}</div>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text)', margin: '.4rem 0 1.4rem', fontFamily: 'var(--font-head)', letterSpacing: '-1px' }}>{p.price}</div>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: '.7rem' }}>
                    <span style={{ color: p.color, fontSize: 16, flexShrink: 0 }}>✓</span>
                    <span style={{ color: 'var(--muted)', fontSize: '.87rem' }}>{f}</span>
                  </div>
                ))}
                <Link href="/contact" className={p.popular ? 'btn-primary' : 'btn-outline'}
                  style={{
                    width: '100%', marginTop: '1.5rem', padding: '11px',
                    borderRadius: 10, fontWeight: 700, fontSize: '.9rem', cursor: 'pointer',
                    background: p.popular ? `linear-gradient(135deg,${p.color},var(--accent))` : 'transparent',
                    border: p.popular ? 'none' : `1.5px solid ${p.color}`,
                    color: p.popular ? '#fff' : p.color,
                    transition: 'opacity .2s', textDecoration: 'none',
                    display: 'block', textAlign: 'center', boxSizing: 'border-box',
                  }}
                >Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ padding: '3rem 1.5rem 5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>Not sure which service you need?</p>
          <Link href="/contact" className="btn-primary">Book a Free Consultation</Link>
        </div>
      </section>
    </>
  );
}
