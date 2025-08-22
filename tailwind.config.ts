import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-elev': 'var(--color-surface-elev)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        line: 'var(--color-line)',
        accent: 'var(--color-accent)',
        'on-accent': 'var(--color-on-accent)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        border: 'var(--color-line)',
      },
      fontFamily: {
        inter: 'var(--font-inter)',
        playfair: 'var(--font-playfair)',
      },
    },
  },
}

export default config
