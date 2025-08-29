# 🚀 **BACKEND REQUEST - Endpoints y Funcionalidades Faltantes**

## 📋 **Resumen de Solicitud**

El frontend necesita acceso a los siguientes endpoints y funcionalidades del backend que actualmente no están disponibles o no están documentados para integración.

## 🔍 **Endpoints Críticos Faltantes**

### **1. Property Traces/Transaction History**

```
GET /properties/{id}/traces
```

**Descripción**: Historial completo de transacciones y cambios de estado de una propiedad
**Uso**: Mostrar timeline de cambios, historial de precios, estado de venta/alquiler
**Prioridad**: ALTA - Necesario para PropertyTimeline component

### **2. Media Management (PATCH)**

```
PATCH /properties/{id}/media
```

**Descripción**: Actualizar media de propiedad (cover + gallery) sin modificar otros campos
**Uso**: Gestión independiente de imágenes, reordenar galería, cambiar cover
**Prioridad**: ALTA - Necesario para gestión de media

### **3. Advanced Search with Full-Text**

```
GET /properties/search
```

**Descripción**: Búsqueda avanzada con full-text search en múltiples campos
**Uso**: Búsqueda semántica, filtros complejos, resultados más relevantes
**Prioridad**: MEDIA - Mejora UX de búsqueda

### **4. Property Statistics**

```
GET /stats/properties
```

**Descripción**: Estadísticas agregadas de propiedades (conteos, promedios, tendencias)
**Uso**: Dashboard analytics, insights de mercado, métricas de negocio
**Prioridad**: MEDIA - Para analytics y reporting

### **5. Webhooks for Real-time Updates**

```
POST /webhooks/property-updated
```

**Descripción**: Notificaciones en tiempo real de cambios en propiedades
**Uso**: Actualizaciones automáticas, notificaciones push, sincronización
**Prioridad**: BAJA - Para funcionalidades avanzadas

### **6. Metrics and Monitoring**

```
GET /metrics
```

**Descripción**: Métricas Prometheus-compatibles para monitoreo
**Uso**: Health monitoring, performance tracking, observabilidad
**Prioridad**: BAJA - Para DevOps y monitoreo

## 🏗️ **Arquitectura y Integración**

### **Frontend Components que Necesitan estos Endpoints:**

1. **PropertyTimeline** - Necesita `/properties/{id}/traces`
2. **MediaGallery** - Necesita PATCH `/properties/{id}/media`
3. **AdvancedSearch** - Necesita `/properties/search`
4. **Dashboard** - Necesita `/stats/properties`
5. **RealTimeUpdates** - Necesita webhooks

### **Data Models Necesarios:**

```typescript
// Property Trace/Transaction History
interface PropertyTrace {
  id: string
  propertyId: string
  action:
    | 'created'
    | 'updated'
    | 'sold'
    | 'rented'
    | 'price_changed'
    | 'status_changed'
  previousValue?: any
  newValue?: any
  timestamp: string
  userId?: string
  notes?: string
}

// Media Update Request
interface MediaPatchRequest {
  cover?: {
    url: string
    type: string
  }
  gallery?: Array<{
    id?: string
    url: string
    type: string
    index: number
    enabled: boolean
    featured: boolean
  }>
}

// Advanced Search Request
interface AdvancedSearchRequest {
  query: string
  filters: {
    city?: string
    propertyType?: string
    priceRange?: [number, number]
    amenities?: string[]
    availability?: {
      from: string
      to: string
    }
  }
  sort?: {
    field: string
    order: 'asc' | 'desc'
  }
  pagination: {
    page: number
    pageSize: number
  }
}

// Property Statistics Response
interface PropertyStats {
  total: number
  active: number
  sold: number
  rented: number
  averagePrice: number
  priceRange: {
    min: number
    max: number
  }
  byCity: Record<string, number>
  byType: Record<string, number>
  trends: {
    monthly: Array<{
      month: string
      count: number
      averagePrice: number
    }>
  }
}
```

## 🔐 **Autenticación y Autorización**

### **Endpoints que Requieren JWT:**

- `GET /properties/{id}/traces` - Solo propietarios de la propiedad
- `PATCH /properties/{id}/media` - Solo propietarios de la propiedad
- `GET /stats/properties` - Solo propietarios autenticados
- `POST /webhooks/property-updated` - Solo con firma HMAC válida

### **Endpoints Públicos:**

- `GET /properties/search` - Búsqueda pública
- `GET /metrics` - Métricas públicas para monitoreo

## 📊 **Rate Limiting y Performance**

### **Límites Recomendados:**

- **Traces**: 60 requests/minute por usuario
- **Media Updates**: 30 requests/minute por usuario
- **Search**: 120 requests/minute por IP
- **Stats**: 60 requests/minute por usuario
- **Webhooks**: 100 requests/minute por IP

### **Caching Strategy:**

- **Traces**: Cache por 5 minutos (datos históricos)
- **Stats**: Cache por 15 minutos (datos agregados)
- **Search**: Cache por 2 minutos (resultados de búsqueda)

## 🧪 **Testing y Validación**

### **Test Cases Necesarios:**

1. **Traces**: Verificar historial completo de cambios
2. **Media**: Verificar actualización de cover y galería
3. **Search**: Verificar búsqueda semántica y filtros
4. **Stats**: Verificar cálculos agregados correctos
5. **Webhooks**: Verificar firma HMAC y payload

### **Data de Prueba:**

- Propiedades con historial de cambios
- Media con diferentes tipos y formatos
- Búsquedas complejas para validar relevancia
- Estadísticas con datos variados

## 🚀 **Implementación Prioritaria**

### **Fase 1 (Crítica - Semana 1):**

- [ ] `/properties/{id}/traces` - Property Timeline
- [ ] `PATCH /properties/{id}/media` - Media Management

### **Fase 2 (Importante - Semana 2):**

- [ ] `/properties/search` - Advanced Search
- [ ] `/stats/properties` - Property Statistics

### **Fase 3 (Opcional - Semana 3):**

- [ ] Webhooks para real-time updates
- [ ] Métricas de monitoreo

## 📞 **Contacto y Coordinación**

### **Equipo Backend:**

- **Lead**: [Nombre del Lead Backend]
- **Email**: backend@million.com
- **Slack**: #backend-team

### **Equipo Frontend:**

- **Lead**: [Nombre del Lead Frontend]
- **Email**: frontend@million.com
- **Slack**: #frontend-team

### **Reunión de Coordinación:**

- **Fecha**: [Fecha a coordinar]
- **Objetivo**: Alinear implementación de endpoints faltantes
- **Agenda**: Prioridades, timeline, testing, deployment

---

## 📝 **Notas Adicionales**

### **Consideraciones Técnicas:**

1. **CORS**: Asegurar que todos los endpoints soporten CORS
2. **Error Handling**: Implementar RFC 7807 Problem Details
3. **Validation**: Validación robusta de inputs
4. **Documentation**: Swagger/OpenAPI para nuevos endpoints
5. **Monitoring**: Logs y métricas para nuevos endpoints

### **Dependencias Frontend:**

1. **React Query**: Para caching y state management
2. **WebSocket**: Para webhooks en tiempo real (futuro)
3. **Charts**: Para visualización de estadísticas
4. **Image Upload**: Para gestión de media

---

**Estado**: 📋 Pendiente de Revisión
**Prioridad**: 🔴 Alta
**Timeline**: 🗓️ 2-3 semanas
**Responsable**: Equipo Backend + Frontend
