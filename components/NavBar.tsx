'use client'

import { useAccount } from '@/hooks/useAccount'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { FC, useState } from 'react'
import { Button } from './Button'
import { SearchModal } from './SearchModal'

type NavBarProps = {
  headline: string
}

export const NavBar: FC<NavBarProps> = ({ headline }) => {
  const { data: account } = useAccount()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
    <nav className="container py-6 flex justify-between gap-6">
      <Link href="/">FilmFavs</Link>
      <Link href="/most-seen">Most Seen</Link>
      <Link href="/completionist">Completionist</Link>
      <div className="flex items-center gap-4">
        <Button label="Search" icon={<MagnifyingGlassIcon />} onClick={() => setIsOpen(true)} />
        {account?.username}
      </div>
    </nav>
    <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
