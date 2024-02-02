'use client';
import Link from 'next/link';
import { FaBug } from 'react-icons/fa';

const Navbar = () => {
  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => {
          return (
            <li key={link.href} className="text-zinc-500 hover:text-zinc-800">
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
