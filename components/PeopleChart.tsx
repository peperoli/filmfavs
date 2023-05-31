import { FC, useMemo, useState } from 'react'
import { Person } from './Person'
import { UseQueryResult } from '@tanstack/react-query'
import { MovieCredits } from '@/types/TMDB'
import { calculateCreditCounts } from '@/lib/calculateCreditCounts'
import { FilterButton } from './Button'

interface PeopleChartProps {
  ratedMovieIds: number[]
  creditQueries: UseQueryResult<MovieCredits, unknown>[]
  department?: string
  jobs?: { name: string; value: string[] }[]
}

export const PeopleChart: FC<PeopleChartProps> = ({
  ratedMovieIds,
  creditQueries,
  department,
  jobs,
}) => {
  const [selectedJob, setSelectedJob] = useState<string | null | undefined>(jobs && jobs[0].name)
  const [visibleItems, setVisibleItems] = useState(25)
  const progress =
    (creditQueries.filter(item => item.status === 'success').length / ratedMovieIds.length) * 100
  const isSuccess = progress === 100
  const creditCounts = useMemo(
    () => calculateCreditCounts(creditQueries, department, jobs?.find(item => item.name === selectedJob)?.value),
    [isSuccess, selectedJob]
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
                isSelected={!selectedJob}
              />
            </div>
          )}
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
