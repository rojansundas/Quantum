// pages/portfolio.js
import Head from 'next/head';
import { useState } from 'react';
import { fetchPortfolio } from '../lib/api';
import { colorFor } from '../lib/display';

export async function getStaticProps() {
  const projects = (await fetchPortfolio()) || [];
  return {
    props: { projects },
    revalidate: 60, // pick up new/edited Projects from Admin within a minute
  };
}

export default function PortfolioPage({ projects }) {
  const categories = ['All', ...new Set(projects.map(p => p.category?.name).filter(Boolean))];
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category?.name === filter);

  return (
    <>
      <Head>
        <title>Portfolio — Quantum Tech Nepal</title>
        <meta name="description" content="Explore our portfolio of web, mobile, and AI projects built for Nepali and international businesses." />
      </Head>
      <section style={{ padding: '8rem 1.5rem 4rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="badge" style={{ marginBottom: '1.25rem' }}>Portfolio</div>
          <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '1rem', fontFamily: 'var(--font-head)' }}>
            Projects We're Proud Of
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.75 }}>
            A curated selection spanning industries, technologies, and business sizes.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {projects.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--muted)' }}>
              No projects published yet. Add one from Django Admin.
            </p>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
                {categories.map(c => (
                  <button key={c} onClick={() => setFilter(c)} style={{
                    padding: '7px 18px', borderRadius: 20, fontSize: '.83rem', fontWeight: 500, cursor: 'pointer',
                    border: `1.5px solid ${filter===c ? 'var(--accent)' : 'var(--border)'}`,
                    background: filter===c ? 'rgba(0,212,255,0.1)' : 'transparent',
                    color: filter===c ? 'var(--accent)' : 'var(--muted)', transition: 'all .2s',
                  }}>{c}</button>
                ))}
              </div>
              <div className="grid-3">
                {filtered.map((p, i) => {
                  const color = colorFor(i);
                  return (
                    <div key={p.id} className="card" style={{ cursor: p.live_url ? 'pointer' : 'default' }}
                      onClick={() => { if (p.live_url) window.open(p.live_url, '_blank', 'noopener,noreferrer'); }}
                    >
                      <div style={{
                        height: 155, borderRadius: 10, marginBottom: '1.1rem', overflow: 'hidden',
                        background: `linear-gradient(135deg,${color}18,${color}30)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: `1px solid ${color}28`,
                      }}>
                        {p.thumbnail
                          ? <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : <span style={{ fontSize: 52 }}>💻</span>}
                      </div>
                      {p.category?.name && (
                        <span style={{ fontSize: '.72rem', padding: '3px 10px', borderRadius: 20, background: `${color}15`, color, fontWeight: 600 }}>
                          {p.category.name}
                        </span>
                      )}
                      <h3 style={{ color: 'var(--text)', fontWeight: 700, margin: '.6rem 0 .6rem', fontSize: '1.05rem', fontFamily: 'var(--font-head)' }}>{p.title}</h3>
                      <p style={{ color: 'var(--muted)', fontSize: '.85rem', lineHeight: 1.6, marginBottom: '.8rem' }}>{p.description}</p>
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                        {(p.technologies || []).map(t => <span key={t} className="chip">{t}</span>)}
                      </div>
                      {(p.live_url || p.github_url) && (
                        <div style={{ display: 'flex', gap: 12, marginTop: '.9rem' }}>
                          {p.live_url && <a href={p.live_url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: '.8rem', color, textDecoration: 'none', fontWeight: 600 }}>Live Site →</a>}
                          {p.github_url && <a href={p.github_url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: '.8rem', color: 'var(--muted)', textDecoration: 'none', fontWeight: 600 }}>GitHub →</a>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
