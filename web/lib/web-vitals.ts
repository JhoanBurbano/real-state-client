import { onCLS, onINP, onLCP, Metric } from 'web-vitals'

type Handler = (m: Metric) => void

export function initWebVitalsLogger(handler?: Handler) {
  const log = handler ?? ((m) => console.log(`[WebVitals] ${m.name}:`, m.value))
  onLCP(log)
  onINP(log)
  onCLS(log)
}

