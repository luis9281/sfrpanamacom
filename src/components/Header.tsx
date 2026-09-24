"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X, MessageCircle } from "lucide-react";
import { navLinks, site, whatsappLink } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => href === pathname;
  const isSectionActive = (link: (typeof navLinks)[number]) =>
    isActive(link.href) || !!link.children?.some((child) => isActive(child.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-sm"
          : "bg-white/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt={site.legalName}
            width={140}
            height={100}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  aria-haspopup="true"
                  className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:text-brand-green-dark ${
                    isSectionActive(link) ? "text-brand-green-dark" : "text-brand-charcoal"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={15}
                    className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  />
                </Link>
                {/* Submenú: se abre con el mouse o al navegar con el teclado */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="min-w-52 rounded-2xl border border-black/5 bg-white p-2 shadow-xl">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={isActive(child.href) ? "page" : undefined}
                          className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-brand-green-light hover:text-brand-green-dark ${
                            isActive(child.href) ? "text-brand-green-dark" : "text-brand-charcoal"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-sm font-semibold transition-colors hover:text-brand-green-dark ${
                  isActive(link.href) ? "text-brand-green-dark" : "text-brand-charcoal"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <a
            href={whatsappLink("Hola, quiero solicitar una cotización de servicios TI.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-bold text-brand-ink shadow-sm transition-transform hover:scale-105 hover:bg-brand-green-dark hover:text-white"
          >
            <MessageCircle size={18} />
            Solicitar cotización
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center rounded-lg p-2 text-brand-charcoal lg:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-semibold text-brand-charcoal hover:bg-brand-green-light"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-3 flex flex-col border-l-2 border-brand-green/30 pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(child.href) ? "page" : undefined}
                        className={`rounded-lg px-3 py-2.5 text-[15px] font-semibold hover:bg-brand-green-light ${
                          isActive(child.href) ? "text-brand-green-dark" : "text-brand-charcoal/80"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <a
            href={whatsappLink("Hola, quiero solicitar una cotización de servicios TI.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-bold text-brand-ink"
          >
            <MessageCircle size={18} />
            Solicitar cotización
          </a>
        </div>
      )}
    </header>
  );
}
