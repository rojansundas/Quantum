import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_LINKS = [
  { href: '/',          label: 'Home'      },
  { href: '/about',     label: 'About'     },
  { href: '/services',  label: 'Services'  },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog',      label: 'Blog'      },
  { href: '/careers',   label: 'Careers'   },
  { href: '/contact',   label: 'Contact'   },
];

export default function Navbar() {
  const router   = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [router.pathname]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(10,14,26,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all .3s ease',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 68,
      }}>
        {/* Logo */}
        <Link
  href="/"
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none'
  }}
>
<img
  src="/logo.png"
  alt="Company Logo"
  style={{
    width: '90px',
    height: '90px',
    objectFit: 'contain',
    borderRadius: '12px',
    padding: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease'
  }}
/>

  <span
    style={{
      fontSize: '1.05rem',
      fontWeight: 700,
      color: 'var(--text)',
      fontFamily: 'var(--font-head)'
    }}
  >
    Quantum Tech
    <span style={{ color: 'var(--accent)' }}> Nepal</span>
  </span>
</Link>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {NAV_LINKS.map(({ href, label }) => {
            const active = router.pathname === href;
            return (
              <Link key={href} href={href} style={{
                padding: '6px 13px', borderRadius: 8, fontSize: '.88rem',
                color: active ? 'var(--accent)' : 'var(--muted)',
                fontWeight: active ? 600 : 400,
                borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                transition: 'all .2s', textDecoration: 'none',
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--muted)'; }}
              >{label}</Link>
            );
          })}
          <Link href="/contact" className="btn-primary" style={{ marginLeft: 8, textDecoration: 'none', fontSize: '.88rem', padding: '.55rem 1.25rem' }}>
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setOpen(!open)}
          style={{
            display: 'none', background: 'none', border: 'none',
            color: 'var(--text)', fontSize: 22, cursor: 'pointer',
          }}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(10,14,26,0.98)', borderTop: '1px solid var(--border)',
          padding: '1rem 1.5rem 1.5rem',
        }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              display: 'block', padding: '.7rem 0',
              color: router.pathname === href ? 'var(--accent)' : 'var(--muted)',
              fontWeight: router.pathname === href ? 600 : 400,
              borderBottom: '1px solid var(--border)',
              textDecoration: 'none', fontSize: '.95rem',
            }}>{label}</Link>
          ))}
          <Link href="/contact" className="btn-primary" style={{
            display: 'block', textAlign: 'center', marginTop: '1rem',
            textDecoration: 'none',
          }}>Get Started</Link>
        </div>
      )}

      <style>{`
        @media (max-width:768px) {
          .hide-mobile { display:none !important; }
          .show-mobile { display:flex !important; }
        }
      `}</style>
    </nav>
  );
}
