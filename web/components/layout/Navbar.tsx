import Link from 'next/link'
import React from 'react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-bg/90 backdrop-blur border-b border-line/30">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-brand text-h5">MILLION</Link>
        <div className="flex items-center gap-4">
          <Link href="/create" className="text-accent underline-offset-4 hover:underline">Create</Link>
        </div>
      </nav>
    </header>
  )
}

