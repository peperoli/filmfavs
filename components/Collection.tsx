import { useCollection } from '../hooks/useCollection'
import Image from 'next/legacy/image'
import React from 'react'
import { MixIcon } from '@radix-ui/react-icons'

type CollectionProps = {
  id: number
  ratedMovieIds: number[]
}

export const Collection = ({ id, ratedMovieIds }: CollectionProps) => {
  const { data: collection } = useCollection(id)
  const releasedParts =
    collection?.parts.filter(part => new Date(part.release_date) < new Date()) || []
  return (
    <div className="relative flex gap-6 w-full">
      {collection?.backdrop_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w780${collection.backdrop_path}`}
          alt={collection.name}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`https://image.tmdb.org/t/p/w300${collection.backdrop_path}`}
          className="opacity-10"
        />
      )}
      <button
        // onClick={() => setIsOpen(true)}
        className="relative flex-shrink-0 grid place-content-center self-start w-32 aspect-2/3 bg-gray-800"
      >
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
      </button>
      <div className="relative grow">
        <h3 className="mb-2 text-xl font-black">
          {collection?.name} <span className="font-normal text-white/50">{ratedMovieIds.length}/{releasedParts.length}</span>
        </h3>
        <div className="w-48 bg-white/25">
          <div
            className="h-1 bg-white"
            style={{ width: (ratedMovieIds.length / releasedParts.length) * 100 + '%' }}
          />
        </div>
        <p>
          {/* <VideoIcon className="inline" /> {ratedMovieCredits?.length} movies you&apos;ve seen */}
        </p>
        <div className="flex justify-between gap-4 mt-4">
          <h4 className="mb-2">Parts</h4>
          <button className="underline">See all</button>
        </div>
        <ul className="grid gap-2 w-full">
          {releasedParts.map(part => (
            <div key={part.id}>
              {ratedMovieIds.includes(part.id) ? '✅' : '❌'} {part.title}{' '}
              <span className="text-white/50">({part.release_date.slice(0, 4)})</span>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
