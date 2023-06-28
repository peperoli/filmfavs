import { usePerson } from '../hooks/usePerson'
import Image from 'next/legacy/image'
import { useState } from 'react'
import { PersonIcon, VideoIcon } from '@radix-ui/react-icons'
import { PersonModal } from './PersonModal'
import { Movie } from './Movie'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { mergeCreditsByMovie } from '@/lib/mergeCreditsByMovie'

interface PersonProps {
  personId: number
  ratedMovieIds: number[]
  department?: string
  jobs?: string[]
}

export const Person = ({ personId, ratedMovieIds, department, jobs }: PersonProps) => {
  const { data: person } = usePerson(personId)
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const ratedMovieCredits = department
    ? person?.movie_credits?.crew.filter(
        movieCredit =>
          movieCredit.department === department &&
          ((movieCredit.job && jobs?.some(job => movieCredit.job?.includes(job))) || !jobs) &&
          ratedMovieIds.includes(movieCredit.id)
      )
    : person?.movie_credits?.cast.filter(item => ratedMovieIds.includes(item.id))
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const mergedCredits = mergeCreditsByMovie(ratedMovieCredits)
  const movieCreditsGrid = (
    <ul className="flex md:grid md:grid-cols-4 gap-4 -mx-6 mt-2 px-6 overflow-x-auto">
      {mergedCredits
        ?.sort((a, b) => Number(new Date(b.release_date).getFullYear() ) - Number(new Date(a.release_date).getFullYear()))
        .slice(0, isCollapsed ? 4 : undefined)
        .map(item => (
          <Movie key={item.credit_id} movie={item} fixedWidth />
        ))}
    </ul>
  )
  return (
    <>
      <div className="grid">
        <div className="flex gap-6 w-full">
          <button
            onClick={() => setIsOpen(true)}
            className="relative self-start flex-shrink-0 grid place-content-center w-28 md:w-32 aspect-2/3 bg-gray-800"
          >
            {person?.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w154${person.profile_path}`}
                alt={person.name}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={`https://image.tmdb.org/t/p/w92${person.profile_path}`}
              />
            ) : (
              <PersonIcon className="w-6 h-6 text-white/50" />
            )}
          </button>
          <div className="grow flex flex-col">
            <div className="flex flex-col md:flex-row md:items-end md:gap-3">
              <h3>{person?.name}</h3>
              <p className="font-normal text-white/50">
                {person?.birthday && new Date(person.birthday).getFullYear()}
                {person?.deathday ? ` – ${new Date(person.deathday).getFullYear()}` : ''}
              </p>
            </div>
            <div className="md:flex justify-between gap-4 mt-auto">
              <h4>
                <VideoIcon className="inline" /> {mergedCredits?.length} movies you&apos;ve seen
              </h4>
              <button onClick={() => setIsCollapsed(prev => !prev)} className="underline">
                {isCollapsed ? 'Show all' : 'Show less'}
              </button>
            </div>
            {isDesktop && movieCreditsGrid}
          </div>
        </div>
        {!isDesktop && movieCreditsGrid}
      </div>
      {person?.id && isOpen && <PersonModal personId={person.id} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  )
}
