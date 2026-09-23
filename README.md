# SFR Panamá — Sitio web

Sitio web corporativo de System FR Panamá, construido con Next.js, TypeScript y Tailwind CSS.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el sitio.

## Estructura

- `src/app` — layout raíz, metadata SEO y página principal.
- `src/components` — secciones del sitio (Header, Hero, Servicios, Soluciones IA, Nosotros, CTA, Footer).
- `src/lib/site.ts` — datos de contacto y enlaces reutilizables (WhatsApp, teléfono, correo, navegación).
- `public/images` — logo optimizado para el sitio.
- `logos/` — archivos originales de marca.

## Build de producción

El sitio se genera como export estático (`output: "export"` en `next.config.ts`):

```bash
npm run build
```

Esto genera la carpeta `out/` con HTML/CSS/JS estático, lista para cualquier hosting estático.

## Despliegue en Cloudflare Pages

1. En el dashboard de Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Selecciona el repositorio `luis9281/sfrpanamacom`.
3. Configuración de build:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
4. Guarda y despliega. Cada `git push` a `main` dispara un nuevo build y despliegue automático.
5. Para usar el dominio propio: en el proyecto de Pages → **Custom domains** → agrega `sfrpanama.com` y `www.sfrpanama.com`, y sigue las instrucciones de DNS (Cloudflare lo configura automáticamente si el dominio ya usa sus nameservers).

No se necesita `wrangler.toml` ni Functions: todo el sitio es estático, por lo que corre en el plan gratuito de Cloudflare Pages sin límites de ancho de banda.
