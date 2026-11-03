import Link from 'next/link'
import { Brand } from './Brand'
import { NavLinks } from '@/interfaces/nav-links.interface'

interface NavbarProps {
  links: NavLinks[]
}

export const Navbar = ({ links }: NavbarProps) => {
  return (
    <nav className="flex items-center gap-6 bg-gray-900 px-6 py-4 text-slate-300">
      <Link href="/" className="mr-auto text-lg font-bold text-white">
        <Brand />
      </Link>

      {links?.map((link) => (
        <Link href={link.href} className="hover:text-white" key={link.href}>
          {link.title}
        </Link>
      ))}
    </nav>
  )
}