'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-we-work' },
  { label: 'Guarantee', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/[0.06] shadow-sm">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-bold text-[17px] text-[#0f172a]">
          <div className="w-7 h-7 rounded-md bg-[#1DB874] flex items-center justify-center text-white text-xs font-black">CH</div>
          Clickhub
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-[#1a1a1a] hover:text-[#1DB874] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <a href="#cta" className="h-10 px-5 rounded-lg bg-[#1DB874] text-white text-sm font-bold flex items-center hover:bg-[#18a064] transition-colors">
            Get a free audit →
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-[#1a1a1a]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-black/[0.06] px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-[#1a1a1a] hover:text-[#1DB874]">
              {l.label}
            </a>
          ))}
          <a href="#cta" onClick={() => setOpen(false)} className="mt-2 h-10 px-5 rounded-lg bg-[#1DB874] text-white text-sm font-bold flex items-center justify-center">
            Get a free audit →
          </a>
        </div>
      )}
    </header>
  )
}
