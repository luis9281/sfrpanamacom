"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { navLinks, site, whatsappLink } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
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
        <a href="#inicio" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt={site.legalName}
            width={140}
            height={100}
            className="h-12 w-auto"
            priority
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-brand-charcoal transition-colors hover:text-brand-green-dark"
            >
              {link.label}
            </a>
          ))}
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
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-brand-charcoal hover:bg-brand-green-light"
              >
                {link.label}
              </a>
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
