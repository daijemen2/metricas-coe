# 📊 CoE Metrics Dashboard

Plataforma de visualización de métricas de calidad y ejecución de pruebas para equipos y Centros de Excelencia (CoE).

Este proyecto simula una arquitectura **cloud-ready** basada en AWS, enfocándose en **comportamiento y diseño**, no en dependencias tecnológicas reales.

---

## 🎯 Objetivo del Proyecto

- Centralizar métricas de calidad y ejecución de pruebas
- Permitir análisis por:
  - Tribu
  - CoE
  - Equipo
  - Rango de fechas
- Simular un backend escalable y migrable a AWS (DynamoDB + Lambda)

---

## 🧱 Arquitectura (Simulación AWS)


### Equivalencia AWS

| Capa del proyecto | Equivalente AWS |
|------------------|----------------|
| Controller | API Gateway |
| Service | Lambda |
| Repository | DynamoDB SDK |
| data/*.js | Tabla DynamoDB |

---

## 🔧 Backend

### Endpoints principales

#### Calidad de testing
- `GET /api/metrics`
- `GET /api/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `GET /api/metrics/:equipo`

#### Ejecución de pruebas (performances)
- `GET /api/ejecucion`
- `GET /api/ejecucion?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `GET /api/ejecucion/:equipo`

### Diseño del backend

- **Controllers**: manejo HTTP y validaciones
- **Services**: lógica de negocio y normalización
- **Repositories**: acceso a datos simulando DynamoDB
- **Data**: mock de datos con timestamps (fecha)

La migración a AWS solo requeriría cambiar la capa `repository`.

---

## 🎨 Frontend (Angular)

### Características UX/UI

- Dashboard limpio y moderno (TailwindCSS)
- Filtros desacoplados y reutilizables:
  - Tribu
  - CoE
  - Búsqueda por equipo
  - Filtro de fechas con presets y fecha específica
- **Regla UX clave**:
  > No se muestran datos hasta que el usuario interactúa con los filtros

### Filtro de fechas (UX optimizado)

- Presets rápidos:
  - Hoy
  - Últimos 7 / 14 / 30 días
  - Este mes
  - Mes anterior
  - Histórico
- Fecha puntual opcional
- Chip visible solo cuando hay filtro activo
- Opción clara para limpiar filtro

---

## 🚀 Cómo ejecutar

### Backend
```bash
npm install
node server.js


La arquitectura está diseñada para **simular AWS por comportamiento**, manteniendo una separación clara de responsabilidades.


Separación por capas
✔ Repository = Dynamo
✔ Helper = Lambda
✔ Query params from / to listos
✔ Migración futura a AWS directa

dinamo vs local

dynamo:
DynamoDB         → Repository
Lambda           → Service
API Gateway      → Controller (Express)

local:
/data           → simulación Dynamo (JSON / arrays)
/repositories   → acceso a datos (Scan / Query / GetItem)
/services       → reglas de negocio (Lambda)
/controllers    → HTTP / Express



que se logró?
✔ Backend desacoplado
✔ Simulación real de AWS
✔ Fácil migración a Lambdas
✔ Controllers = API Gateway
✔ Services = Lambdas
✔ Repositories = DynamoDB
✔ Frontend no se rompe



---

# 🎤 Speech final (para kata / entrevista)

Guárdate este texto 👇

> “El backend no usa AWS directamente, pero está diseñado para simular su comportamiento.  
> Los controllers representan API Gateway, los services la lógica de una Lambda y los repositories el acceso a DynamoDB.  
> La data está mockeada, pero el diseño permite migrar a AWS sin tocar el frontend ni la lógica de negocio.  
> En el frontend prioricé UX: no se muestran datos hasta que el usuario interactúa, y el filtro de fechas está pensado para cubrir el 80% de los casos con presets rápidos.”

Esto **suena senior**, claro y seguro.

---

## 🟢 Conclusión

🔹 Código limpio  
🔹 Arquitectura correcta  
🔹 UX pensada  
🔹 Explicable en 2 minutos  
🔹 Migrable a AWS  

Ç_______¨
