import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }

export function Button({ variant = 'primary', className = '', ...props }: Props) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md focus:outline-none focus-visible:focus-outline disabled:opacity-50 disabled:pointer-events-none'
  const styles = variant === 'primary'
    ? 'bg-accent text-on-accent hover:opacity-90'
    : variant === 'secondary'
    ? 'bg-surface text-text border border-line/40 hover:bg-surface-elev'
    : 'bg-transparent text-text hover:bg-surface'
  return <button className={`${base} ${styles} ${className}`} {...props} />
}

