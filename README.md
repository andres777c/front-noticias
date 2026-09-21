# Frontend - Sistema de Gestión de Noticias

Frontend de un sistema de gestión de noticias desarrollado con React, TypeScript y Tailwind CSS. Proporciona una interfaz moderna y responsiva para la visualización, búsqueda y administración de noticias con sistema de autenticación y control de acceso basado en roles.

## Descripción

Sistema de gestión de noticias con interfaz de usuario completa que incluye funcionalidades para usuarios finales y administradores. Implementa autenticación, autorización basada en roles y operaciones CRUD completas para noticias, categorías y usuarios.

### Características principales

- Interfaz moderna y responsiva con Tailwind CSS
- Sistema de autenticación con JWT
- Control de acceso basado en roles (Superadmin, Admin, Editor, User)
- CRUD completo de noticias y categorías
- Gestión de usuarios (solo para Superadmin)
- Búsqueda y filtrado de noticias
- Visualización detallada de noticias
- Interceptor inteligente de Formularios para persistir borradores ("Drafts") localmente
- Subida visual Drag & Drop para las pre-imágenes de Portada
- Notificaciones con Sonner
- Validación de formularios y Types con React Hook Form + Zod
- Gestión de estado del servidor y caché con React Query
- Rutas protegidas según roles de usuario y permisos dinámicos

## Instalación

### Requisitos previos

- Node.js (versión 18 o superior)
- pnpm (se activa con `corepack enable pnpm`)
- Backend API corriendo (ver repositorio backend-noticias)

### Pasos de instalación

1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd front-noticias
```

2. Instalar dependencias

```bash
pnpm install
```

3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_DEV=true
VITE_BACKEND_URL=http://localhost:3000/api
VITE_URL_HOST=https://api.produccion.com
```

4. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Uso

### Comandos disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Compila el proyecto para producción
- `pnpm preview` - Previsualiza la build de producción
- `pnpm lint` - Ejecuta el linter

### Estructura del proyecto

```
front-noticias/
├── src/
│   ├── app/                    # Configuración principal (router, providers)
│   ├── features/               # Funcionalidades por dominio
│   │   ├── auth/              # Autenticación y usuarios
│   │   ├── news/              # Noticias
│   │   ├── categories/        # Categorías
│   │   ├── panel/             # Panel de administración
│   │   └── newsletter/        # Suscripciones
│   ├── layouts/               # Layouts de la aplicación
│   ├── pages/                 # Páginas principales
│   └── shared/                # Componentes y utilidades compartidas
│       ├── components/       # Componentes UI
│       │   ├── layout/       # Navbar, Footer, etc.
│       │   └── ui/           # Componentes shadcn/ui
│       ├── hooks/            # Hooks personalizados
│       ├── lib/              # Utilidades (axios, utils)
│       └── styles/           # Estilos globales
├── public/                    # Archivos estáticos
└── components.json            # Configuración shadcn/ui
```

### Roles de usuario

El sistema implementa cuatro niveles de acceso:

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **Superadmin** | Administrador total | Gestionar usuarios, noticias, categorías |
| **Admin** | Administrador de contenido | Noticias, categorías |
| **Editor** | Creador de contenido | Crear y editar noticias |
| **User** | Usuario registrado | Solo lectura de noticias |

### Componentes principales

**Páginas públicas:**
- Home - Página principal con noticias destacadas
- News - Visualización detallada de noticias
- NewsCategory - Noticias filtradas por categoría
- SearchResults - Resultados de búsqueda
- Login/Register - Autenticación de usuarios
- Newsletter - Suscripción al newsletter

**Panel de administración (`/panel`):**
- DashboardPanel - Panel principal
- AddNew - Creación de noticias
- EditNew - Edición de noticias
- UpdateNew - Listado y filtro de noticias
- AddCategory - Crear categoría
- EditCategory - Editar categoría
- UpdateCategory - Gestión de categorías
- ManageUsers - Gestión de usuarios (Admin/Superadmin)

**Componentes compartidos:**
- Navbar - Navegación principal con búsqueda
- OffCanvasMenu - Menú móvil
- SideBarPanel - Sidebar del panel de admin
- SearchBar - Búsqueda de noticias
- NewsList - Lista de noticias (Mampostería y Hero Vertical)
- NewsFeatured - Noticias destacadas (Grid Periodística de 4 columnas)
- NewsDetail - Detalle de noticia
- NewsCard - Tarjeta de noticia (Estilo Diario Clásico sin bordes y tipografía Serif)
- FormNew - Controlador de React-Hook-Form + Dropzone (Persistencia de SessionStorage)
- Footer - Pie de página
- UserDropdown - Menú de usuario

## API Integration

### Servicios

El frontend consume la API REST del backend a través de servicios organizados por dominio:

**News Service (`src/features/news/api/news.services.ts`):**
- `getNews()` - Obtiene todas las noticias
- `getNewById(id)` - Obtiene una noticia por ID
- `getNewsByCategory(categoryId)` - Obtiene noticias por categoría
- `searchNews(query)` - Busca noticias
- `postNew(data)` - Crea una nueva noticia
- `updateNew({ id, payload })` - Actualiza una noticia
- `deleteNew(id)` - Elimina una noticia

**Category Service (`src/features/categories/api/category.services.ts`):**
- `getCategories()` - Obtiene todas las categorías
- `getCategoryById(id)` - Obtiene una categoría por ID
- `createCategory(data)` - Crea una categoría
- `updateCategory(id, data)` - Actualiza una categoría
- `deleteCategory(id)` - Elimina una categoría

**Newsletter Service (`src/features/newsletter/api/newsletter.services.ts`):**
- `subscribeNewsletter(data)` - Suscribe al newsletter
- `updatePreferences(data)` - Actualiza preferencias
- `unsubscribeNewsletter()` - Cancela suscripción

### Tipos principales

**INews:**
```typescript
interface INews {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  highlights: string[];
  author: { name?: string };
  category: { id?: string; name?: string };
  mainImage?: string;
  source?: string;
  variant: 'highlighted' | 'featured' | 'default';
  status: 'draft' | 'in_review' | 'approved' | 'published' | 'rejected';
  publicationDate?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
```

**ICategory:**
```typescript
interface ICategory {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
```

## Tecnologías utilizadas

### Core
- React ^19.2.0
- TypeScript ~5.9.3
- Vite ^7.2.4

### UI y Estilos
- Tailwind CSS ^3.4.19
- Radix UI (componentes accesibles)
- Lucide React (iconos)
- next-themes (temas claro/oscuro)
- class-variance-authority
- tailwind-merge

### Gestión de Estado y Datos
- @tanstack/react-query ^5.90.17
- axios ^1.13.2

### Formularios y Validación
- react-hook-form ^7.71.1
- zod ^4.3.5
- @hookform/resolvers ^5.2.2
- react-dropzone ^14.3.5 (Subidas arrastrar y soltar)
- react-quill-new (Editor de texto enriquecido WYSIWYG)
- dompurify (Sanitización anti-XSS)

### Utilidades
- react-router-dom ^7.12.0
- dayjs ^1.11.19
- sonner ^2.0.7 (notificaciones)

## Funcionalidades implementadas

### Autenticación y Autorización
- Sistema de login con JWT
- Registro de usuarios
- Context API para gestión de autenticación (`AuthContext`)
- Rutas protegidas por rol (`PanelProtectedRoute`)
- Hook personalizado para control de acceso (`useRoleAccess`)
- Sidebar dinámico según permisos del usuario

### Gestión de Noticias
- Diseño Editorial Clásico: Layouts en cuadrícula rígida (CSS Grid con separadores físicos), tipografía Serif y supresión de elementos flotantes genéricos simulando un diario de papel.
- Creación, edición y eliminación de noticias
- Editor de Texto Enriquecido integrado (WYSIWYG) para el cuerpo de noticias con configuración de documentos (Negritas, listas, cursivas).
- Motor inteligente "Draft": Guarda automáticamente el progreso de escritura (texto e imágenes) en `sessionStorage` para restaurarlo si cierras la ventana
- Drag & Drop visual para previsualizar Portadas (`react-dropzone`)
- Visualización de noticias por categoría
- Búsqueda de noticias
- Vista detallada de noticias
- Formateo de fechas
- Variantes de visualización (highlighted, featured, default) adaptadas matemáticamente a densidades de Lectura de Texto.

### Gestión de Categorías
- Categorías dinámicas desde la API
- Filtrado de noticias por categoría
- Navegación por categorías

### Gestión de Usuarios
- Creación de usuarios con roles específicos (Superadmin)
- Validación de formularios
- Interfaz de gestión de usuarios

### UI/UX
- Diseño responsivo
- Tema claro/oscuro
- Notificaciones toast
- Animaciones con Tailwind
- Componentes accesibles con Radix UI

## Deploy

### Deploy en Vercel

El proyecto está configurado para Vercel con `vercel.json` que maneja correctamente las rutas de React Router.

**Mediante CLI:**

```bash
npm i -g vercel
vercel login
vercel --prod
```

**Mediante GitHub:**

1. Conectar repositorio con Vercel
2. Configurar variables de entorno:
   - `VITE_DEV=false`
   - `VITE_URL_HOST=<URL_API_PRODUCCION>`

## Gestión del Proyecto

Este proyecto se gestiona mediante **GitHub Projects**, donde se organizan los sprints, tareas y el seguimiento del desarrollo. La metodología ágil permite una planificación iterativa y una mejor colaboración entre los miembros del equipo.

### Organización

- **Sprints**: Ciclos de desarrollo de 2 semanas
- **Tareas**: Organizadas en el tablero de GitHub Projects
- **Issues**: Seguimiento de bugs y nuevas funcionalidades
- **Pull Requests**: Revisión de código antes de merge

## Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## Integrantes

- **Marcos Condori** - Fullstack Developer - [GitHub](https://github.com/Marco21c) | [LinkedIn](https://www.linkedin.com/in/marcos-condori-23c/)
- **Ezequiel Pacheco** - Scrum Master & Fullstack Developer - [GitHub](https://github.com/EzePacheco) | [LinkedIn](https://www.linkedin.com/in/ezepacheco-dev/)
- **Andres Chaile** - Backend Developer - [GitHub](https://github.com/andres777c) | [LinkedIn](https://www.linkedin.com/in/andres-chaile-491a6127b/)
- **Leonardo Alcedo** - Backend Developer - [GitHub](https://github.com/leo99902) | [LinkedIn](https://www.linkedin.com/in/leonardo-alcedo-45a83027b/)
- **Yanina Paez** - Frontend Developer - [GitHub](https://github.com/Yani02-gif) | [LinkedIn](https://www.linkedin.com/in/yanina-paez-1100582bb)

---

Para reportar problemas o sugerencias, abrir un issue en el repositorio.
