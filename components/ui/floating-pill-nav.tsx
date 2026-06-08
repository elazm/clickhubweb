'use client'

import { useEffect, useState } from 'react'
import { PillBase } from './3d-adaptive-navigation-bar'

export default function FloatingPillNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show only after the hero section has fully left the viewport
      const hero = document.querySelector('section') as HTMLElement | null
      const threshold = hero ? hero.offsetHeight - 80 : window.innerHeight * 0.9
      setVisible(window.scrollY > threshold)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-6 left-1/2 z-50"
      style={{
        transform: visible ? 'translateX(-50%) translateY(0px)' : 'translateX(-50%) translateY(-16px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <PillBase />
    </div>
  )
}
