# ByteStore Frontend

Frontend de **ByteStore**, una aplicación fullstack de galería de videojuegos desarrollada con **React**, **Vite** y **React Router DOM**.

La aplicación permite explorar videojuegos, filtrar el catálogo, consultar detalles, iniciar sesión, gestionar una biblioteca personal, editar el perfil del usuario y publicar reviews conectadas al backend.

---

## Índice

- [Descripción del proyecto](#descripción-del-proyecto)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Arquitectura del frontend](#arquitectura-del-frontend)
- [Variables de entorno](#variables-de-entorno)
- [Instalación](#instalación)
- [Ejecución en desarrollo](#ejecución-en-desarrollo)
- [Rutas principales](#rutas-principales)
- [Funcionalidades](#funcionalidades)
- [Autenticación en frontend](#autenticación-en-frontend)
- [Servicios de API](#servicios-de-api)
- [Hooks utilizados](#hooks-utilizados)
- [Componentes reutilizables](#componentes-reutilizables)
- [Estilos y UX/UI](#estilos-y-uxui)
- [Gestión de imágenes locales](#gestión-de-imágenes-locales)
- [Despliegue](#despliegue)
- [Estado del proyecto](#estado-del-proyecto)

---

## Descripción del proyecto

**ByteStore** es una galería de videojuegos con biblioteca personal y sistema de reviews.

Desde el frontend, el usuario puede:

- Explorar el catálogo de videojuegos.
- Filtrar y buscar juegos.
- Ordenar resultados.
- Ver detalles completos de un juego.
- Registrarse e iniciar sesión.
- Guardar juegos en su biblioteca personal.
- Consultar y modificar su perfil.
- Subir avatar desde el perfil.
- Publicar reviews en juegos.
- Contactar con los creadores del proyecto.

El frontend consume una API REST creada en Node.js y conectada a MongoDB.

---

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router DOM
- Axios
- CSS modular por componentes
- CSS variables
- LocalStorage
- FormData
- pnpm
- Oxlint

---

## Arquitectura del frontend

Estructura principal:

```txt
frontend/
├── index.html
├── package.json
├── .env.example
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   │
│   ├── assets/
│   │   ├── bytestore-logo.png
│   │   ├── hero.png
│   │   ├── mario.png
│   │   ├── ayoub.png
│   │   └── iconos de contacto
│   │
│   ├── components/
│   │   ├── EmptyState/
│   │   ├── Footer/
│   │   ├── GameCard/
│   │   ├── Header/
│   │   ├── Layout/
│   │   ├── Loader/
│   │   ├── ProtectedRoute/
│   │   └── ReviewList/
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   └── useGames.js
│   │
│   ├── pages/
│   │   ├── Creators.jsx
│   │   ├── GameDetail.jsx
│   │   ├── Games.jsx
│   │   ├── Home.jsx
│   │   ├── Library.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── games.services.jsx
│   │   ├── reviews.services.jsx
│   │   └── users.services.jsx
│   │
│   └── styles/
│       ├── global.css
│       ├── register.css
│       └── variables.css
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz de `frontend`.

Ejemplo:

```env
VITE_API_URL=http://localhost:3000/api
```

En producción deberá cambiarse por la URL real del backend desplegado:

```env
VITE_API_URL=https://URL_DEL_BACKEND/api
```

---

## Instalación

Desde la carpeta `frontend`:

```bash
pnpm install
```

---

## Ejecución en desarrollo

Desde la carpeta `frontend`:

```bash
pnpm dev
```

La aplicación se ejecuta normalmente en:

```txt
http://localhost:5173
```

Para que funcione correctamente, el backend debe estar activo en:

```txt
http://localhost:3000
```

O en la URL indicada en `VITE_API_URL`.

---

## Rutas principales

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Pública | Página de inicio |
| `/games` | Pública | Catálogo de videojuegos |
| `/games/:gameId` | Pública | Detalle de videojuego |
| `/login` | Pública | Inicio de sesión |
| `/register` | Pública | Registro de usuario |
| `/creators` | Pública | Contacto y creadores del proyecto |
| `/library` | Protegida | Biblioteca personal del usuario |
| `/profile` | Protegida | Perfil del usuario |
| `*` | Pública | Página 404 |

---

## Funcionalidades

### Home

La página de inicio presenta:

- Hero principal de ByteStore.
- Acceso rápido al catálogo.
- Acceso a registro o biblioteca según estado de sesión.
- Juegos destacados según valoración.
- Bloques informativos sobre catálogo, biblioteca y reviews.

---

### Catálogo de videojuegos

Página `/games`.

Funcionalidades:

- Carga de juegos desde backend.
- Buscador por título o desarrollador.
- Filtro por género.
- Filtro por plataforma.
- Filtro por precio.
- Ordenación por valoración, precio o título.
- Cards reutilizables.
- Botón para añadir juegos a biblioteca.
- Mensajes de estado y errores.

---

### Detalle de videojuego

Página `/games/:gameId`.

Muestra:

- Imagen del juego.
- Título.
- Descripción.
- Género.
- Plataforma.
- Precio.
- Rating.
- Desarrollador.
- Publisher.
- Fecha de lanzamiento.
- Requisitos mínimos.
- Requisitos recomendados.
- Reviews del juego.
- Formulario para crear review si el usuario está logueado.

---

### Biblioteca

Página `/library`.

Ruta protegida. Solo pueden acceder usuarios logueados.

Funcionalidades:

- Obtener biblioteca del usuario.
- Mostrar juegos guardados.
- Eliminar juegos de biblioteca.
- Empty state si no hay juegos.

---

### Perfil

Página `/profile`.

Ruta protegida. Permite:

- Ver avatar, nombre y email.
- Editar nombre.
- Editar ciudad.
- Editar país.
- Editar biografía.
- Subir nuevo avatar mediante `FormData`.
- Acceder a biblioteca.
- Cerrar sesión.

---

### Contactar

Página `/creators`.

Incluye:

- Información de los creadores.
- Foto de Mario Hernández Moreno.
- Foto de Ayoub Arramdani.
- Descripción de rol en el proyecto.
- Enlaces a email, GitHub y LinkedIn.
- Apartado de contacto directo.

---

## Autenticación en frontend

La autenticación se gestiona mediante:

```txt
src/context/AuthContext.jsx
```

El contexto guarda:

- `user`
- `token`
- `isAuthenticated`
- `userId`
- `login()`
- `logout()`
- `updateStoredUser()`

El token y el usuario se guardan en `localStorage`:

```txt
token
user
```

Las rutas protegidas usan:

```txt
src/components/ProtectedRoute/ProtectedRoute.jsx
```

Si el usuario no está autenticado, se redirige al login.

---

## Servicios de API

Los servicios se encuentran en:

```txt
src/services/
```

### api.js

Centraliza la instancia de Axios:

```js
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});
```

### games.services.jsx

Incluye:

- `getAllGames()`
- `getGameById(gameId)`
- `filterGames(params)`

### users.services.jsx

Incluye:

- `registerUser(userData)`
- `loginUser(userData)`
- `editUser(id, userData, token)`
- `deleteUser(id, token)`
- `addGameToLibrary(id, gameId, token)`
- `removeGameFromLibrary(id, gameId, token)`
- `getLibrary(id, token)`

### reviews.services.jsx

Incluye:

- `getReviewsByGame(gameId)`
- `createReview(gameId, reviewData, token)`
- `deleteReview(reviewId, token)`

---

## Hooks utilizados

### useGames

Archivo:

```txt
src/hooks/useGames.js
```

Se encarga de cargar el catálogo completo desde el backend y gestionar:

- `games`
- `loading`
- `error`

---

### useDebounce

Archivo:

```txt
src/hooks/useDebounce.js
```

Evita filtrar en cada pulsación inmediata del usuario y mejora la experiencia en el buscador del catálogo.

---

### Hooks nativos de React

El proyecto utiliza hooks avanzados y necesarios para la funcionalidad:

- `useState`
- `useEffect`
- `useMemo`
- `useCallback`
- `useContext`
- Custom hooks

---

## Componentes reutilizables

### Header

Navegación principal. Cambia según el estado de autenticación:

- Usuario no logueado: muestra `Entrar` y `Crear cuenta`.
- Usuario logueado: muestra avatar, nombre y botón `Salir`.

---

### Footer

Pie de página con enlaces rápidos a secciones principales.

---

### Layout

Estructura general que envuelve la app con header, contenido principal y footer.

---

### GameCard

Card reutilizable para mostrar videojuegos tanto en catálogo como en biblioteca o destacados.

---

### Loader

Componente para estados de carga.

---

### EmptyState

Componente para estados vacíos o errores controlados.

---

### ReviewList

Listado de reviews de un videojuego.

---

### ProtectedRoute

Controla el acceso a rutas privadas.

---

## Estilos y UX/UI

El proyecto usa CSS organizado por componentes y páginas.

Variables globales:

```txt
src/styles/variables.css
```

Incluye variables para:

- Colores.
- Gradientes.
- Espaciados.
- Radios de borde.
- Sombras.
- Tipografía.
- Tamaños máximos.

La interfaz sigue una estética gamer moderna:

- Fondo oscuro.
- Gradientes azul/morado.
- Cards con efecto glass.
- Botones destacados.
- Navegación clara.
- Diseño responsive.
- Estados de carga y estados vacíos.

---

## Gestión de imágenes locales

Algunas imágenes externas de videojuegos pueden fallar por bloqueo de hotlinking.

Para evitarlo, algunas imágenes problemáticas se pueden colocar en:

```txt
frontend/public/games/
```

Ejemplo:

```txt
frontend/public/games/league-of-legends.jpg
frontend/public/games/minecraft.jpg
frontend/public/games/fortnite.jpg
```

Y se pueden consumir desde React usando rutas como:

```txt
/games/league-of-legends.jpg
```

---

## Despliegue

El despliegue está pendiente hasta el cierre del proyecto.

Recomendación:

- Frontend: Vercel o Netlify.
- Backend: Render, Railway o Heroku.
- Base de datos: MongoDB Atlas.

Cuando el backend esté desplegado, actualizar:

```env
VITE_API_URL=https://URL_DEL_BACKEND/api
```

Después ejecutar:

```bash
pnpm build
```

Y comprobar el resultado con:

```bash
pnpm preview
```

---

## Estado del proyecto

Actualmente el frontend incluye:

- Rutas públicas y protegidas.
- Login y registro funcionales.
- Persistencia de sesión en localStorage.
- Catálogo con búsqueda, filtros y ordenación.
- Detalle de videojuegos.
- Biblioteca personal.
- Perfil editable con subida de avatar.
- Reviews conectadas al backend.
- Página de contacto/creadores.
- Componentes reutilizables.
- Hooks personalizados.
- Diseño responsive y moderno.

Pendiente antes de entrega final:

- Confirmar URL definitiva del backend desplegado.
- Ejecutar build de producción.
- Revisar responsive final en móvil/tablet.
- Comprobar subida de avatar en producción.
