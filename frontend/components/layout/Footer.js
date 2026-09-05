import Link from 'next/link';

const COLS = [
  { title: 'Company',  links: [{ label:'About', href:'/about' },{ label:'Services', href:'/services' },{ label:'Portfolio', href:'/portfolio' },{ label:'Blog', href:'/blog' },{ label:'Careers', href:'/careers' }] },
  { title: 'Services', links: [{ label:'Web Development', href:'/services' },{ label:'Mobile Apps', href:'/services' },{ label:'UI/UX Design', href:'/services' },{ label:'AI Solutions', href:'/services' },{ label:'Digital Marketing', href:'/services' }] },
  { title: 'Contact',  links: [{ label:'quantumtechnepal2083@gmail.com', href:'mailto:quantumtechnepal2083@gmail.com' },{ label:'+977 9819075360', href:'tel:+9779840357490' },{ label:'Dharan, Nepal', href:'#' },{ label:'Mon–Fri 9AM–6PM', href:'#' }] },
];

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'rgba(10,14,26,0.98)',
      padding: '4rem 1.5rem 2rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))',
          gap: '2rem', marginBottom: '3rem',
        }}>
          {/* Brand col */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem', textDecoration: 'none' }}>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 15, color: '#fff',
              }}>Q</div>
              <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '.95rem', fontFamily: 'var(--font-head)' }}>
                Quantum Tech Nepal
              </span>
            </Link>
            <p style={{ color: 'var(--muted)', fontSize: '.85rem', lineHeight: 1.7, maxWidth: 240, marginBottom: '1.25rem' }}>
              Building digital experiences that transform businesses. Your vision, our expertise.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['🐦','💼','📘','📸'].map((icon, i) => (
                <div key={i} style={{
                  width: 34, height: 34, borderRadius: 8, cursor: 'pointer',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'border-color .2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >{icon}</div>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {COLS.map(col => (
            <div key={col.title}>
              <h4 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '.85rem', marginBottom: '1rem', fontFamily: 'var(--font-head)' }}>
                {col.title}
              </h4>
              {col.links.map(l => (
                <div key={l.label} style={{ marginBottom: '.5rem' }}>
                  <Link href={l.href} style={{
                    color: 'var(--muted)', fontSize: '.83rem', textDecoration: 'none',
                    transition: 'color .2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                  >{l.label}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '.75rem',
        }}>
          <span style={{ color: 'var(--muted)', fontSize: '.8rem' }}>
            © {new Date().getFullYear()} Quantum Tech Nepal Pvt. Ltd. All rights reserved.
          </span>
          <span style={{ color: 'var(--muted)', fontSize: '.8rem' }}>
            Built with ❤️ in Dharan
          </span>
        </div>
      </div>
    </footer>
  );
}
