import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-elev': 'var(--surface-elev)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'on-accent': 'var(--on-accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)'
      },
      fontFamily: {
        brand: ['var(--font-brand)', 'serif'],
        base: ['var(--font-base)', 'sans-serif']
      },
      fontSize: {
        h1: 'var(--fs-h1)',
        h2: 'var(--fs-h2)',
        h3: 'var(--fs-h3)',
        h4: 'var(--fs-h4)',
        h5: 'var(--fs-h5)',
        h6: 'var(--fs-h6)',
        body: 'var(--fs-body)'
      },
      lineHeight: {
        tight: 'var(--lh-tight)',
        base: 'var(--lh-base)'
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)'
      },
      boxShadow: {
        'luxury-sm': 'var(--shadow-sm)',
        'luxury-md': 'var(--shadow-md)',
        'luxury-lg': 'var(--shadow-lg)'
      }
    }
  },
  darkMode: ['class', '[data-theme="dark"]']
}

export default config

