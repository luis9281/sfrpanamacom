import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <p>La página que busca no existe o fue movida.</p>
      <Link href="/" className="font-semibold underline">
        Volver al inicio
      </Link>
    </main>
  );
}
