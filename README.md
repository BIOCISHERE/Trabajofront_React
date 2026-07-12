# Trabajofront-React

Proyecto de frontend construido con React y Vite.

## Contenido del repositorio

- `frontend/`: aplicación React con Vite.
- `backend/`: carpeta reservada para la lógica del servidor; actualmente no contiene archivos.

## Requisitos

- Node.js 18 o superior
- pnpm instalado globalmente (recomendado)
- Navegador moderno compatible con ES Modules

> Si no usas `pnpm`, puedes usar `npm` o `yarn`, pero los ejemplos siguientes usan `pnpm`.

## Instalación en macOS

1. Instala Node.js desde https://nodejs.org o usando Homebrew:

```bash
brew install node
```

2. Instala `pnpm` globalmente:

```bash
npm install -g pnpm
```

## Instalación en Windows

1. Instala Node.js desde https://nodejs.org y sigue el instalador.
2. Abre PowerShell o el símbolo del sistema como administrador.
3. Instala `pnpm` globalmente:

```powershell
npm install -g pnpm
```

## Instalar dependencias

1. Abre un terminal en la raíz del proyecto:

```bash
cd /Applications/MAMP/htdocs/Trabajofront-React
```

2. Instala las dependencias del frontend:

```bash
cd frontend
pnpm install
```

## Ejecutar la aplicación en desarrollo

Desde `frontend/`, inicia el servidor de desarrollo de Vite:

```bash
pnpm dev
```

Luego abre la URL que muestra Vite en el terminal, típicamente:

```bash
http://localhost:5173
```

## Construir para producción

Desde `frontend/`, crea la versión optimizada:

```bash
pnpm build
```

El resultado se genera en `frontend/dist`.

## Previsualizar el build de producción

Después de `pnpm build`, puedes ejecutar:

```bash
pnpm preview
```

## Estructura del frontend

- `frontend/src/`: código fuente React
- `frontend/public/`: recursos estáticos
- `frontend/index.html`: página de entrada
- `frontend/src/index.css`: estilos globales
- `frontend/src/App.jsx`: componente principal

## Notas adicionales

- `frontend/.gitignore` ya excluye correctamente `node_modules`, `dist` y archivos temporales.
- Si agregas un backend, coloca sus instrucciones en este README y crea un `backend/package.json` con su instalación y ejecución.
