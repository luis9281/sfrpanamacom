// Next.js 16 exporta los segmentos RSC de las rutas anidadas como
// `ruta/__next.ruta/__PAGE__.txt`, pero el cliente los pide como
// `ruta/__next.ruta.__PAGE__.txt`. Copiamos cada archivo al nombre plano
// para evitar 404 en la precarga de la navegación.
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");

function flatten(segmentDir, name, targetDir) {
  for (const entry of fs.readdirSync(segmentDir, { withFileTypes: true })) {
    const source = path.join(segmentDir, entry.name);
    const flatName = `${name}.${entry.name}`;
    if (entry.isDirectory()) flatten(source, flatName, targetDir);
    else fs.copyFileSync(source, path.join(targetDir, flatName));
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) flatten(full, entry.name, dir);
    else walk(full);
  }
}

walk(outDir);
