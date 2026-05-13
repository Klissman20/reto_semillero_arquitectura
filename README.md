# Reto Semillero Arquitectura — Buscador de Convenios Bancarios

Aplicación React que replica el diseño de un buscador de convenios de pago bancarios, estilo fintech LATAM. El repositorio contiene **dos versiones paralelas** del mismo frontend:

| Versión | Carpeta | React | Puerto dev |
|---|---|---|---|
| Stable | `convenios-stable/` | 19.2.6 (latest stable) | 5173 |
| Canary | `convenios-canary/` | 19.3.0-canary (pre-release) | 5174 |

---

## Captura del diseño objetivo


---

## Funcionalidades implementadas

- **Búsqueda en dos fases**: el usuario escribe libremente en el input y la búsqueda se aplica únicamente al presionar el botón *Buscar* o la tecla Enter (evita re-renders mientras se escribe).
- **Filtro por Departamento**: dropdown con label flotante, listo para conectar a datos reales.
- **Grid de tarjetas** (4 columnas, responsive 2 → 3 → 4): cada tarjeta muestra el logo/color del banco y el nombre del convenio.
- **Hover interactivo**: al pasar el cursor sobre una tarjeta aparecen los botones *Pagar* e *Inscribir* con overlay sobre el logo.
- **Selector "Mostrar N"**: cambia el tamaño de página (5, 10, 25, 50) y reinicia a la primera página.
- **Contador de resultados**: muestra `N de M resultados` en tiempo real tras la búsqueda.
- **Paginación con ellipsis**: siempre muestra la primera, la última página y las vecinas de la página activa.
- **38 convenios mock** (solo en `convenios-stable/`): datos locales en `src/data/convenios.js`.
- **Canary con API** (`convenios-canary/`): listado solo desde `GET /convenios` (`VITE_CONVENIOS_API_URL` en `.env`).
- **Badge Canary** (solo en `convenios-canary/`): chip fijo en la esquina superior derecha con punto animado y número de versión.

---

## Stack tecnológico

| Herramienta | Versión |
|---|---|
| React | 19.2.6 / 19.3.0-canary |
| Vite | ^8.0.12 |
| Tailwind CSS | ^4.3.0 (plugin `@tailwindcss/vite`) |
| ESLint | ^10.3.0 |
| Node.js | >= 20 |

> **Tailwind v4**: no requiere `tailwind.config.js`. La configuración completa es `@import "tailwindcss"` en `src/index.css`.

---

## Estructura del proyecto

```
reto_semillero_arquitectura/
├── README.md
├── convenios-stable/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                  # Orquesta estado global
│       ├── index.css                # @import "tailwindcss"
│       ├── data/
│       │   └── convenios.js         # 38 registros mock
│       └── components/
│           ├── SearchBar.jsx        # Input + dropdown + botón Buscar
│           ├── BankLogo.jsx         # Placeholder colorido con iniciales
│           ├── ConvenioCard.jsx     # Tarjeta con estado hover
│           ├── ConvenioGrid.jsx     # Grid 4 columnas responsive
│           ├── ResultsHeader.jsx    # Selector "Mostrar N" + contador
│           └── Pagination.jsx       # Paginación con ellipsis
└── convenios-canary/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── eslint.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx                  # Carga API + badge Canary
        ├── index.css
        ├── api/
        │   └── fetchConvenios.js
        ├── lib/
        │   └── mapLambdaConvenio.js
        ├── data/
        │   └── departamentos.js     # Opciones del dropdown (solo UI)
        └── components/
            ├── SearchBar.jsx
            ├── BankLogo.jsx
            ├── ConvenioCard.jsx
            ├── ConvenioGrid.jsx
            ├── ResultsHeader.jsx
            └── Pagination.jsx
```

---

## Inicio rápido

### Requisitos previos

- Node.js >= 20
- npm >= 10

### Versión Stable

```bash
cd convenios-stable
npm install
npm run dev
# Servidor disponible en → http://localhost:5173
```

### Versión Canary

```bash
cd convenios-canary
npm install
npm run dev
# Servidor disponible en → http://localhost:5174
```

Ambos servidores pueden correr en paralelo sin conflictos de puerto.

---

## Scripts disponibles

Aplican igual en ambas carpetas:

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Previsualiza el build de producción localmente |
| `npm run lint` | Analiza el código con ESLint |

---

## Diferencias entre versiones

| Característica | `convenios-stable` | `convenios-canary` |
|---|---|---|
| Versión de React | `19.2.6` (latest stable) | `19.3.0-canary-d5736f09-20260507` |
| Badge visual | No | Sí — chip "Canary v19.3.0" en esquina |
| Código de componentes | Idéntico | Idéntico |
| Propósito | Producción / referencia | Prueba de nuevas APIs de React |

La versión canary permite probar funcionalidades en desarrollo del equipo de React antes de que sean parte de una release oficial. Cualquier diferencia de comportamiento entre versiones indica una regresión o cambio en la API canary.

---

## Decisiones de diseño

- **Búsqueda en dos fases** (`inputQuery` vs `activeQuery`): separa el estado del input del estado de búsqueda activa para no filtrar mientras el usuario escribe, mejorando la UX y reduciendo renders innecesarios.
- **`useMemo` en el filtro**: el array filtrado solo se recalcula cuando cambia `activeQuery`, no en cada render.
- **Hover con `useState` local**: cada `ConvenioCard` gestiona su propio estado de hover de forma independiente, sin necesidad de estado global.
- **Placeholders de logos con color**: dado que no existen assets reales de los bancos, se usan divs con color de fondo distintivo por banco y las iniciales como texto, manteniendo la identidad visual del mockup.
- **Tailwind v4 sin config file**: la integración vía plugin de Vite elimina la necesidad de configuración adicional para proyectos nuevos.

---

## Cómo extender

### Conectar datos reales

Reemplaza el array en `src/data/convenios.js` con una llamada a tu API:

```js
// src/data/convenios.js
export async function fetchConvenios() {
  const res = await fetch('/api/convenios');
  return res.json();
}
```

Y actualiza `App.jsx` para usar `useEffect` con la función async.

### Activar el filtro por Departamento

El estado `departamento` ya existe en `App.jsx`. Agrega la lógica de filtrado en el `useMemo`:

```js
const filtered = useMemo(() => {
  return CONVENIOS.filter((c) => {
    const matchQuery = !activeQuery || c.nombre.toLowerCase().includes(activeQuery.toLowerCase());
    const matchDept  = !departamento || c.departamento === departamento;
    return matchQuery && matchDept;
  });
}, [activeQuery, departamento]);
```

### Reemplazar logos placeholder

Sustituye el componente `BankLogo` por una etiqueta `<img>` con la URL del logo real:

```jsx
// components/BankLogo.jsx
export default function BankLogo({ banco, logoUrl }) {
  return <img src={logoUrl} alt={banco} className="h-16 object-contain" />;
}
```
