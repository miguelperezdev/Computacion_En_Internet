import React from 'react'
import { Brand } from './Brand'
import {  NavLinks } from '@/interfaces/nav-links.interface'

export const Navbar = ({ links }: { links: NavLinks[] }) => {
    return (
        <nav className="flex items-center gap-6 bg-gray-900 px-6 py-4 text-slate-300">
            <a href="/" className="mr-auto text-lg font-bold text-white">
                <Brand />
            </a>
            {links ? links.map((link) => (
                <a href={link.href} className="hover:text-white" key={link.href}>
                    {link.title}
                </a>
            )) : ""}
        </nav>
    )
}