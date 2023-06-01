import { Dispatch, SetStateAction, FC, useState } from 'react'
import { Modal } from './Modal'
import { ExternalLinkIcon, PersonIcon, VideoIcon } from '@radix-ui/react-icons'
import Image from 'next/legacy/image'
import { useRatedMovies } from '@/hooks/useRatedMovies'
import { usePerson } from '@/hooks/usePerson'
import { Movie } from './Movie'

interface PersonModalProps {
  personId: number
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const PersonModal: FC<PersonModalProps> = ({ personId, isOpen, setIsOpen }) => {
  const { data: person } = usePerson(personId)
  const { data: ratedMovies } = useRatedMovies()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const ratedMovieIds = ratedMovies?.map(movie => movie.id)
  const castCredits = person?.movie_credits?.cast || []
  const crewCredits = person?.movie_credits?.crew || []
  const ratedMovieCredits = [...castCredits, ...crewCredits].filter(item =>
    ratedMovieIds?.includes(item.id)
  )
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} headline={person?.name ?? ''}>
      <div className="flex items-start gap-6">
        <div
          className={`relative flex-shrink-0 place-content-center w-48 aspect-2/3 bg-gray-800${
            isCollapsed ? ' grid' : ' hidden'
          }`}
        >
          {person?.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/h632${person.profile_path}`}
              alt={person.name}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={`https://image.tmdb.org/t/p/w45${person.profile_path}`}
            />
          ) : (
            <PersonIcon className="w-6 h-6 text-white/50" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-black">
            {person?.name}{' '}
            <span className="font-normal text-white/50">
              {person?.birthday?.slice(0, 4)}
              {person?.deathday ? ` – ${person.deathday.slice(0, 4)}` : ''}
            </span>
          </h3>
          <div className="flex gap-4">
            <a
              href={`https://www.imdb.com/name/${person?.imdb_id}`}
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              IMDb <ExternalLinkIcon className="inline" />
            </a>
            <a
              href={`https://www.themoviedb.org/person/${person?.id}`}
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              TMDB <ExternalLinkIcon className="inline" />
            </a>
          </div>
          <p className="mb-4">
            <VideoIcon className="inline" /> {ratedMovieCredits?.length} credits you&apos;ve seen
          </p>
          <p className={`text-sm${isCollapsed ? ' line-clamp-6' : ''}`}>{person?.biography}</p>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="underline">
            {isCollapsed ? 'Show more' : 'Show less'}
          </button>
        </div>
      </div>
      <h4 className="mt-4 mb-2">Your Rated Movies</h4>
      <ul className="grid">
        {ratedMovieCredits
          ?.sort(
            (a, b) =>
              Number(b.release_date.replaceAll('-', '')) -
              Number(a.release_date.replaceAll('-', ''))
          )
          .map(item => (
            <Movie key={item.credit_id} movie={item} />
          ))}
      </ul>
    </Modal>
  )
}
