import { usePerson } from '../hooks/usePerson'
import Image from 'next/legacy/image'
import { FC } from 'react'
import { CastCredit } from '@/types/types'
import { StarIcon, VideoIcon } from '@radix-ui/react-icons'

interface CreditProps {
  credit: CastCredit
}

const Credit: FC<CreditProps> = ({ credit }) => {
  return (
    <li className="flex items-center gap-4 w-56 p-1 pr-4 border border-white">
      <div className="relative flex-shrink-0 w-14 aspect-2/3">
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
  count: number
  ratedMovieIds: number[]
}

export const Person: FC<PersonProps> = ({ personId, count, ratedMovieIds }) => {
  const { data: person } = usePerson(personId)
  const ratedMovieCredits = person?.movie_credits?.cast.filter(item =>
    ratedMovieIds.includes(item.id)
  )
  return (
    <div className="flex gap-6 w-full">
      <div className="relative flex-shrink-0 w-32 aspect-2/3">
        {person?.profile_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
            alt={person.name}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`https://image.tmdb.org/t/p/w45${person.profile_path}`}
          />
        )}
      </div>
      <div>
        <h3 className='text-xl font-black'>
          {person?.name}{' '}
          <span className="font-normal text-white/50">
            {person?.birthday?.slice(0, 4)}
            {person?.deathday ? ` – ${person.deathday.slice(0, 4)}` : ''}
          </span>
        </h3>
        <p>
          <VideoIcon className="inline" /> {count} movies you saw
        </p>
        <h4 className="mt-4">Highest Rated Movies</h4>
        <div className="overflow-auto">
          <ul className="flex gap-4">
            {ratedMovieCredits
              ?.sort((a, b) => b.vote_average - a.vote_average)
              .slice(0, 5)
              .map(item => (
                <Credit key={item.id} credit={item} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
