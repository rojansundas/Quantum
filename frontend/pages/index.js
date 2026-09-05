import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { SectionTitle, AnimatedStat, useInView } from '../components/ui';
import { fetchServices, fetchPortfolio, fetchTestimonials, fetchTeam } from '../lib/api';
import { colorFor, initialsFor } from '../lib/display';

const STATS = [
  { value: 250, suffix: '+', label: 'Projects Completed' },
  { value: 180, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 12, suffix: '', label: 'Team Members' },
];
const TECH_STACK = ['React', 'Next.js', 'Vue.js', 'Node.js', 'Django', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'TensorFlow', 'Figma'];

export async function getStaticProps() {
  const [services, portfolio, testimonials, team] = await Promise.all([
    fetchServices(),
    fetchPortfolio(),
    fetchTestimonials(),
    fetchTeam(),
  ]);
  return {
    props: {
      services: services || [],
      portfolio: portfolio || [],
      testimonials: testimonials || [],
      team: team || [],
    },
    revalidate: 60,
  };
}

function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);
  return (
    <section style={{
      minHeight: '100vh', position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '7rem 1.5rem 4rem',
    }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at ${mouse.x}px ${mouse.y}px,rgba(0,212,255,0.07) 0%,transparent 55%),
            radial-gradient(ellipse at 80% 20%,rgba(124,58,237,0.1) 0%,transparent 50%),
            radial-gradient(ellipse at 20% 80%,rgba(0,212,255,0.07) 0%,transparent 50%)`,
          transition: 'background .12s ease',
        }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .04 }}>
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00D4FF" strokeWidth=".5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {[
          { l:'14%', t:'22%', w:360, c:'rgba(0,212,255,0.05)', dur:'8s' },
          { l:'82%', t:'68%', w:440, c:'rgba(124,58,237,0.07)', dur:'10s' },
          { l:'58%', t:'12%', w:260, c:'rgba(245,158,11,0.04)', dur:'12s' },
        ].map((o, i) => (
          <div key={i} style={{
            position:'absolute', borderRadius:'50%',
            left:o.l, top:o.t, width:o.w, height:o.w,
            background:`radial-gradient(circle,${o.c},transparent 70%)`,
            transform:'translate(-50%,-50%)',
            animation:`float ${o.dur} ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 900, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="badge fade-up" style={{ marginBottom: '2rem', animationDelay:'.05s' }}>
          <span style={{ width:8,height:8,borderRadius:'50%',background:'var(--accent)',display:'inline-block',animation:'pulse 2s infinite' }} />
          Nepal's Premier Tech Partner
        </div>

        <h1 className="fade-up" style={{
          fontSize:'clamp(2.8rem,7vw,5.5rem)', fontWeight:800, lineHeight:1.07,
          color:'var(--text)', margin:'0 0 1.5rem', letterSpacing:'-2px',
          fontFamily:'var(--font-head)', animationDelay:'.12s',
        }}>
          We Build Digital<br />
          <span className="gradient-text">Experiences</span> That Matter
        </h1>

        <p className="fade-up" style={{
          fontSize:'clamp(1rem,2vw,1.2rem)', color:'var(--muted)', lineHeight:1.75,
          maxWidth:620, margin:'0 auto 2.75rem', animationDelay:'.2s',
        }}>
          From startups to enterprises — world-class software, apps, and digital solutions
          that drive growth, delight users, and define the future of business in Nepal and beyond.
        </p>

        <div className="fade-up" style={{
          display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap',
          animationDelay:'.28s',
        }}>
          <Link href="/services" className="btn-primary">🚀 Explore Services</Link>
          <Link href="/contact" className="btn-outline">📅 Book Consultation</Link>
        </div>

        <div className="fade-up" style={{
          display:'flex', gap:'2.5rem', justifyContent:'center', flexWrap:'wrap',
          marginTop:'4rem', animationDelay:'.38s',
        }}>
          {STATS.slice(0,3).map((s,i) => (
            <div key={i} style={{ textAlign:'center' }}>
              <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--accent)', fontFamily:'var(--font-head)' }}>
                {s.value}{s.suffix}
              </div>
              <div style={{ fontSize:'.8rem', color:'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, animation:'bounce 2s infinite' }}>
        <span style={{ fontSize:11, color:'var(--muted)', letterSpacing:'.1em' }}>SCROLL</span>
        <div style={{ width:1, height:40, background:'linear-gradient(to bottom,var(--accent),transparent)' }} />
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section className="section-sm" style={{ overflow:'hidden' }}>
      <div className="container" style={{ textAlign:'center' }}>
        <p style={{ color:'var(--muted)', fontSize:'.8rem', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'1.5rem' }}>
          Technologies We Master
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center' }}>
          {TECH_STACK.map((t,i) => (
            <span key={i} style={{
              padding:'8px 18px', borderRadius:8,
              background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)',
              color:'var(--muted)', fontSize:'.85rem', fontWeight:500,
              transition:'all .2s', cursor:'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.background='rgba(0,212,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}
            >{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview({ services }) {
  const [ref, inView] = useInView();
  if (services.length === 0) return null;
  return (
    <section ref={ref} className="section">
      <div className="container">
        <SectionTitle label="What We Do" title="Services Built for Growth" sub="From concept to deployment — every digital service your business needs, under one roof." />
        <div className="grid-3" style={{ marginBottom:'2.5rem' }}>
          {services.slice(0,6).map((s,i) => {
            const color = colorFor(i);
            return (
              <div key={s.id} className="card" style={{
                opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)',
                transition: `all .5s ease ${i*.07}s`,
              }}>
                <div style={{ fontSize:32, marginBottom:'.6rem' }}>{s.icon}</div>
                <div style={{ width:32, height:3, borderRadius:2, marginBottom:'.9rem', background:`linear-gradient(90deg,${color},transparent)` }} />
                <h3 style={{ color:'var(--text)', fontWeight:700, fontSize:'.97rem', margin:'0 0 .45rem', fontFamily:'var(--font-head)' }}>{s.title}</h3>
                <p style={{ color:'var(--muted)', fontSize:'.85rem', lineHeight:1.6, margin:'0 0 1rem' }}>{s.short_desc}</p>
                <Link href={`/services/${s.slug}`} style={{
                  background:'none', border:'none', color, cursor:'pointer',
                  fontSize:'.82rem', fontWeight:600, padding:0, display:'flex', alignItems:'center', gap:4,
                  textDecoration: 'none',
                }}>View Details →</Link>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign:'center' }}>
          <Link href="/services" className="btn-outline">View All Services →</Link>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const [ref, inView] = useInView(.3);
  return (
    <section ref={ref} style={{ padding:'5rem 1.5rem', position:'relative', overflow:'hidden' }}>
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(135deg,rgba(0,212,255,0.03) 0%,rgba(124,58,237,0.05) 100%)',
        borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)',
      }} />
      <div className="container" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'2rem', position:'relative', zIndex:1 }}>
        {STATS.map((s,i) => <AnimatedStat key={i} {...s} started={inView} />)}
      </div>
    </section>
  );
}

function PortfolioPreview({ portfolio }) {
  if (portfolio.length === 0) return null;
  const featured = portfolio.filter(p => p.featured).length >= 3
    ? portfolio.filter(p => p.featured)
    : portfolio;
  return (
    <section className="section">
      <div className="container">
        <SectionTitle label="Our Work" title="Featured Projects" sub="Real solutions built for real businesses across Nepal and beyond." />
        <div className="grid-3" style={{ marginBottom:'2.5rem' }}>
          {featured.slice(0,3).map((p,i) => {
            const color = colorFor(i);
            return (
              <div key={p.id} className="card" style={{ cursor: p.live_url ? 'pointer' : 'default' }}
                onClick={() => { if (p.live_url) window.open(p.live_url, '_blank', 'noopener,noreferrer'); }}
              >
                <div style={{
                  height:140, borderRadius:10, marginBottom:'1.1rem', overflow: 'hidden',
                  background:`linear-gradient(135deg,${color}18,${color}30)`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  border:`1px solid ${color}28`,
                }}>
                  {p.thumbnail
                    ? <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ fontSize: 48 }}>💻</span>}
                </div>
                {p.category?.name && (
                  <span style={{ fontSize:'.72rem', padding:'3px 10px', borderRadius:20, background:`${color}15`, color, fontWeight:600 }}>{p.category.name}</span>
                )}
                <h3 style={{ color:'var(--text)', fontWeight:700, margin:'.6rem 0 .6rem', fontSize:'1rem', fontFamily:'var(--font-head)' }}>{p.title}</h3>
                <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                  {(p.technologies || []).map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign:'center' }}>
          <Link href="/portfolio" className="btn-outline">View All Projects →</Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials({ testimonials }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (testimonials.length < 2) return;
    const t = setInterval(() => setIdx(a => (a+1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, [testimonials.length]);
  if (testimonials.length === 0) return null;
  const t = testimonials[idx];
  return (
    <section className="section" style={{ position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(124,58,237,0.03),rgba(0,212,255,0.03))' }} />
      <div className="container" style={{ maxWidth:680, position:'relative', zIndex:1, textAlign:'center' }}>
        <SectionTitle label="Testimonials" title="What Clients Say" />
        <div className="card" style={{ padding:'2.25rem', transition:'all .4s ease', marginBottom:'1.25rem' }}>
          <div style={{ fontSize:28, marginBottom:'1rem' }}>{'⭐'.repeat(t.rating || 5)}</div>
          <p style={{ color:'var(--text)', fontSize:'1.05rem', lineHeight:1.75, fontStyle:'italic', margin:'0 0 1.5rem' }}>"{t.text}"</p>
          <div>
            <div style={{ fontWeight:700, color:'var(--accent)', fontFamily:'var(--font-head)' }}>{t.name}</div>
            <div style={{ color:'var(--muted)', fontSize:'.85rem' }}>{t.company}</div>
          </div>
        </div>
        {testimonials.length > 1 && (
          <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
            {testimonials.map((_,i) => (
              <button key={i} onClick={() => setIdx(i)} style={{
                width: i===idx ? 24 : 8, height:8, borderRadius:4,
                background: i===idx ? 'var(--accent)' : 'rgba(255,255,255,0.18)',
                border:'none', cursor:'pointer', padding:0, transition:'all .3s',
              }} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Team({ team }) {
  if (team.length === 0) return null;
  return (
    <section className="section">
      <div className="container">
        <SectionTitle label="The Team" title="People Behind Quantum Tech" sub="A passionate crew of designers, developers, and strategists." />
        <div className="grid-4">
          {team.map((m,i) => {
            const color = colorFor(i);
            return (
              <div key={m.id} className="card" style={{ textAlign:'center' }}>
                {m.photo ? (
                  <img src={m.photo} alt={m.name} style={{
                    width:68, height:68, borderRadius:'50%', margin:'0 auto 1rem',
                    objectFit: 'cover', border:`2px solid ${color}45`,
                  }} />
                ) : (
                  <div style={{
                    width:68, height:68, borderRadius:'50%', margin:'0 auto 1rem',
                    background:`linear-gradient(135deg,${color}38,${color}18)`,
                    border:`2px solid ${color}45`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:20, fontWeight:700, color, fontFamily:'var(--font-head)',
                  }}>{initialsFor(m.name)}</div>
                )}
                <h3 style={{ color:'var(--text)', fontWeight:700, margin:'0 0 .25rem', fontSize:'.93rem', fontFamily:'var(--font-head)' }}>{m.name}</h3>
                <p style={{ color:'var(--muted)', fontSize:'.82rem', margin:0 }}>{m.position}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:840 }}>
        <div style={{
          background:'linear-gradient(135deg,rgba(0,212,255,0.07),rgba(124,58,237,0.09))',
          border:'1px solid var(--border)', borderRadius:'var(--radius-lg)',
          padding:'4rem 2rem', textAlign:'center', position:'relative', overflow:'hidden',
        }}>
          <div style={{ position:'absolute', top:-50,right:-50, width:180,height:180, borderRadius:'50%', background:'rgba(0,212,255,0.05)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-30,left:-30, width:140,height:140, borderRadius:'50%', background:'rgba(124,58,237,0.07)', pointerEvents:'none' }} />
          <h2 style={{ fontSize:'clamp(1.8rem,4vw,2.5rem)', fontWeight:800, color:'var(--text)', margin:'0 0 1rem', letterSpacing:'-1px', fontFamily:'var(--font-head)' }}>
            Ready to Build Something Amazing?
          </h2>
          <p style={{ color:'var(--muted)', fontSize:'1.05rem', margin:'0 0 2rem', lineHeight:1.65, maxWidth:500, marginLeft:'auto', marginRight:'auto' }}>
            Let's turn your idea into a product that stands out. Get a free consultation today.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="btn-primary">Start a Project</Link>
            <Link href="/portfolio" className="btn-outline">View Our Work</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ services, portfolio, testimonials, team }) {
  return (
    <>
      <Head>
        <title>Quantum Tech Nepal — Nepal's Premier Tech Partner</title>
        <meta name="description" content="World-class web, mobile, AI, and digital marketing solutions from Dharan, Nepal." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Hero />
      <TechStack />
      <ServicesPreview services={services} />
      <Stats />
      <PortfolioPreview portfolio={portfolio} />
      <Testimonials testimonials={testimonials} />
      <Team team={team} />
      <CTA />

      <style>{`
        @keyframes float { 0%,100%{transform:translate(-50%,-50%)} 50%{transform:translate(-50%,calc(-50% - 16px))} }
      `}</style>
    </>
  );
}
