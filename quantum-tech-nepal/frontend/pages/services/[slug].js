import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { fetchServices, fetchServiceDetail, submitServiceInquiry } from '../../lib/api';
import { colorFor } from '../../lib/display';
import { ServiceInquiryModal, Toast } from '../../components/ui';

export async function getStaticPaths() {
  const services = (await fetchServices()) || [];
  return {
    paths: services.map((s) => ({ params: { slug: s.slug } })),
    // 'blocking' means a service added in Admin AFTER the last build still
    // gets a working detail page on first visit — Next.js renders it on
    // demand instead of 404ing, then caches it for subsequent visitors.
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const service = await fetchServiceDetail(params.slug);
  if (!service) {
    return { notFound: true };
  }
  return { props: { service }, revalidate: 60 };
}

export default function ServiceDetailPage({ service }) {
  const [showInquiry, setShowInquiry] = useState(false);
  const [toast, setToast] = useState(null);
  const color = colorFor(service.id);

  const handleSubmit = async (formValues) => {
    await submitServiceInquiry({
      service: service.id,
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
      company: formValues.company,
      budget: formValues.budget,
      requirements: formValues.message,
    });
    setToast({ message: "Inquiry sent! We'll reply within 24 hours.", type: 'success' });
  };

  return (
    <>
      <Head>
        <title>{service.title} — Quantum Tech Nepal</title>
        <meta name="description" content={service.short_desc} />
      </Head>

      {/* Header */}
      <section style={{ padding: '8rem 1.5rem 3rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <Link href="/services" style={{ color: 'var(--muted)', fontSize: '.85rem', textDecoration: 'none' }}>
            ← All Services
          </Link>
          <div style={{ fontSize: 48, margin: '1.5rem 0 1rem' }}>{service.icon}</div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '1rem', fontFamily: 'var(--font-head)' }}>
            {service.title}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.75 }}>
            {service.short_desc}
          </p>
        </div>
      </section>

      {/* Full description + features */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="card" style={{ padding: '2.25rem', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '1rem', fontFamily: 'var(--font-head)', fontSize: '1.3rem' }}>
              Overview
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {service.description}
            </p>
          </div>

          {Array.isArray(service.features) && service.features.length > 0 && (
            <div className="card" style={{ padding: '2.25rem', marginBottom: '2rem' }}>
              <h2 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '1.25rem', fontFamily: 'var(--font-head)', fontSize: '1.3rem' }}>
                What's Included
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '.9rem' }}>
                {service.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color, fontSize: 16, flexShrink: 0 }}>✓</span>
                    <span style={{ color: 'var(--text)', fontSize: '.92rem', lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {Array.isArray(service.technologies) && service.technologies.length > 0 && (
            <div className="card" style={{ padding: '2.25rem', marginBottom: '2rem' }}>
              <h2 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '1rem', fontFamily: 'var(--font-head)', fontSize: '1.3rem' }}>
                Technologies We Use
              </h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {service.technologies.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{
            textAlign: 'center', padding: '2.5rem', borderRadius: 'var(--radius-lg)',
            background: `linear-gradient(135deg,${color}12,${color}22)`, border: `1px solid ${color}30`,
          }}>
            <h3 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '.5rem', fontFamily: 'var(--font-head)' }}>
              Interested in {service.title}?
            </h3>
            <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
            <button className="btn-primary" onClick={() => setShowInquiry(true)}>
              🚀 Request a Quote
            </button>
          </div>
        </div>
      </section>

      {showInquiry && (
        <ServiceInquiryModal
          service={service}
          onClose={() => setShowInquiry(false)}
          onSubmit={handleSubmit}
        />
      )}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </>
  );
}
