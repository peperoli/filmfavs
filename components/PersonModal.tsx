import { Dispatch, SetStateAction, FC } from 'react'
import { Person, PersonMovieCredit } from '../types/types'
import { Modal } from './Modal'
import { ExternalLinkIcon, PersonIcon, StarIcon, VideoIcon } from '@radix-ui/react-icons'
import Image from 'next/legacy/image'

interface CreditProps {
  credit: PersonMovieCredit
}

const Credit: FC<CreditProps> = ({ credit }) => {
  return (
    <li className="flex items-center gap-4 py-2 pr-4 border-t border-white/10">
      <div className="relative flex-shrink-0 w-14 aspect-2/3">
        {credit?.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w154${credit.poster_path}`}
            alt={credit.poster_path}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`https://image.tmdb.org/t/p/w92${credit.poster_path}`}
          />
        )}
      </div>
      <div className="grow text-sm">
        <h5 className="line-clamp-2">{credit.title}</h5>
        <p className='text-white/50'>{credit.job ? credit.job : credit.character}</p>
        <p>
          <StarIcon className="inline" /> {String(credit.vote_average).slice(0, 3)}
        </p>
      </div>
        <p className="text-white/50">{credit.release_date.slice(0, 4)}</p>

    </li>
  )
}

interface PersonModalProps {
  person: Person
  ratedMovieCredits: PersonMovieCredit[]
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const PersonModal: FC<PersonModalProps> = ({
  person,
  ratedMovieCredits,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} headline={person.name}>
      <div className="flex gap-6">
        <div className="relative flex-shrink-0 grid place-content-center w-48 aspect-2/3 bg-gray-800">
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
          <a
            href={`https://www.imdb.com/name/${person?.imdb_id}`}
            className="block underline"
            target="_blank"
            rel="noreferrer"
          >
            IMDb profile <ExternalLinkIcon className="inline" />
          </a>
          <a
            href={`https://www.themoviedb.org/person/${person?.id}`}
            className="block underline"
            target="_blank"
            rel="noreferrer"
          >
            The Movie DB profile <ExternalLinkIcon className="inline" />
          </a>
          <p>
            <VideoIcon className="inline" /> {ratedMovieCredits?.length} movies you saw
          </p>
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
            <Credit key={item.id} credit={item} />
          ))}
      </ul>
    </Modal>
  )
}
