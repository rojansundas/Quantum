import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { fetchJobs, fetchJobDetail, submitJobApplication } from '../../lib/api';
import { Spinner } from '../../components/ui';

const JOB_TYPE_LABELS = {
  full_time: 'Full Time',
  internship: 'Internship',
  contract: 'Contract',
};

export async function getStaticPaths() {
  const jobs = (await fetchJobs()) || [];
  return {
    paths: jobs.map((j) => ({ params: { id: String(j.id) } })),
    // A job posted after the last build still gets a working page on first
    // visit instead of a 404 — the same fallback strategy used for services.
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const job = await fetchJobDetail(params.id);
  if (!job) return { notFound: true };
  return { props: { job }, revalidate: 60 };
}

export default function JobDetailPage({ job }) {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', cover_letter: '', portfolio_url: '' });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.cover_letter || !resume) {
      setError('Please fill in all required fields and attach your resume.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const payload = new FormData();
      payload.append('job', job.id);
      payload.append('full_name', form.full_name);
      payload.append('email', form.email);
      payload.append('phone', form.phone);
      payload.append('cover_letter', form.cover_letter);
      payload.append('portfolio_url', form.portfolio_url);
      payload.append('resume', resume);
      await submitJobApplication(payload);
      setDone(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{job.title} — Careers — Quantum Tech Nepal</title>
        <meta name="description" content={job.description?.slice(0, 160)} />
      </Head>

      <section style={{ padding: '8rem 1.5rem 3rem' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <Link href="/careers" style={{ color: 'var(--muted)', fontSize: '.85rem', textDecoration: 'none' }}>
            ← All Openings
          </Link>

          <div style={{ margin: '1.5rem 0 2.5rem' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span style={{
                fontSize: '.78rem', padding: '4px 12px', borderRadius: 20, fontWeight: 600,
                background: job.job_type === 'internship' ? 'rgba(245,158,11,0.1)' : 'rgba(0,212,255,0.1)',
                color: job.job_type === 'internship' ? 'var(--gold)' : 'var(--accent)',
              }}>{JOB_TYPE_LABELS[job.job_type] || job.job_type}</span>
              <span style={{ fontSize: '.85rem', color: 'var(--muted)' }}>{job.department} · {job.location}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-1px', fontFamily: 'var(--font-head)' }}>
              {job.title}
            </h1>
            {job.deadline && (
              <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginTop: '.5rem' }}>
                Application deadline: {new Date(job.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}
          </div>

          <div className="card" style={{ padding: '2.25rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '1rem', fontFamily: 'var(--font-head)', fontSize: '1.2rem' }}>
              About the Role
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{job.description}</p>
          </div>

          <div className="card" style={{ padding: '2.25rem', marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '1rem', fontFamily: 'var(--font-head)', fontSize: '1.2rem' }}>
              Requirements
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{job.requirements}</p>
          </div>

          {/* Application form */}
          <div className="card" style={{ padding: '2.25rem' }}>
            {done ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ fontSize: 56, marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '.5rem', fontFamily: 'var(--font-head)' }}>Application Sent!</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                  Thanks {form.full_name}! Our HR team will review your application for <strong style={{ color: 'var(--accent)' }}>{job.title}</strong> and reach out soon.
                </p>
              </div>
            ) : (
              <>
                <h2 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '.4rem', fontFamily: 'var(--font-head)', fontSize: '1.2rem' }}>
                  Apply for this Role
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '.87rem', marginBottom: '1.5rem' }}>
                  Fill in your details below. We review every application personally.
                </p>

                {error && (
                  <div style={{
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 8, padding: '.7rem 1rem', color: '#FCA5A5',
                    fontSize: '.85rem', marginBottom: '1rem',
                  }}>{error}</div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="field">
                      <label>Full Name *</label>
                      <input type="text" placeholder="Ramesh Sharma"
                        value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
                    </div>
                    <div className="field">
                      <label>Email *</label>
                      <input type="email" placeholder="you@email.com"
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="field">
                      <label>Phone *</label>
                      <input type="tel" placeholder="+977 98XXXXXXXX"
                        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div className="field">
                      <label>Portfolio / LinkedIn URL</label>
                      <input type="url" placeholder="https://..."
                        value={form.portfolio_url} onChange={e => setForm({ ...form, portfolio_url: e.target.value })} />
                    </div>
                  </div>
                  <div className="field">
                    <label>Cover Letter *</label>
                    <textarea rows={5} placeholder="Tell us why you're a great fit for this role..."
                      value={form.cover_letter} onChange={e => setForm({ ...form, cover_letter: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Resume (PDF/DOC) *</label>
                    <input type="file" accept=".pdf,.doc,.docx"
                      onChange={e => setResume(e.target.files?.[0] || null)} />
                  </div>
                  <button type="submit" className="btn-primary" disabled={loading}
                    style={{ justifyContent: 'center', opacity: loading ? .7 : 1 }}>
                    {loading ? <><Spinner /> Submitting...</> : '🚀 Submit Application'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
