import React from 'react'

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-md border border-line/40 bg-bg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${props.className || ''}`} />
}

