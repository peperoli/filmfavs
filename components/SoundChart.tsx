import { FC, useMemo, useState } from 'react'
import { Person } from './Person'
import { UseQueryResult } from '@tanstack/react-query'
import { MovieCredits } from '@/types/types'
import { calculateCreditCounts } from '@/helpers/calculateCreditCounts'
import { FilterButton } from './Button'

interface SoundChartProps {
  ratedMovieIds: number[]
  creditQueries: UseQueryResult<MovieCredits, unknown>[]
}

export const SoundChart: FC<SoundChartProps> = ({ ratedMovieIds, creditQueries }) => {
  const [selectedJob, setSelectedJob] = useState<string | null>('Original Music Composer')
  const [visibleItems, setVisibleItems] = useState(25)

  const jobs = ['Original Music Composer', 'Main Title Theme Composer', 'Songs', 'Music', 'Sound Designer', 'Sound Editor']
  const progress =
    (creditQueries.filter(item => item.status === 'success').length / ratedMovieIds.length) * 100
  const isSuccess = progress === 100
  const creditCounts = useMemo(
    () => calculateCreditCounts(creditQueries, 'Sound', selectedJob),
    [isSuccess, selectedJob]
  )
  const topSound =
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
          <div className="flex flex-wrap gap-2 mb-6">
            {jobs.map(item => (
              <FilterButton
                key={item}
                label={item}
                onClick={() => setSelectedJob(item)}
                isSelected={selectedJob === item}
              />
            ))}
            <FilterButton
              label="All"
              onClick={() => setSelectedJob(null)}
              isSelected={!selectedJob}
            />
          </div>
          <div className="grid gap-6">
            {topSound?.map(item => (
              <Person
                key={item.id}
                personId={item.id}
                ratedMovieIds={ratedMovieIds}
                department="Sound"
                job={selectedJob}
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
