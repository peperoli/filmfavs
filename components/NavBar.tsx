'use client'

import { useAccount } from '@/hooks/useAccount'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Account } from '@/types/TMDB'
import { HamburgerMenuIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from './Button'
import { Logo } from './Logo'
import { Modal } from './Modal'
import { SearchModal } from './SearchModal'

type NavItemProps = {
  label: string
  link: string
}

const NavItem = ({ label, link }: NavItemProps) => {
  const pathName = usePathname()
  return (
    <Link
      href={link}
      className={clsx('p-2 text-xl md:text-base', pathName === link && 'text-aqua-300')}
    >
      {label}
    </Link>
  )
}

type ProfileLinkProps = {
  account: Account
}

const ProfileLink = ({ account }: ProfileLinkProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  return (
    <Link
      href={`https://themoviedb.org/u/${account.username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 justify-self-end"
    >
      {isDesktop && account.username}
      {account.avatar?.tmdb?.avatar_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w45${account.avatar.tmdb.avatar_path}`}
          alt={account.username}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </Link>
  )
}

export const NavBar = () => {
  const { data: account } = useAccount()
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [searchIsOpen, setSearchIsOpen] = useState(false)
  const navItems = [
    { label: 'Most Seen', link: '/most-seen' },
    { label: 'Completionist', link: '/completionist' },
  ]
  return (
    <>
      <nav className="container sticky z-10 grid md:hidden grid-cols-3 items-center top-0 py-4 bg-gray-900">
        <div className="flex -ml-3">
          <button
            aria-label="Open menu"
            onClick={() => setMenuIsOpen(true)}
            className="flex justify-center items-center w-10 h-10"
          >
            <HamburgerMenuIcon />
          </button>
          <button
            aria-label="Search"
            onClick={() => setSearchIsOpen(true)}
            className="flex justify-center items-center w-10 h-10"
          >
            <MagnifyingGlassIcon />
          </button>
        </div>
        <Link href="/" className="justify-self-center">
          <Logo className="w-auto h-10" />
        </Link>
        {account && <ProfileLink account={account} />}
      </nav>
      <Modal isOpen={menuIsOpen} setIsOpen={setMenuIsOpen}>
        <div className="flex flex-col gap-4">
          <Link href="/" className="p-2">
            <Logo className="w-auto h-10" />
          </Link>
          {navItems.map(item => (
            <NavItem key={item.link} {...item} />
          ))}
        </div>
      </Modal>
      <nav className="container hidden md:flex justify-between items-center gap-6 py-6">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo className="w-auto h-10" />
          </Link>
          <div className="flex items-center gap-4">
            {navItems.map(item => (
              <NavItem key={item.link} {...item} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Button
            label="Search"
            icon={<MagnifyingGlassIcon />}
            onClick={() => setSearchIsOpen(true)}
          />
          {account && <ProfileLink account={account} />}
        </div>
      </nav>
      <SearchModal isOpen={searchIsOpen} setIsOpen={setSearchIsOpen} />
    </>
  )
}
