import Navbar from './Navbar';
import Footer from './Footer';
import { useState, useEffect } from 'react';

// Floating WhatsApp + back-to-top buttons
function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <>
      <a
        href="https://wa.me/9779840357490"
        target="_blank" rel="noopener noreferrer"
        title="Chat on WhatsApp"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 999,
          width: 52, height: 52, borderRadius: '50%',
          background: '#25D366', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 24,
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          textDecoration: 'none', transition: 'transform .2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >💬</a>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to top"
          style={{
            position: 'fixed', bottom: 84, right: 24, zIndex: 999,
            width: 44, height: 44, borderRadius: '50%', cursor: 'pointer',
            background: 'rgba(0,212,255,0.12)', border: '1px solid var(--accent)',
            color: 'var(--accent)', fontSize: 18,
            boxShadow: '0 4px 20px rgba(0,212,255,0.2)',
            transition: 'all .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,255,0.22)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,212,255,0.12)'}
        >↑</button>
      )}
    </>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
