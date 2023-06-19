'use client'

import { PopularityChart } from '@/components/PopularityChart'
import { useRatedMovies } from '../hooks/useRatedMovies'
import React, { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import { useCredits } from '../hooks/useCredits'
import { PeopleChart } from './PeopleChart'
import { jobs } from '@/lib/jobs'
import { NavBar } from './NavBar'
import clsx from 'clsx'

export const MostSeen = () => {
  const { data: ratedMovies } = useRatedMovies()
  const ratedMovieIds = ratedMovies?.map(item => item?.id) || []
  const creditQueries = useCredits(ratedMovieIds)
  const departments = ['Acting', 'Directing', 'Writing', 'Production', 'Camera', 'Sound']
  const tabs = [...departments, 'By Popularity']
  return (
    <main>
      <NavBar />
      <Tab.Group>
        <Tab.List className="container pb-0 flex items-end md:border-b md:border-white overflow-x-auto md:overflow-visible">
          {tabs.map(item => (
            <Tab key={item} as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx(
                    'flex-shrink-0 -ml-3 md:-ml-px md:-mb-px px-3 md:border md:border-white',
                    selected && 'md:pb-4 md:border-b-black/90 font-extrabold md:font-normal'
                  )}
                >
                  <span className={clsx('block py-2', selected && 'border-b-2 border-white md:border-none')}>
                    {item}
                  </span>
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
