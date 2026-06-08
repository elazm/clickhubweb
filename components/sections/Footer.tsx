'use client'

const services = ['Website Development', 'Business Software', 'Mobile & Web Apps', 'Digital Marketing', 'IT Consulting', 'Cloud & Infrastructure', 'Automation & AI']
const company = ['About Clickhub', 'Our Work', 'Case Studies', 'Blog & Guides', 'Our Guarantee', 'Get a Free Audit']
const resources = ['Free Consultation', 'FAQ', 'Technology Stack', 'Project Timeline', 'Privacy Policy', 'Terms of Service']
const contact = ['contact@clickhub.ma', 'Get in Touch', 'Client Portal', 'Support', 'Tetouan, Morocco']

export default function Footer() {
  return (
    <footer className="bg-brand-bg border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 pb-12 pt-14 grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <a href="#" className="flex items-center" style={{ marginBottom: '24px' }}>
            <img src="/logo-white.svg" alt="Clickhub" className="h-8 w-auto" />
          </a>
          <p className="leading-relaxed mb-6" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
            A digital technology agency building websites, software, apps, and automated systems for modern businesses.
          </p>
          {/* Social */}
          <div className="flex gap-4">
            <a href="https://www.instagram.com/clickhub.ma/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', transition: 'color 150ms' }} onMouseEnter={e => (e.currentTarget.style.color = '#2ECC8F')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>Instagram</a>
            <a href="https://www.linkedin.com/company/clickhubma" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', transition: 'color 150ms' }} onMouseEnter={e => (e.currentTarget.style.color = '#2ECC8F')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>LinkedIn</a>
            <a href="https://wa.me/212600000000" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', transition: 'color 150ms' }} onMouseEnter={e => (e.currentTarget.style.color = '#2ECC8F')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>WhatsApp</a>
          </div>
        </div>

        {/* Nav cols */}
        {[
          { heading: 'Services', links: services },
          { heading: 'Company', links: company },
          { heading: 'Resources', links: resources },
          { heading: 'Contact', links: contact },
        ].map(col => (
          <nav key={col.heading} aria-label={col.heading}>
            <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>{col.heading}</h4>
            <ul>
              {col.links.map(l => (
                <li key={l} style={{ lineHeight: 2 }}>
                  <a
                    href="#"
                    style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', transition: 'color 150ms', display: 'inline-block' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#2ECC8F')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] px-6 py-5 max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-brand-text/60">© 2025 Clickhub. All rights reserved. Based in Tetouan, Morocco.</p>
        <p className="text-xs text-brand-text/40">🇲🇦 Arabic / Français / English</p>
      </div>
    </footer>
  )
}
