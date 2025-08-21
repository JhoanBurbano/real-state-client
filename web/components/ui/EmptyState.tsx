import React from 'react'

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="text-center py-16 border border-dashed border-line/40 rounded-lg bg-surface">
      <h2 className="text-h4 font-brand mb-2">{title}</h2>
      {description && <p className="text-text-muted">{description}</p>}
    </div>
  )
}

