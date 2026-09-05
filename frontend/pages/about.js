import Head from 'next/head';
import { SectionTitle } from '../components/ui';
import { fetchTeam } from '../lib/api';
import { colorFor, initialsFor } from '../lib/display';

const STATS = [
  { value: 250, suffix: '+', label: 'Projects Completed' },
  { value: 180, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 12, suffix: '', label: 'Team Members' },
];
// Company-level stats have no backend model in this project yet, so they
// stay as fixed content here on purpose — this is unrelated to the
// "images/new-data not showing" bug and out of scope for that fix.

const TIMELINE = [
  { year: '2026', event: 'Founded in Dharan with 3 developers' },
  { year: '2026', event: 'Delivered 20+ projects, expanded to UI/UX' },
];

const VALUES = [
  { icon: '🎯', title: 'Excellence', desc: "We don't ship good — we ship exceptional." },
  { icon: '🤝', title: 'Trust', desc: 'Long-term partnerships built on honesty and results.' },
  { icon: '🔬', title: 'Innovation', desc: "Constantly pushing the boundaries of what's possible." },
  { icon: '⚡', title: 'Speed', desc: 'On-time delivery without compromising quality.' },
];

export async function getStaticProps() {
  const team = (await fetchTeam()) || [];
  return {
    props: { team },
    revalidate: 60, // a Team Member added/edited in Admin (including their
    // photo) shows up here within a minute — no rebuild needed
  };
}

export default function AboutPage({ team }) {
  return (
    <>
      <Head>
        <title>About — Quantum Tech Nepal</title>
        <meta name="description" content="Learn about Quantum Tech Nepal — Nepal's most trusted tech company since 2026." />
      </Head>

      {/* Header */}
      <section style={{ padding: '8rem 1.5rem 4rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <div className="badge" style={{ marginBottom: '1.25rem' }}>About Us</div>
          <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '1rem', fontFamily: 'var(--font-head)' }}>
            Nepal's Most Trusted Tech Company
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.75 }}>
            We started with a bold vision: to build world-class software from Nepal. Today, we're making it real.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
            <div>
              <h2 style={{ color: 'var(--text)', fontSize: '1.65rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'var(--font-head)', letterSpacing: '-0.5px' }}>Our Story</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Quantum Tech Nepal was founded in 2026 with a mission to transform ideas into powerful digital solutions.
                Built by a team of passionate technology professionals,
                we believe innovation should be accessible to every business—not just large enterprises.
                From custom software and web development to mobile applications and digital marketing,
                we help businesses across Nepal and internationally build, grow, and succeed in the digital world.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                Today, Quantum Tech Nepal partners with startups, SMEs, and growing enterprises in Nepal and beyond to build scalable digital solutions.
                From business websites and e-commerce platforms to mobile applications, custom software, AI-powered tools,
                and digital marketing, every solution we create is driven by innovation, precision, and a commitment to our clients' success.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Mission', text: 'Empower businesses with technology that actually works.', icon: '🎯' },
                { label: 'Vision', text: 'Make Nepal a global hub for premium software development.', icon: '🌍' },
              ].map((item, i) => (
                <div key={i} className="card">
                  <div style={{ fontSize: 28, marginBottom: '.5rem' }}>{item.icon}</div>
                  <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '.75rem', marginBottom: '.4rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>{item.label}</div>
                  <p style={{ color: 'var(--muted)', fontSize: '.87rem', margin: 0, lineHeight: 1.65 }}>{item.text}</p>
                </div>
              ))}
              {STATS.map((s, i) => (
                <div key={i} className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent)', fontFamily: 'var(--font-head)' }}>{s.value}{s.suffix}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '.8rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <SectionTitle label="Core Values" title="What Drives Us" center />
          <div className="grid-4" style={{ marginBottom: '5rem' }}>
            {VALUES.map((v, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: '.75rem' }}>{v.icon}</div>
                <h4 style={{ color: 'var(--text)', fontWeight: 700, margin: '0 0 .5rem', fontFamily: 'var(--font-head)' }}>{v.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '.85rem', margin: 0, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Team — now pulled live from Django Admin, real photos included */}
          <SectionTitle label="The Team" title="People Behind Quantum Tech" sub="A passionate crew of designers, developers, and strategists." center />
          {team.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '5rem' }}>
              No team members published yet. Add one from Django Admin.
            </p>
          ) : (
            <div className="grid-4" style={{ marginBottom: '5rem' }}>
              {team.map((m, i) => {
                const color = colorFor(i);
                return (
                  <div key={m.id} className="card" style={{ textAlign: 'center' }}>
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} style={{
                        width: 70, height: 70, borderRadius: '50%', margin: '0 auto 1rem',
                        objectFit: 'cover', border: `2px solid ${color}45`,
                      }} />
                    ) : (
                      <div style={{
                        width: 70, height: 70, borderRadius: '50%', margin: '0 auto 1rem',
                        background: `linear-gradient(135deg,${color}38,${color}18)`,
                        border: `2px solid ${color}45`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20, fontWeight: 700, color, fontFamily: 'var(--font-head)',
                      }}>{initialsFor(m.name)}</div>
                    )}
                    <h3 style={{ color: 'var(--text)', fontWeight: 700, margin: '0 0 .25rem', fontSize: '.93rem', fontFamily: 'var(--font-head)' }}>{m.name}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '.82rem', margin: 0 }}>{m.position}</p>
                    {(m.linkedin || m.github || m.facebook || m.instagram) && (
                      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: '.6rem' }}>
                        {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', fontSize: '.78rem', textDecoration: 'none' }}>LinkedIn</a>}
                        {m.github && <a href={m.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', fontSize: '.78rem', textDecoration: 'none' }}>GitHub</a>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Timeline */}
          <SectionTitle label="Our Journey" title="Company Timeline" center />
          <div style={{ maxWidth: 580, margin: '0 auto' }}>
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 56 }}>
                  <div style={{
                    background: 'linear-gradient(135deg,var(--accent),var(--accent2))',
                    color: '#fff', fontWeight: 700, fontSize: '.75rem', padding: '4px 10px',
                    borderRadius: 6, whiteSpace: 'nowrap', fontFamily: 'var(--font-head)',
                  }}>{t.year}</div>
                  {i < TIMELINE.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--border)', marginTop: 6 }} />}
                </div>
                <div style={{ paddingTop: 4, paddingBottom: i < TIMELINE.length - 1 ? '1rem' : 0 }}>
                  <p style={{ color: 'var(--text)', margin: 0, lineHeight: 1.65, fontSize: '.95rem' }}>{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
