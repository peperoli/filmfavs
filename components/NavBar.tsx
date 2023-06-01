'use client'

import { useAccount } from '@/hooks/useAccount'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './Button'
import { SearchModal } from './SearchModal'

export const NavBar = () => {
  const { data: account } = useAccount()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <nav className="container py-6 flex justify-between items-center gap-6">
        <Link href="/" className='font-black'>FilmFavs</Link>
        <Link href="/most-seen">Most Seen</Link>
        <Link href="/completionist">Completionist</Link>
        <Button label="Search" icon={<MagnifyingGlassIcon />} onClick={() => setIsOpen(true)} />
        {account && (
          <Link
            href={`https://themoviedb.org/u/${account.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4"
          >
            {account.username}
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
        )}
      </nav>
      <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
