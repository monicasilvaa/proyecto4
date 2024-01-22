# Sistema de Gestión de Citas para Estudio de Tatuajes - Backend

## Diagrama DB
![App Screenshot](images/ER%20DiagramaEstudioTatuajes.png)

## Descripción del Proyecto

Este proyecto se centra en el desarrollo del backend para un sistema de gestión de citas destinado a un estudio de tatuajes. El objetivo principal es proporcionar a los clientes la capacidad de registrarse, realizar el inicio de sesión, acceder a su área personal, gestionar citas y ver información sobre tatuadores. Además, se incluyen funcionalidades extra para roles de superadmin y validaciones adicionales.

### Funcionalidades Principales

1. **Usuarios**
   - Registro de usuarios.
   - Inicio de sesión de usuarios.
   - Perfil de usuario.
   - Modificación de datos del perfil.

2. **Citas**
   - Creación de citas.
   - Edición de citas.
   - Eliminación de citas.
   - Visualización de todas las citas como cliente (solo las propias).
   - Visualización de todas las citas existentes con el tatuador (role tatuador).

3. **Tatuadores**
   - Listar tatuadores.
   - Listar tatuadores por centro (Extra).

### Funcionalidades Adicionales (Extra)

1. **Administración de Usuarios (Superadmin)**
   - Visualización de todos los clientes registrados.
   - Creación de tatuadores.
   - Eliminación de usuarios del sistema.

2. **Detalles de Citas (Extra)**
   - Visualización detallada de una cita.

3. **Administración de Roles (Superadmin)**
   - Asignación de roles a los usuarios del sistema.

4. **Validaciones Adicionales (Extra)**
   - Validación de la fecha de la cita.
   - Añadir tipos de intervención (tattoo / piercing) a las citas.

## Tecnologías Utilizadas

- TypeOrm.
- ES6, TypeScript.
- Uso de promesas y funcionalidad async/await.

## Estructura del Repositorio

- Se utiliza github para organizar el desarrollo con ramas específicas.
- Commits regulares y descriptivos para reflejar la evolución del proyecto.

## Instrucciones para Instalación Local

1. Clona este repositorio: `git clone https://github.com/monicasilvaa/proyecto4/tree/development`
2. Instala las dependencias: `npm install`
3. Configura la base de datos (TypeOrm).
4. Para ejecutar las migraciones: `db:migration`
5. para ejecutar los seeders: `db:seeder`
6. Para borrar las tablas, ejecutar migraciones y seeders: `db:refresh`
7. Para la ejecución de la aplicación en desarrollo: `npm run dev`
8. Ejecuta la aplicación: `npm start`

## Endpoints

- **Registro de Usuarios**: `POST /auth/register`
- **Inicio de Sesión**: `POST /auth/login`
- **Perfil de Usuario**: `GET /api/users/`
- **Modificación de Datos del Perfil**: `PATCH /api/user//profile/:id`
- **Creación de Citas**: `POST /api/appointments/`
- **Edición de Citas**: `PATCH /api/appointments/:id`
- **Eliminación de Citas**: `DELETE /api/appointments/:id`
- **Visualización de Citas como Cliente**: `GET /api/appointments/:id`
- **Visualización de Citas con Tatuador**: `GET /api/appointments/:id`
- **Listar Tatuadores**: `GET /api/users//tattooArtists`
- **Listar Tatuadores por Centro (Extra)**: `GET /api/users/tattooArtists/:centerId`

## Objetivo

Este proyecto tiene como objetivo proporcionar un backend sólido y eficiente para el sistema de gestión de citas, cumpliendo con los requisitos del cliente y permitiendo futuras expansiones.

## Sobre el Proyecto

Este es el cuarto proyecto a realizar para el Bootcamp Geekshubs, destinado a desarrollar las habilidades en el manejo de tecnologías backend, bases de datos y buenas prácticas de desarrollo.

![App Screenshot](images/ER%20DiagramaEstudioTatuajes.png)