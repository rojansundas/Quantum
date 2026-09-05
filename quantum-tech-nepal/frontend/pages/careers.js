import Head from 'next/head';
import Link from 'next/link';
import { fetchJobs } from '../lib/api';

const JOB_TYPE_LABELS = {
  full_time: 'Full Time',
  internship: 'Internship',
  contract: 'Contract',
};

export async function getStaticProps() {
  const jobs = (await fetchJobs()) || [];
  return {
    props: { jobs },
    revalidate: 60, // a Job Opening added/closed in Admin shows up within a minute
  };
}

export default function CareersPage({ jobs }) {
  return (
    <>
      <Head>
        <title>Careers — Quantum Tech Nepal</title>
        <meta name="description" content="Join Quantum Tech Nepal. Open roles in engineering, design, and marketing." />
      </Head>
      <section style={{ padding: '8rem 1.5rem 4rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="badge" style={{ marginBottom: '1.25rem' }}>Careers</div>
          <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '1rem', fontFamily: 'var(--font-head)' }}>
            Join Our Team
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.75 }}>
            Help us build the future of tech in Nepal. We're looking for passionate people who love solving hard problems.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
            {jobs.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--muted)' }}>
                No open roles right now — check back soon, or send us an open application below.
              </p>
            ) : (
              jobs.map((j) => (
                <div key={j.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ color: 'var(--text)', fontWeight: 700, margin: '0 0 .35rem', fontFamily: 'var(--font-head)' }}>{j.title}</h3>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: '.82rem', color: 'var(--muted)' }}>{j.department}</span>
                      <span style={{ color: 'var(--border)' }}>·</span>
                      <span style={{ fontSize: '.82rem', color: 'var(--muted)' }}>{j.location}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{
                      fontSize: '.78rem', padding: '4px 12px', borderRadius: 20, fontWeight: 600,
                      background: j.job_type === 'internship' ? 'rgba(245,158,11,0.1)' : 'rgba(0,212,255,0.1)',
                      color: j.job_type === 'internship' ? 'var(--gold)' : 'var(--accent)',
                    }}>{JOB_TYPE_LABELS[j.job_type] || j.job_type}</span>
                    <Link href={`/careers/${j.id}`} className="btn-primary" style={{ padding: '.5rem 1.25rem', fontSize: '.85rem', textDecoration: 'none' }}>
                      View & Apply
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
            <h3 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '.5rem', fontFamily: 'var(--font-head)' }}>Don't see the right role?</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', lineHeight: 1.65 }}>
              Send us your CV anyway. We're always on the lookout for exceptional talent.
            </p>
            <Link href="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>
              Send Open Application
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
