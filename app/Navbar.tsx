'use client';
import Link from "next/link"
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues'}
    ]

    return (
        <nav className="flex p-4 gap-6 items-center shadow mb-5 space-x-6">
            <Link href={'/'}><FaBug /></Link>
            <ul className="flex gap-4 items-center">
                {links.map(link => 
                    <Link 
                        key={link.href} 
                        className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'}  hover:text-zinc-800 transition-colors`} 
                        href={link.href}>{link.label}</Link>)}
            </ul>
        </nav>
    )
}

export default NavBar;