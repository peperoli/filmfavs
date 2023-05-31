import { usePerson } from '../hooks/usePerson'
import Image from 'next/legacy/image'
import { FC, useState } from 'react'
import { PersonIcon, VideoIcon } from '@radix-ui/react-icons'
import { PersonModal } from './PersonModal'
import { Movie } from './Movie'

interface PersonProps {
  personId: number
  ratedMovieIds: number[]
  department?: string
  jobs?: string[]
}

export const Person: FC<PersonProps> = ({ personId, ratedMovieIds, department, jobs }) => {
  const { data: person } = usePerson(personId)
  const [isOpen, setIsOpen] = useState(false)
  const ratedMovieCredits = department
    ? person?.movie_credits?.crew.filter(
        item =>
          item.department === department &&
          ((item.job && jobs?.includes(item.job)) || !jobs) &&
          ratedMovieIds.includes(item.id)
      )
    : person?.movie_credits?.cast.filter(item => ratedMovieIds.includes(item.id))
  return (
    <>
      <div className="flex gap-6 w-full">
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex-shrink-0 grid place-content-center w-32 aspect-2/3 bg-gray-800"
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
        <div className="grow">
          <h3 className="text-xl font-black">
            {person?.name}{' '}
            <span className="font-normal text-white/50">
              {person?.birthday?.slice(0, 4)}
              {person?.deathday ? ` – ${person.deathday.slice(0, 4)}` : ''}
            </span>
          </h3>
          <p>
            <VideoIcon className="inline" /> {ratedMovieCredits?.length} movies you&apos;ve seen
          </p>
          <div className="flex justify-between gap-4 mt-4">
            <h4>Highest Rated Movies</h4>
            <button onClick={() => setIsOpen(true)} className="underline">
              See all
            </button>
          </div>
          <ul className="grid grid-cols-4 gap-4 w-full">
            {ratedMovieCredits
              ?.sort((a, b) => Number(b.vote_average) - Number(a.vote_average))
              .slice(0, 4)
              .map(item => (
                <Movie key={item.credit_id} movie={item} />
              ))}
          </ul>
        </div>
      </div>
      {person?.id && (
        <PersonModal
          personId={person.id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  )
}
