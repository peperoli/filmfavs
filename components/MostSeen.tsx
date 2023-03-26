'use client'

import { PopularityChart } from '@/components/PopularityChart'
import { useRatedMovies } from '../hooks/useRatedMovies'
import { useAccount } from '../hooks/useAccount'
import React, { Fragment } from 'react'
import { ActorsChart } from './ActorsChart'
import { Tab } from '@headlessui/react'

export const MostSeen = () => {
  const { data: ratedMovies } = useRatedMovies()
  const { data: account } = useAccount()
  const tabs = ['Actors', 'By Year']
  return (
    <main>
      <nav className="container py-6 flex justify-between gap-6">
        <div>FilmFavs</div>
        <div>Most Seen</div>
        <div>{account?.username}</div>
      </nav>
      <Tab.Group>
        <Tab.List className="container pb-0 flex items-end border-b border-white">
          {tabs.map(item => (
            <Tab key={item} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`-mb-px px-3 py-2 border border-white border-l-0 first:border-l${
                    selected ? ' pb-4 border-b-black/90' : ''
                  }`}
                >
                  {item}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>{ratedMovies && <ActorsChart ratedMovies={ratedMovies} />}</Tab.Panel>
          <Tab.Panel>{ratedMovies && <PopularityChart data={ratedMovies} />}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  )
}
