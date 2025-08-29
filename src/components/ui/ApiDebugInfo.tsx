'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { millionAPI } from '@/lib/api/million-api'
import { ENV_CONFIG } from '@/lib/config/environment'

export function ApiDebugInfo() {
  const [healthStatus, setHealthStatus] = useState<string>('Not tested')
  const [testPropertyId] = useState('test-001')
  const [traces, setTraces] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testHealthCheck = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await millionAPI.healthCheck()
      setHealthStatus(`Healthy - ${response.timestamp}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Health check failed')
      setHealthStatus('Unhealthy')
    } finally {
      setLoading(false)
    }
  }

  const testPropertyTraces = async () => {
    try {
      setLoading(true)
      setError(null)
      const tracesData = await millionAPI.getPropertyTraces(testPropertyId)
      setTraces(tracesData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch traces')
      setTraces([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-surface-elev rounded-lg p-6 border border-line">
      <h3 className="text-lg font-semibold text-text mb-4">
        API Debug Information
      </h3>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-text mb-2">Configuration</h4>
          <div className="text-sm text-text-muted space-y-1">
            <div>Base URL: {ENV_CONFIG.API.BASE_URL}</div>
            <div>Dev URL: {ENV_CONFIG.API.DEV_URL}</div>
            <div>
              Environment:{' '}
              {ENV_CONFIG.ENV.IS_DEVELOPMENT ? 'Development' : 'Production'}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-text mb-2">Health Check</h4>
          <div className="flex items-center space-x-3">
            <Button onClick={testHealthCheck} disabled={loading} size="sm">
              Test Health
            </Button>
            <span
              className={`text-sm ${healthStatus.includes('Healthy') ? 'text-success' : 'text-text-muted'}`}
            >
              {healthStatus}
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-text mb-2">Property Traces Test</h4>
          <div className="flex items-center space-x-3 mb-3">
            <Button onClick={testPropertyTraces} disabled={loading} size="sm">
              Test Traces API
            </Button>
            <span className="text-sm text-text-muted">
              Property ID: {testPropertyId}
            </span>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
              Error: {error}
            </div>
          )}

          {traces.length > 0 && (
            <div className="text-sm">
              <div className="font-medium text-text mb-2">
                Traces Found: {traces.length}
              </div>
              <div className="space-y-2">
                {traces.slice(0, 3).map((trace, index) => (
                  <div key={index} className="bg-surface p-2 rounded text-xs">
                    <div>Action: {trace.action}</div>
                    <div>Timestamp: {trace.timestamp}</div>
                    <div>Notes: {trace.notes || 'No notes'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

