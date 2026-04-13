'use client'

import { useEffect, useState } from 'react'

export default function CursorLight() {
  const [position, setPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300"
      style={{
        background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, oklch(0.65 0.25 210 / 0.35), transparent 80%)`,
      }}
    />
  )
}
