import Head from 'next/head';
import Link from 'next/link';
import { fetchBlogPosts } from '../../lib/api';
import { readingTime, formatDate } from '../../lib/display';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

async function fetchPostDetail(slug) {
  const res = await fetch(`${BASE_URL}/blog/posts/${slug}/`);
  if (!res.ok) return null;
  return res.json();
}

export async function getStaticPaths() {
  const posts = (await fetchBlogPosts()) || [];
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const post = await fetchPostDetail(params.slug);
  if (!post) return { notFound: true };
  return { props: { post }, revalidate: 60 };
}

export default function BlogDetailPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.meta_title || post.title} — Quantum Tech Nepal Blog</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
      </Head>
      <section style={{ padding: '8rem 1.5rem 3rem' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <Link href="/blog" style={{ color: 'var(--muted)', fontSize: '.85rem', textDecoration: 'none' }}>
            ← All Articles
          </Link>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', margin: '1.5rem 0 1rem' }}>
            {(post.tags || []).map(t => (
              <span key={t.id} style={{ fontSize: '.72rem', padding: '3px 10px', borderRadius: 20, background: 'rgba(0,212,255,0.08)', color: 'var(--accent)', fontWeight: 600 }}>{t.name}</span>
            ))}
            <span style={{ fontSize: '.82rem', color: 'var(--muted)' }}>
              {formatDate(post.published_at)} · {readingTime(post.content)} read
              {post.author?.full_name ? ` · By ${post.author.full_name}` : ''}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.9rem,4vw,2.7rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '1.5rem', fontFamily: 'var(--font-head)' }}>
            {post.title}
          </h1>
          {post.cover_image && (
            <img src={post.cover_image} alt={post.title} style={{ width: '100%', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }} />
          )}
          <div style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: '1rem', whiteSpace: 'pre-line' }}>
            {post.content}
          </div>
        </div>
      </section>
    </>
  );
}
