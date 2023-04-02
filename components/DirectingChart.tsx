import { FC, useMemo, useState } from 'react'
import { Person } from './Person'
import { Button } from './Button'
import { FilterButton } from './Button'
import { UseQueryResult } from '@tanstack/react-query'
import { MovieCredits } from '@/types/types'
import { calculateCreditCounts } from '@/helpers/calculateCreditCounts'

interface DirectingChartProps {
  ratedMovieIds: number[]
  creditQueries: UseQueryResult<MovieCredits, unknown>[]
}

export const DirectingChart: FC<DirectingChartProps> = ({ ratedMovieIds, creditQueries }) => {
  const [visibleItems, setVisibleItems] = useState(25)
  const [selectedJob, setSelectedJob] = useState<string | null>('Director')

  const progress =
    (creditQueries.filter(item => item.status === 'success').length / ratedMovieIds.length) * 100
  const isSuccess = progress === 100
  const creditCounts = useMemo(() => calculateCreditCounts(creditQueries, 'Directing', selectedJob), [isSuccess, selectedJob])

  const topCredits =
    progress === 100
      ? creditCounts
          .sort((a, b) => b.count - a.count)
          .slice(0, visibleItems)
      : null
  return (
    <section className="container">
      {progress !== 100 ? (
        <div className="flex items-center">
          <progress value={progress} max="100" />
          <p>Loading {Math.ceil(progress)}%</p>
        </div>
      ) : (
        <>
        <div className="flex gap-2 mb-6">
          <FilterButton label="Director" onClick={() => setSelectedJob('Director')} isSelected={selectedJob === 'Director'} />
          <FilterButton label="All" onClick={() => setSelectedJob(null)} isSelected={!selectedJob} />
        </div>
          <div className="grid gap-6">
            {topCredits?.map(item => (
              <Person key={item.id} personId={item.id} ratedMovieIds={ratedMovieIds} department="Directing" job={selectedJob} />
            ))}
            <div className="flex justify-center">
              <Button label="View more" onClick={() => setVisibleItems(prev => (prev += 25))} />
            </div>
          </div>
        </>
      )}
    </section>
  )
}
