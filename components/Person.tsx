import { usePerson } from '../hooks/usePerson'
import Image from 'next/legacy/image'
import React, { FC } from 'react'

interface PersonProps {
  personId: number
  count: number
}

export const Person: FC<PersonProps> = ({ personId, count }) => {
  const { data: person } = usePerson(personId)
  return (
    <div>
      <div className="relative aspect-2/3">
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
      <h3>{person?.name}</h3>
      <p>{count} Credits</p>
    </div>
  )
}
