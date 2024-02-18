'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug style={{ marginBottom: '2px' }} />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classNames({
                      'text-zinc-900': link.href === currentPath,
                      'text-zinc-400': link.href !== currentPath,
                      'hover:text-zinc-800 transition-colors duration-100 ease-in-out cursor-pointer': true,
                    })}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && <Link href="/api/auth/signout">Logout</Link>}
            {status === 'unauthenticated' && <Link href="/api/auth/signin">Sign in</Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
