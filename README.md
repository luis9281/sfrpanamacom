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

```bash
npm run build
npm run start
```
