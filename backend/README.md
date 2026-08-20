# ByteStore Backend

Backend de **ByteStore**, una aplicación fullstack de galería de videojuegos desarrollada con **Node.js**, **Express**, **MongoDB** y **Mongoose**.

Este servidor expone una API REST para gestionar usuarios, videojuegos, bibliotecas personales y reviews. También incluye autenticación mediante JWT, rutas protegidas y scripts de semillas que cargan datos iniciales desde archivos CSV generados a partir de Excel.

---

## Índice

- [Descripción del proyecto](#descripción-del-proyecto)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Arquitectura del backend](#arquitectura-del-backend)
- [Modelos de datos](#modelos-de-datos)
- [Relaciones entre colecciones](#relaciones-entre-colecciones)
- [Variables de entorno](#variables-de-entorno)
- [Instalación](#instalación)
- [Ejecución en desarrollo](#ejecución-en-desarrollo)
- [Seeds y carga inicial de datos](#seeds-y-carga-inicial-de-datos)
- [Rutas de la API](#rutas-de-la-api)
- [Autenticación y autorización](#autenticación-y-autorización)
- [Subida de avatar con Cloudinary](#subida-de-avatar-con-cloudinary)
- [Despliegue](#despliegue)
- [Estado del proyecto](#estado-del-proyecto)

---

## Descripción del proyecto

**ByteStore** es una plataforma de videojuegos donde los usuarios pueden registrarse, iniciar sesión, explorar un catálogo de juegos, consultar información detallada, guardar títulos en su biblioteca personal y publicar reviews.

El backend resuelve la parte de persistencia y lógica de negocio del proyecto:

- Gestión de usuarios.
- Registro e inicio de sesión.
- Autenticación mediante JWT.
- Catálogo de videojuegos.
- Filtros de búsqueda.
- Biblioteca personal de videojuegos por usuario.
- Reviews relacionadas con usuarios y videojuegos.
- Edición de perfil con avatar.
- Carga inicial de datos desde CSV usando `fs`.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv
- cors
- multer
- Cloudinary
- xlsx
- fs
- pnpm
- nodemon

---

## Arquitectura del backend

Estructura principal del backend:

```txt
backend/
├── index.js
├── package.json
├── .env.example
├── src/
│   ├── controllers/
│   │   ├── Games.controller.js
│   │   ├── Reviews.controller.js
│   │   ├── Users.controller.js
│   │   └── auth/
│   │       ├── Login.js
│   │       └── Register.js
│   │
│   ├── data/
│   │   ├── CSV/
│   │   │   ├── Games.csv
│   │   │   ├── Reviews.csv
│   │   │   └── Users.csv
│   │   └── Excel/
│   │       └── videojuegos.xlsx
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── uploads.js
│   │
│   ├── models/
│   │   ├── Games.js
│   │   ├── Reviews.js
│   │   └── Users.js
│   │
│   ├── routes/
│   │   ├── Games.route.js
│   │   ├── Reviews.route.js
│   │   └── Users.route.js
│   │
│   └── seeds/
│       ├── Games.seeds.js
│       ├── Reviews.seeds.js
│       ├── Users.seeds.js
│       └── videojuegos.seeds.js
```

---

## Modelos de datos

### Usuario

Modelo: `Users.js`

Campos principales:

```js
{
  id: Number,
  nombre: String,
  email: String,
  password: String,
  avatar: String,
  city: String,
  country: String,
  bio: String,
  library: [ObjectId]
}
```

La propiedad `library` almacena referencias a videojuegos guardados por el usuario.

---

### Game

Modelo: `Games.js`

Campos principales:

```js
{
  id: Number,
  title: String,
  genre: String,
  description: String,
  price: Number,
  image: String,
  releaseDate: Date,
  developer: String,
  publisher: String,
  rating: Number,
  platform: String,
  minspecs: {
    os: String,
    cpu: String,
    ram: Number,
    gpu: String,
    storage: Number
  },
  recSpecs: {
    os: String,
    cpu: String,
    ram: Number,
    gpu: String,
    storage: Number
  }
}
```

---

### Review

Modelo: `Reviews.js`

Campos principales:

```js
{
  id: Number,
  game: ObjectId,
  user: ObjectId,
  rating: Number,
  comment: String
}
```

Cada review queda vinculada a un videojuego y a un usuario.

---

## Relaciones entre colecciones

El proyecto incluye tres colecciones principales:

```txt
Usuarios
Videojuegos
Reviews
```

Relaciones implementadas:

```txt
Usuario.library  →  Game
Review.game      →  Game
Review.user      →  Usuario
```

Esto permite que:

- Un usuario pueda guardar varios videojuegos en su biblioteca.
- Un videojuego pueda tener varias reviews.
- Cada review pertenezca a un usuario concreto.

---

## Variables de entorno

Crea un archivo `.env` en la raíz de `backend`.

Ejemplo:

```env
Mongo_URI=mongodb+srv://USUARIO:CONTRASEÑA@CLUSTER.mongodb.net/NOMBRE_BBDD?retryWrites=true&w=majority
JWT_SECRET=clave_secreta_para_firmar_tokens
CLOUDINARY_CLOUD_NAME=nombre_cloudinary
CLOUDINARY_API_KEY=api_key_cloudinary
CLOUDINARY_API_SECRET=api_secret_cloudinary
```

> Nota: en el archivo `src/db/db.js` se utiliza `process.env.Mongo_URI`. Si se decide unificar la variable a `MONGO_URI`, hay que cambiar también esa referencia en el código.

---

## Instalación

Desde la carpeta `backend`:

```bash
pnpm install
```

Si pnpm bloquea los scripts de build de `bcrypt`, ejecuta:

```bash
pnpm approve-builds
```

Selecciona `bcrypt` y vuelve a instalar:

```bash
pnpm install
```

---

## Ejecución en desarrollo

Desde la carpeta `backend`:

```bash
pnpm dev
```

El servidor se ejecuta por defecto en:

```txt
http://localhost:3000
```

Ruta de prueba:

```txt
GET http://localhost:3000/
```

Respuesta esperada:

```txt
Hola mundo desde el backend
```

---

## Seeds y carga inicial de datos

El proyecto utiliza datos iniciales desde archivos CSV ubicados en:

```txt
src/data/CSV/
```

Archivos principales:

```txt
Games.csv
Users.csv
Reviews.csv
```

También se conserva el Excel base en:

```txt
src/data/Excel/videojuegos.xlsx
```

Los scripts de semillas se encuentran en:

```txt
src/seeds/
```

### Ejecutar seed de usuarios

```bash
node src/seeds/Users.seeds.js
```

### Ejecutar seed de videojuegos

```bash
node src/seeds/Games.seeds.js
```

### Ejecutar seed de reviews

```bash
node src/seeds/Reviews.seeds.js
```

Orden recomendado:

```bash
node src/seeds/Users.seeds.js
node src/seeds/Games.seeds.js
node src/seeds/Reviews.seeds.js
```

Este orden es importante porque las reviews dependen de usuarios y videojuegos ya existentes.

---

## Rutas de la API

### Usuarios y autenticación

Base URL:

```txt
/api/users
```

| Método | Ruta | Protección | Descripción |
|---|---|---|---|
| POST | `/registro` | Pública | Registrar usuario |
| POST | `/login` | Pública | Iniciar sesión |
| PUT | `/edit/:id` | JWT | Editar perfil de usuario |
| DELETE | `/delete/:id` | JWT | Eliminar usuario |
| GET | `/:id/library` | JWT | Obtener biblioteca del usuario |
| POST | `/:id/library/:gameId` | JWT | Añadir juego a biblioteca |
| DELETE | `/:id/library/:gameId` | JWT | Quitar juego de biblioteca |

---

### Videojuegos

Base URL:

```txt
/api/games
```

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Obtener todos los videojuegos |
| GET | `/filter` | Filtrar videojuegos |
| GET | `/:gameId` | Obtener videojuego por id numérico |

Parámetros admitidos en `/filter`:

```txt
title
genre
platform
minOs
minCpu
minGpu
minRam
minStorage
recOs
recCpu
recGpu
recRam
recStorage
```

Ejemplo:

```txt
GET /api/games/filter?title=zelda&platform=switch
```

---

### Reviews

Base URL:

```txt
/api/reviews
```

| Método | Ruta | Protección | Descripción |
|---|---|---|---|
| GET | `/:gameId` | Pública | Obtener reviews de un juego |
| POST | `/:gameId` | JWT | Crear review de un juego |
| DELETE | `/:reviewId` | JWT | Eliminar una review propia |

---

## Autenticación y autorización

El login genera un token JWT con expiración de 24 horas.

El token debe enviarse en rutas protegidas mediante el header:

```txt
Authorization: Bearer TOKEN
```

Ejemplo:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

El middleware encargado de validar el token es:

```txt
src/middlewares/auth.middleware.js
```

Rutas protegidas principales:

- Editar perfil.
- Eliminar usuario.
- Añadir juegos a biblioteca.
- Quitar juegos de biblioteca.
- Consultar biblioteca.
- Crear review.
- Eliminar review propia.

---

## Subida de avatar con Cloudinary

El backend incluye integración con:

- `multer`
- `cloudinary`
- `FormData` desde frontend

La subida de avatar se gestiona desde:

```txt
src/middlewares/uploads.js
```

La ruta que recibe la imagen es:

```txt
PUT /api/users/edit/:id
```

El archivo debe enviarse en el campo:

```txt
avatar
```

Para que funcione, deben configurarse estas variables:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Despliegue

El despliegue está pendiente hasta que el proyecto esté cerrado.

Recomendación:

- Backend: Render, Railway o Heroku.
- Base de datos: MongoDB Atlas.
- Frontend: Vercel o Netlify.

Cuando el backend esté desplegado, el frontend debe actualizar su variable:

```env
VITE_API_URL=https://URL_DEL_BACKEND/api
```

---

## Estado del proyecto

Actualmente el backend incluye:

- API REST funcional.
- Conexión a MongoDB.
- Modelos de Mongoose.
- Autenticación JWT.
- Rutas públicas y protegidas.
- Seeds desde CSV.
- Relaciones entre usuarios, juegos y reviews.
- Gestión de biblioteca personal.
- Edición de perfil con soporte para avatar en Cloudinary.

Pendiente antes de entrega final:

- Confirmar despliegue del backend.
- Confirmar variables de entorno definitivas.
- Probar subida de avatar en producción.
