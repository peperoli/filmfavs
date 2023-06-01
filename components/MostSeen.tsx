'use client'

import { PopularityChart } from '@/components/PopularityChart'
import { useRatedMovies } from '../hooks/useRatedMovies'
import React, { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import { useCredits } from '../hooks/useCredits'
import { PeopleChart } from './PeopleChart'
import { jobs } from '@/lib/jobs'
import { NavBar } from './NavBar'

export const MostSeen = () => {
  const { data: ratedMovies } = useRatedMovies()
  const ratedMovieIds = ratedMovies?.map(item => item.id) || []
  const creditQueries = useCredits(ratedMovieIds)
  const departments = ['Acting', 'Directing', 'Writing', 'Production', 'Camera', 'Sound']
  const tabs = [...departments, 'By Popularity']
  return (
    <main>
      <NavBar />
      <Tab.Group>
        <Tab.List className="container pb-0 flex items-end border-b border-white">
          {tabs.map(item => (
            <Tab key={item} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`-ml-px -mb-px px-3 py-2 border border-white${
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
          {departments.map(department => (
            <Tab.Panel key={department}>
              {ratedMovieIds && (
                <PeopleChart
                  ratedMovieIds={ratedMovieIds}
                  creditQueries={creditQueries}
                  department={department === 'Acting' ? undefined : department}
                  jobs={jobs && jobs[department.toLowerCase()]}
                />
              )}
            </Tab.Panel>
          ))}
          <Tab.Panel>{ratedMovies && <PopularityChart data={ratedMovies} />}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  )
}
