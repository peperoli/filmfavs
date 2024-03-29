import { FC, useMemo, useState } from 'react'
import { Person } from './Person'
import { UseQueryResult } from '@tanstack/react-query'
import { MovieCredits } from '@/types/TMDB'
import { calculateCreditCounts } from '@/lib/calculateCreditCounts'
import { FilterButton } from './Button'
import { genders } from '@/lib/genders'

interface PeopleChartProps {
  ratedMovieIds: number[]
  creditQueries: UseQueryResult<MovieCredits, unknown>[]
  department?: string
  jobs?: { name: string; value: string[] }[]
}

export const PeopleChart = ({
  ratedMovieIds,
  creditQueries,
  department,
  jobs,
}: PeopleChartProps) => {
  const [selectedJob, setSelectedJob] = useState<string | null | undefined>(jobs && jobs[0].name)
  const [selectedGender, setSelectedGender] = useState<number | null>(null)
  const [visibleItems, setVisibleItems] = useState(25)
  const progress =
    (creditQueries?.filter(item => item.status === 'success').length / ratedMovieIds.length) *
      100 || 0
  const isSuccess = progress === 100
  const creditCounts = useMemo(
    () =>
      calculateCreditCounts(
        creditQueries,
        department,
        jobs?.find(item => item.name === selectedJob)?.value,
        selectedGender
      ),
    [isSuccess, selectedJob, selectedGender]
  )
  const topPeople =
    progress === 100 ? creditCounts.sort((a, b) => b.count - a.count).slice(0, visibleItems) : null
  return (
    <section className="container">
      {progress !== 100 ? (
        <div className="flex items-center">
          <progress value={progress} max="100" />
          <p>Loading {Math.ceil(progress)}%</p>
        </div>
      ) : (
        <>
          {jobs && (
            <div className="flex flex-wrap gap-2 mb-6">
              {jobs.map(item => (
                <FilterButton
                  key={item.name}
                  label={item.name}
                  onClick={() => setSelectedJob(item.name)}
                  isSelected={selectedJob === item.name}
                />
              ))}
              <FilterButton
                label="All"
                onClick={() => setSelectedJob(null)}
                isSelected={selectedJob === null}
              />
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-6">
            <FilterButton
              label="All"
              onClick={() => setSelectedGender(null)}
              isSelected={selectedGender === null}
            />
            {genders
              .filter(item => item !== 'Not specified')
              .map(item => (
                <FilterButton
                  key={item}
                  label={item}
                  onClick={() => setSelectedGender(genders.indexOf(item))}
                  isSelected={selectedGender === genders.indexOf(item)}
                />
              ))}
          </div>
          <div className="grid gap-6">
            {topPeople?.map(item => (
              <Person
                key={item.id}
                personId={item.id}
                ratedMovieIds={ratedMovieIds}
                department={department}
                jobs={jobs?.find(item => item.name === selectedJob)?.value}
              />
            ))}
            <div className="flex justify-center">
              <button
                onClick={() => setVisibleItems(prev => (prev += 25))}
                className="flex items-center gap-2 px-3 py-1.5 border border-white bg-gray-900"
              >
                View more
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
