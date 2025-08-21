"use client"
import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <html>
      <body>
        <main className="p-10 text-center">
          <h1 className="text-h4 font-brand">Something went wrong</h1>
          <p className="text-text-muted">Please try again.</p>
          <button onClick={() => reset()} className="mt-4 px-4 py-2 rounded-md bg-accent text-on-accent">Retry</button>
        </main>
      </body>
    </html>
  )
}

