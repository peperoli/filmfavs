import { useCollection } from '../hooks/useCollection'
import Image from 'next/legacy/image'
import React from 'react'
import { MixIcon } from '@radix-ui/react-icons'
import { Movie } from './Movie'
import { Part } from '../types/TMDB'

type CollectionProps = {
  id: number
  ratedMovieIds: number[]
}

export const Collection = ({ id, ratedMovieIds }: CollectionProps) => {
  const { data: collection } = useCollection(id)
  const releasedParts =
    collection?.parts.filter(part => new Date(part.release_date) < new Date()) || []
  return (
    <div className="flex gap-6 w-full">
      <div className="relative flex-shrink-0 grid place-content-center self-start w-32 aspect-2/3 bg-gray-800">
        {collection?.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w154${collection.poster_path}`}
            alt={collection.name}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`https://image.tmdb.org/t/p/w92${collection.poster_path}`}
          />
        ) : (
          <MixIcon className="w-6 h-6 text-white/50" />
        )}
      </div>
      <div className="relative grow">
        <h3 className="mb-2 text-xl font-black">
          {collection?.name}{' '}
          <span className="font-normal text-white/50">
            {ratedMovieIds.length}/{releasedParts.length}
          </span>
        </h3>
        <div className="w-48 bg-white/25">
          <div
            className="h-1 bg-aqua-300"
            style={{ width: (ratedMovieIds.length / releasedParts.length) * 100 + '%' }}
          />
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <h4 className="mb-2">Parts</h4>
        </div>
        <ul className="grid grid-cols-4 gap-2 w-full">
          {releasedParts
            .sort((a, b) => a.release_date < b.release_date ? 1 : -1)
            .map(part => (
              <Movie key={part.id} movie={part} />
            ))}
        </ul>
      </div>
    </div>
  )
}
