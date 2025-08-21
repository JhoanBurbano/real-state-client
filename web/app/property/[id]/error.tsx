"use client"
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-h5 font-brand mb-2">Failed to load property</h2>
      <p className="text-text-muted mb-4">{error.message}</p>
      <button className="px-4 py-2 rounded-md bg-accent text-on-accent" onClick={() => reset()}>Retry</button>
    </div>
  )
}

