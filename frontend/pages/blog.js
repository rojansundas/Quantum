import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { fetchBlogPosts } from '../lib/api';
import { readingTime, formatDate } from '../lib/display';

export async function getStaticProps() {
  const posts = (await fetchBlogPosts()) || [];
  return {
    props: { posts },
    revalidate: 60, // pick up new/edited Posts from Admin within a minute
  };
}

export default function BlogPage({ posts }) {
  const cats = ['All', ...new Set(posts.flatMap(p => (p.tags || []).map(t => t.name)))];
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? posts : posts.filter(p => (p.tags || []).some(t => t.name === cat));

  return (
    <>
      <Head>
        <title>Blog — Quantum Tech Nepal</title>
        <meta name="description" content="Tech articles, startup lessons, and industry perspectives from the Quantum Tech Nepal team." />
      </Head>
      <section style={{ padding: '8rem 1.5rem 4rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="badge" style={{ marginBottom: '1.25rem' }}>Blog</div>
          <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '1rem', fontFamily: 'var(--font-head)' }}>
            Insights from the Trenches
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.75 }}>
            Tech articles, startup lessons, and industry perspectives from our team.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {posts.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--muted)' }}>
              No posts published yet. Add one from Django Admin.
            </p>
          ) : (
            <>
              {cats.length > 1 && (
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
                  {cats.map(c => (
                    <button key={c} onClick={() => setCat(c)} style={{
                      padding: '7px 18px', borderRadius: 20, fontSize: '.83rem', fontWeight: 500, cursor: 'pointer',
                      border: `1.5px solid ${cat===c ? 'var(--accent)' : 'var(--border)'}`,
                      background: cat===c ? 'rgba(0,212,255,0.1)' : 'transparent',
                      color: cat===c ? 'var(--accent)' : 'var(--muted)', transition: 'all .2s',
                    }}>{c}</button>
                  ))}
                </div>
              )}
              <div className="grid-3">
                {filtered.map((p) => (
                  <div key={p.id} className="card" style={{ overflow: 'hidden' }}>
                    <div style={{
                      height: 110, borderRadius: 10, marginBottom: '1.1rem', overflow: 'hidden',
                      background: 'rgba(0,212,255,0.04)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {p.cover_image
                        ? <img src={p.cover_image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ fontSize: 44 }}>📝</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: '.7rem' }}>
                      {(p.tags || []).slice(0, 1).map(t => (
                        <span key={t.id} style={{ fontSize: '.72rem', padding: '3px 10px', borderRadius: 20, background: 'rgba(0,212,255,0.08)', color: 'var(--accent)', fontWeight: 600 }}>{t.name}</span>
                      ))}
                      <span style={{ fontSize: '.78rem', color: 'var(--muted)' }}>
                        {formatDate(p.published_at)} · {readingTime(p.excerpt)} read
                      </span>
                    </div>
                    <h3 style={{ color: 'var(--text)', fontWeight: 700, margin: '0 0 .6rem', fontSize: '.97rem', lineHeight: 1.45, fontFamily: 'var(--font-head)' }}>{p.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '.85rem', lineHeight: 1.6, margin: '0 0 1rem' }}>{p.excerpt}</p>
                    <Link href={`/blog/${p.slug}`} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.83rem', fontWeight: 600, textDecoration: 'none' }}>
                      Read Article →
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
