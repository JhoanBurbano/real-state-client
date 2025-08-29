'use client'

import {
  ENV_CONFIG,
  isDevelopment,
  isFeatureEnabled,
} from '@/lib/config/environment'

interface EnvironmentInfoProps {
  showDebug?: boolean
  className?: string
}

export function EnvironmentInfo({
  showDebug = false,
  className = '',
}: EnvironmentInfoProps) {
  const isDev = isDevelopment()
  const analyticsEnabled = isFeatureEnabled('ENABLE_ANALYTICS')
  const debugEnabled = isFeatureEnabled('ENABLE_DEBUG')
  const mockDataEnabled = isFeatureEnabled('ENABLE_MOCK_DATA')

  if (!showDebug && !isDev) {
    return null
  }

  return (
    <div className={`p-4 bg-gray-100 rounded-lg text-sm ${className}`}>
      <h3 className="font-semibold mb-2 text-gray-800">
        Environment Information
      </h3>

      <div className="space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>Environment:</span>
          <span
            className={`font-mono ${isDev ? 'text-green-600' : 'text-blue-600'}`}
          >
            {ENV_CONFIG.ENV.IS_DEVELOPMENT ? 'Development' : 'Production'}
          </span>
        </div>

        <div className="flex justify-between">
          <span>API Base URL:</span>
          <span className="font-mono text-gray-700">
            {ENV_CONFIG.API.BASE_URL}
          </span>
        </div>

        <div className="flex justify-between">
          <span>API Dev URL:</span>
          <span className="font-mono text-gray-700">
            {ENV_CONFIG.API.DEV_URL}
          </span>
        </div>

        <div className="flex justify-between">
          <span>App URL:</span>
          <span className="font-mono text-gray-700">{ENV_CONFIG.APP.URL}</span>
        </div>

        <div className="flex justify-between">
          <span>App Version:</span>
          <span className="font-mono text-gray-700">
            {ENV_CONFIG.APP.VERSION}
          </span>
        </div>
      </div>

      {showDebug && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          <h4 className="font-semibold mb-2 text-gray-800">Feature Flags</h4>
          <div className="space-y-1 text-gray-600">
            <div className="flex justify-between">
              <span>Analytics:</span>
              <span
                className={analyticsEnabled ? 'text-green-600' : 'text-red-600'}
              >
                {analyticsEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Debug Mode:</span>
              <span
                className={debugEnabled ? 'text-green-600' : 'text-red-600'}
              >
                {debugEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Mock Data:</span>
              <span
                className={mockDataEnabled ? 'text-green-600' : 'text-red-600'}
              >
                {mockDataEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Hook para usar ENV_CONFIG en componentes
export function useEnvironment() {
  return {
    config: ENV_CONFIG,
    isDev: isDevelopment(),
    isProd: ENV_CONFIG.ENV.IS_PRODUCTION,
    isTest: ENV_CONFIG.ENV.IS_TEST,
    features: ENV_CONFIG.FEATURES,
    api: ENV_CONFIG.API,
    app: ENV_CONFIG.APP,
    isFeatureEnabled,
  }
}
