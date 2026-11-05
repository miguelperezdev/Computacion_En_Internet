import Link from "next/link";
import { Brand } from "./Brand";
import type { NavLink } from "@/interfaces/nav-links.interface";

const DEFAULT_LINKS: NavLink[] = [
  { href: "/", title: "Inicio" },
  { href: "/students", title: "Students" },
  { href: "/about", title: "About" },
];

interface NavbarProps {
  links?: NavLink[];
}

export const Navbar = ({ links = DEFAULT_LINKS }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-4 text-sm text-zinc-400">
        <Link
          href="/"
          className="mr-auto flex items-center gap-3 text-base font-semibold text-white"
        >
          <Brand />
          <span className="hidden sm:inline">Computación en Internet</span>
        </Link>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-white"
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};
