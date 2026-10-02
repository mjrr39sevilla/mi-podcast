"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="border-b border-ink-line bg-ink/80 backdrop-blur sticky top-0 z-10">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4"
      >
        <Link
          href="/"
          className="font-medium tracking-[0.2em] text-xs uppercase text-paper hover:text-accent transition-colors"
        >
          Midnight&nbsp;Ink
        </Link>
        <ul className="flex flex-wrap items-center gap-1 text-[13px] sm:gap-2 sm:text-sm">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    "inline-block rounded-full px-3 py-1.5 transition-colors " +
                    (active
                      ? "bg-accent text-ink font-medium"
                      : "text-paper-dim hover:text-accent")
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
