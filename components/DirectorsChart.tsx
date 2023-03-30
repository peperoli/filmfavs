import { useCredits } from '../hooks/useCredits'
import { FC, useMemo, useState } from 'react'
import { Person } from './Person'
import { Button } from './Button'
import { FilterButton } from './Button'

interface DirectorsChartProps {
  ratedMovieIds: number[]
}

export const DirectorsChart: FC<DirectorsChartProps> = ({ ratedMovieIds }) => {
  const [visibleItems, setVisibleItems] = useState(25)
  const [selectedJob, setSelectedJob] = useState<string | null>('Director')

  const creditQueries = useCredits(ratedMovieIds)

  function calculateCrewCreditCounts(movieCredits: any[]) {
    const crewCreditCounts: { [key: number]: number } = {}

    for (let index = 0; index < movieCredits.length; index++) {
      const crewCredits = movieCredits[index].data?.crew || []

      for (let index = 0; index < crewCredits.length; index++) {
        const crewCredit = crewCredits[index]

        if (!crewCreditCounts[crewCredit.id] && crewCredit.department === 'Directing' && (crewCredit.job === selectedJob || !selectedJob)) {
          crewCreditCounts[crewCredit.id] = 1
        } else if (crewCredit.department === 'Directing' && (crewCredit.job === selectedJob || !selectedJob)) {
          crewCreditCounts[crewCredit.id] += 1
        }
      }
    }

    return Object.entries(crewCreditCounts).map(([id, count]) => ({ id: Number(id), count }))
  }

  const progress =
    (creditQueries.filter(item => item.status === 'success').length / ratedMovieIds.length) * 100
  const isSuccess = progress === 100
  const creditCounts = useMemo(() => calculateCrewCreditCounts(creditQueries), [isSuccess, selectedJob])

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
              <Person key={item.id} personId={item.id} ratedMovieIds={ratedMovieIds} department="Directing" />
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
