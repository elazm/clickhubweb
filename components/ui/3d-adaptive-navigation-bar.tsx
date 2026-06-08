'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'

interface NavItem {
  label: string
  id: string
}

/**
 * 3D Adaptive Navigation Pill
 * Smart navigation with scroll detection and hover expansion
 */
export const PillBase: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [expanded, setExpanded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevSectionRef = useRef('home')

  const navItems: NavItem[] = [
    { label: 'Home',     id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Process',  id: 'how-we-work' },
    { label: 'Contact',  id: 'cta' },
  ]

  // Spring animations for smooth motion
  const pillWidth = useSpring(140, { stiffness: 220, damping: 25, mass: 1 })
  const pillShift  = useSpring(0,   { stiffness: 220, damping: 25, mass: 1 })

  // Handle hover expansion
  useEffect(() => {
    if (hovering) {
      setExpanded(true)
      pillWidth.set(520)
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false)
        pillWidth.set(140)
      }, 600)
    }
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [hovering, pillWidth])

  // Scroll-based active section detection
  useEffect(() => {
    const tracked = ['services', 'how-we-work', 'cta']

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            prevSectionRef.current = entry.target.id
          }
        })
      },
      // Section becomes active when its top crosses 25% down from top of viewport
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    tracked.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const onScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection('home')
        prevSectionRef.current = 'home'
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleSectionClick = (sectionId: string) => {
    setIsTransitioning(true)
    prevSectionRef.current = sectionId
    setActiveSection(sectionId)
    setHovering(false)

    // Smooth scroll to section
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    setTimeout(() => setIsTransitioning(false), 400)
  }

  const activeItem = navItems.find(item => item.id === activeSection)

  return (
    <motion.nav
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative rounded-full"
      style={{
        width: pillWidth,
        height: '52px',
        background: 'rgba(10, 14, 12, 0.88)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        border: '1px solid rgba(46, 204, 143, 0.18)',
        boxShadow: '0 4px 24px rgba(0,0,0,.35), 0 1px 0 rgba(255,255,255,.04) inset',
        x: pillShift,
        overflow: 'hidden',
      }}
    >
      {/* Subtle top sheen */}
      <div className="absolute inset-x-0 top-0 pointer-events-none rounded-t-full"
        style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.12) 30%, rgba(255,255,255,.12) 70%, transparent 100%)' }} />

      {/* Content */}
      <div ref={containerRef} className="relative z-10 h-full flex items-center justify-center px-7"
        style={{ fontFamily: 'Inter,-apple-system,BlinkMacSystemFont,"SF Pro",sans-serif' }}>

        {/* Collapsed: active label */}
        {!expanded && (
          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.span
                key={activeItem.id}
                initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                transition={{ duration: .3, ease: [.4, 0, .2, 1] }}
                style={{ fontSize: '15px', fontWeight: 600, color: '#2ECC8F', letterSpacing: '.3px', whiteSpace: 'nowrap', WebkitFontSmoothing: 'antialiased' }}
              >
                {activeItem.label}
              </motion.span>
            )}
          </AnimatePresence>
        )}

        {/* Expanded: all items */}
        {expanded && (
          <div className="flex items-center justify-evenly w-full">
            {navItems.map((item, index) => {
              const isActive = item.id === activeSection
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ delay: index * .06, duration: .22, ease: 'easeOut' }}
                  onClick={() => handleSectionClick(item.id)}
                  className="relative cursor-pointer"
                  style={{ fontSize: '14.5px', fontWeight: isActive ? 600 : 400, color: isActive ? '#2ECC8F' : 'rgba(255,255,255,.50)', background: 'transparent', border: 'none', padding: '10px 14px', outline: 'none', whiteSpace: 'nowrap', WebkitFontSmoothing: 'antialiased', letterSpacing: '.2px', transition: 'color .15s ease' }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,.90)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,.50)' }}
                >
                  {item.label}
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </motion.nav>
  )
}
