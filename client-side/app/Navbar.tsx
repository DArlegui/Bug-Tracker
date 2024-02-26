'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

//Navbar, NavLinks, AuthStatus

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug style={{ marginBottom: '2px' }} />
            </Link>
            <NavLinks />
          </Flex>
          <Flex align="center" className="space-x-2">
            <AuthStatus />
            {/* <Text
              className="hover:cursor-pointer hover:text-zinc-800 text-zinc-400"
              onClick={() => console.log(signOut())}>
              Sign out
            </Text> */}
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

//Components for NavBar
const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              // 'nav-link': true,
              '!text-zinc-900': link.href === currentPath,
              'text-zinc-400': link.href !== currentPath,
              'hover:text-zinc-800 transition-colors duration-100 ease-in-out cursor-pointer': true,
            })}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === 'loading') return <Skeleton width="3rem" />;
  if (status === 'unauthenticated') {
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Sign in
      </Link>
    );
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content sideOffset={5}>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.name}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;
