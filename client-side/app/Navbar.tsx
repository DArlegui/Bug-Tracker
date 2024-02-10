'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from 'react-icons/fa';

const Navbar = () => {
  const currentPath = usePathname();

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
            <li
              key={link.href}
              className={classNames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-400': link.href !== currentPath,
                'hover:text-zinc-800 transition-colors duration-100 ease-in-out cursor-pointer': true,
              })}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
