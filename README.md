# Trabajofront-React

Proyecto web con frontend en React/Vite y backend en PHP.

## Contenido del repositorio

- `frontend/`: aplicación React con Vite.
- `backend/`: lógica PHP, base de datos y correo de recuperación.

## Requisitos comunes

- Navegador moderno compatible con ES Modules
- Node.js 18 o superior
- `pnpm` para el frontend
- PHP 8 o superior
- Composer para dependencias PHP
- Servidor local tipo MAMP/WAMP/XAMPP para el backend

## Instalación en macOS

1. Instala Homebrew si no lo tienes:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Instala Node.js y Composer:

```bash
brew install node composer
```

3. Instala `pnpm` globalmente:

```bash
npm install -g pnpm
```

4. Instala un servidor local si necesitas PHP + MySQL (por ejemplo MAMP):

- Descarga e instala [MAMP](https://www.mamp.info/)
- Asegúrate de que Apache y MySQL estén activos

## Instalación en Windows

1. Instala Node.js desde https://nodejs.org y sigue el instalador.
2. Instala Composer desde https://getcomposer.org/download/.
3. Abre PowerShell o el símbolo del sistema como administrador y ejecuta:

```powershell
npm install -g pnpm
```

4. Instala un servidor local para PHP/MySQL:

- Usa [XAMPP](https://www.apachefriends.org/es/index.html) o [WAMP](http://www.wampserver.com/)
- Activa Apache y MySQL

## Configuración de backend

1. Copia los archivos PHP a tu servidor local o usa la carpeta `backend/` desde tu servidor.
2. Crea la base de datos MySQL llamada `pnks`.
3. Ajusta las credenciales en `backend/db.php` si tu servidor local usa otro usuario o contraseña.

```php
$host = "localhost";
$user = "root";
$pass = "root";
$dbname = "pnks";
```

4. Instala dependencias PHP desde la raíz del proyecto:

```bash
cd backend
composer install
```

## Instalar dependencias del frontend

Desde la raíz del proyecto:

```bash
cd frontend
pnpm install
```

## Ejecutar el frontend en desarrollo

Desde `frontend/`:

```bash
pnpm dev
```

Abre la URL que muestre Vite, normalmente:

```bash
http://localhost:5173
```

## Ejecutar el backend en desarrollo

- Si usas MAMP, XAMPP o WAMP, coloca `backend/` dentro de la carpeta de proyectos del servidor local.
- Accede desde el navegador a la ruta local como `http://localhost/backend/` o al alias que tengas configurado.

> Si deseas, también puedes usar el servidor PHP integrado para pruebas rápidas:

```bash
cd backend
php -S localhost:8000
```

## Construir el frontend para producción

Desde `frontend/`:

```bash
pnpm build
```

El build se genera en `frontend/dist`.

## Previsualizar el build de producción

```bash
pnpm preview
```

## Estructura del proyecto

- `frontend/src/`: código fuente React
- `frontend/public/`: recursos estáticos
- `frontend/index.html`: entrada del frontend
- `frontend/src/index.css`: estilos globales
- `frontend/src/App.jsx`: componente principal
- `backend/db.php`: conexión a la base de datos
- `backend/cambiarclave.php`: cambio de contraseña
- `backend/recuperar.php`: envío de código de recuperación por correo
- `backend/composer.json`: dependencias PHP

## Notas importantes para Windows

- Asegúrate de ejecutar `composer install` en `backend/`.
- Si usas XAMPP, el directorio de proyecto debe estar dentro de `htdocs`.
- Si usas WAMP, el directorio debe estar dentro de `www`.
- Revisa `backend/db.php` si no usas las credenciales por defecto.

## Notas adicionales

- `frontend/.gitignore` ya excluye `node_modules`, `dist` y archivos temporales.
- No incluyas `backend/vendor/` en el repositorio si no es necesario; usa `composer install` para regenerarlo.
- Si necesitas cambiar la URL del servidor o la base de datos, actualiza `backend/db.php`.
