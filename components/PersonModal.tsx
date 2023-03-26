import { Dispatch, SetStateAction, FC } from 'react'
import { Person, CastCredit } from '../types/types'
import { Modal } from './Modal'
import { StarIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

interface CreditProps {
  credit: CastCredit
}

const Credit: FC<CreditProps> = ({ credit }) => {
  return (
    <li className="flex items-center gap-4 p-1 pr-4 border border-white">
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
        <p>{credit.character}</p>
        <p>
          <StarIcon className="inline" /> {String(credit.vote_average).slice(0, 3)}
        </p>
        <p className="text-white/50">{credit.release_date.slice(0, 4)}</p>
      </div>
    </li>
  )
}

interface PersonModalProps {
  person: Person
  ratedMovieCredits: CastCredit[]
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
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative flex-shrink-0 w-48 aspect-2/3">
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
        <h3 className="text-xl font-black">
          {person?.name}{' '}
          <span className="font-normal text-white/50">
            {person?.birthday?.slice(0, 4)}
            {person?.deathday ? ` – ${person.deathday.slice(0, 4)}` : ''}
          </span>
        </h3>
        <h4 className="mt-4">Your Rated Movies</h4>
        <ul className="grid gap-4">
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
      </div>
    </Modal>
  )
}
