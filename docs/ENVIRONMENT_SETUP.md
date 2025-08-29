# 🌍 Configuración de Variables de Entorno

Este documento explica cómo configurar y usar las variables de entorno en el proyecto Million Real Estate.

## 📁 Archivos de Configuración

### **1. Archivo .env (Principal)**

```bash
# Million Real Estate API Configuration
NEXT_PUBLIC_API_BASE_URL=https://million-real-estate-api-sh25jnp3aa-uc.a.run.app
NEXT_PUBLIC_API_DEV_URL=http://localhost:5208

# Environment
NODE_ENV=development

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **2. Archivo .env.example (Plantilla)**

- Copia este archivo y renómbralo a `.env`
- Llena los valores según tu entorno

## 🔧 Variables de Entorno Principales

### **API Configuration**

| Variable                   | Descripción                 | Valor por Defecto                                         |
| -------------------------- | --------------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | URL de producción de la API | `https://million-real-estate-api-sh25jnp3aa-uc.a.run.app` |
| `NEXT_PUBLIC_API_DEV_URL`  | URL de desarrollo de la API | `http://localhost:5208`                                   |

### **App Configuration**

| Variable              | Descripción                   | Valor por Defecto       |
| --------------------- | ----------------------------- | ----------------------- |
| `NEXT_PUBLIC_APP_URL` | URL de la aplicación frontend | `http://localhost:3000` |
| `NODE_ENV`            | Entorno de ejecución          | `development`           |

### **Features (Opcionales)**

| Variable                       | Descripción          | Valor por Defecto |
| ------------------------------ | -------------------- | ----------------- |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Habilitar analytics  | `false`           |
| `NEXT_PUBLIC_ENABLE_DEBUG`     | Habilitar modo debug | `false`           |
| `NEXT_PUBLIC_ENABLE_MOCK_DATA` | Usar datos mock      | `false`           |

### **External Services (Opcionales)**

| Variable                             | Descripción             | Valor por Defecto |
| ------------------------------------ | ----------------------- | ----------------- |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`    | API Key de Google Maps  | `undefined`       |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clave pública de Stripe | `undefined`       |
| `VERCEL_BLOB_READ_WRITE_TOKEN`       | Token de Vercel Blob    | `undefined`       |

## 🚀 Cómo Usar las Variables

### **1. En Componentes React (Recomendado)**

```typescript
import { ENV_CONFIG } from '@/lib/config/environment'
import { useEnvironment } from '@/components/ui/EnvironmentInfo'

function MyComponent() {
  // Usando ENV_CONFIG directamente
  const apiUrl = ENV_CONFIG.API.BASE_URL
  const isDev = ENV_CONFIG.ENV.IS_DEVELOPMENT

  // O usando el hook useEnvironment
  const { config, isDev: isDevelopment, features } = useEnvironment()

  return (
    <div>
      <p>API URL: {apiUrl}</p>
      <p>Environment: {isDev ? 'Development' : 'Production'}</p>
      <p>Analytics: {features.ENABLE_ANALYTICS ? 'On' : 'Off'}</p>
    </div>
  )
}
```

### **2. En Hooks y Utilidades**

```typescript
import { getApiUrl, isFeatureEnabled } from '@/lib/config/environment'

export function useApi() {
  const apiUrl = getApiUrl()
  const analyticsEnabled = isFeatureEnabled('ENABLE_ANALYTICS')

  // ... resto del código
}
```

### **3. En Configuración de API**

```typescript
import { getApiConfig } from '@/lib/config/api'

const config = getApiConfig()
const baseUrl = config.BASE_URL
```

### **4. En Servicios (MillionAPI)**

```typescript
import { ENV_CONFIG } from '@/lib/config/environment'

class MillionAPI {
  constructor() {
    this.baseUrl = ENV_CONFIG.ENV.IS_DEVELOPMENT
      ? ENV_CONFIG.API.DEV_URL
      : ENV_CONFIG.API.BASE_URL
  }

  getDebugInfo() {
    return {
      baseUrl: this.baseUrl,
      isDevelopment: ENV_CONFIG.ENV.IS_DEVELOPMENT,
      isProduction: ENV_CONFIG.ENV.IS_PRODUCTION,
      appUrl: ENV_CONFIG.APP.URL,
      features: ENV_CONFIG.FEATURES,
    }
  }
}
```

## 🔒 Seguridad

### **Variables Públicas vs Privadas**

#### **✅ Públicas (NEXT*PUBLIC*)**

- Accesibles en el cliente (navegador)
- Se incluyen en el bundle de JavaScript
- **Ejemplo**: `NEXT_PUBLIC_API_BASE_URL`

#### **❌ Privadas**

- Solo accesibles en el servidor
- No se incluyen en el bundle del cliente
- **Ejemplo**: `JWT_SECRET`, `DATABASE_URL`

### **Variables Sensibles**

```bash
# NUNCA incluir en el cliente
JWT_SECRET=your_secret_key_here
DATABASE_URL=your_database_url_here
SMTP_PASS=your_email_password_here
```

## 🌍 Entornos

### **Development (.env.local)**

```bash
NODE_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:5208
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Production (.env.production)**

```bash
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://million-real-estate-api-sh25jnp3aa-uc.a.run.app
NEXT_PUBLIC_APP_URL=https://million-realestate.com
```

### **Testing (.env.test)**

```bash
NODE_ENV=test
NEXT_PUBLIC_API_BASE_URL=http://localhost:5208
NEXT_PUBLIC_ENABLE_MOCK_DATA=true
```

## 📋 Comandos Útiles

### **Crear archivo .env**

```bash
# Copiar plantilla
cp .env.example .env

# O crear manualmente
touch .env
```

### **Verificar variables**

```bash
# En desarrollo
npm run dev

# En producción
npm run build
npm start
```

### **Validar configuración**

```typescript
import { validateEnvironment } from '@/lib/config/environment'

// En tu aplicación
if (!validateEnvironment()) {
  console.warn('Some environment variables are missing')
}
```

## 🎯 Componente de Ejemplo

### **EnvironmentInfo Component**

```typescript
import { EnvironmentInfo } from '@/components/ui/EnvironmentInfo'

// En desarrollo siempre visible
<EnvironmentInfo />

// Con información de debug
<EnvironmentInfo showDebug={true} />

// Hook personalizado
const { config, isDev, features } = useEnvironment()
```

## 🐛 Troubleshooting

### **Problema: Variables no se cargan**

```bash
# Solución: Reiniciar servidor
npm run dev
```

### **Problema: Error de build**

```bash
# Verificar que .env esté en la raíz
ls -la .env

# Verificar sintaxis
cat .env
```

### **Problema: Variables undefined**

```typescript
// Verificar que empiecen con NEXT_PUBLIC_
console.log(process.env.NEXT_PUBLIC_API_BASE_URL)

// O usar ENV_CONFIG
console.log(ENV_CONFIG.API.BASE_URL)
```

## 📚 Referencias

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Environment Variables Best Practices](https://nextjs.org/docs/basic-features/environment-variables#environment-variables-best-practices)
- [Loading Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## ✅ Checklist

- [ ] Archivo `.env` creado en la raíz del proyecto
- [ ] Variables principales configuradas
- [ ] Variables opcionales configuradas (si es necesario)
- [ ] Servidor reiniciado después de cambios
- [ ] Build exitoso con `npm run build`
- [ ] Variables accesibles en componentes usando `ENV_CONFIG`
- [ ] Configuración validada con `validateEnvironment()`
- [ ] Componente `EnvironmentInfo` funcionando correctamente
