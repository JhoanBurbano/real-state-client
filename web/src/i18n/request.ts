import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => ({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  messages: (await import('../../messages/en.json')).default
}))

