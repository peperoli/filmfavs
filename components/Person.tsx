import { usePerson } from '../hooks/usePerson'
import Image from 'next/legacy/image'
import { FC, useState } from 'react'
import { CastCredit } from '@/types/types'
import { StarIcon, VideoIcon } from '@radix-ui/react-icons'
import { PersonModal } from './PersonModal'

interface CreditProps {
  credit: CastCredit
}

const Credit: FC<CreditProps> = ({ credit }) => {
  return (
    <li className="flex-shrink-0 flex items-center gap-4 p-1 pr-4 border border-white">
      <div className="relative flex-shrink-0 w-14 aspect-2/3 bg-gray-800">
        {credit?.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w185${credit.poster_path}`}
            alt={credit.poster_path}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`https://image.tmdb.org/t/p/w45${credit.poster_path}`}
          />
        )}
      </div>
      <div className="text-sm">
        <h5 className="line-clamp-2">{credit.title}</h5>
        <p>
          <StarIcon className="inline" /> {String(credit.vote_average).slice(0, 3)}
        </p>
        <p className="text-white/50">{credit.release_date.slice(0, 4)}</p>
      </div>
    </li>
  )
}

interface PersonProps {
  personId: number
  ratedMovieIds: number[]
  department?: 'Directing' | 'Sound'
}

export const Person: FC<PersonProps> = ({ personId, ratedMovieIds, department }) => {
  const { data: person } = usePerson(personId)
  const [isOpen, setIsOpen] = useState(false)
  const ratedMovieCredits = department
    ? person?.movie_credits?.crew.filter(item => item.department === department && ratedMovieIds.includes(item.id))
    : person?.movie_credits?.cast.filter(item => ratedMovieIds.includes(item.id))
  return (
    <>
      <div className="flex gap-6 w-full">
        <button onClick={() => setIsOpen(true)} className="relative flex-shrink-0 w-32 aspect-2/3 bg-gray-800">
          {person?.profile_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w154${person.profile_path}`}
              alt={person.name}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={`https://image.tmdb.org/t/p/w92${person.profile_path}`}
            />
          )}
        </button>
        <div className='grow'>
          <h3 className="text-xl font-black">
            {person?.name}{' '}
            <span className="font-normal text-white/50">
              {person?.birthday?.slice(0, 4)}
              {person?.deathday ? ` – ${person.deathday.slice(0, 4)}` : ''}
            </span>
          </h3>
          <p>
            <VideoIcon className="inline" /> {ratedMovieCredits?.length} movies you saw
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
                <Credit key={item.id} credit={item} />
              ))}
          </ul>
        </div>
      </div>
      {person && ratedMovieCredits && (
        <PersonModal
          person={person}
          ratedMovieCredits={ratedMovieCredits}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  )
}
