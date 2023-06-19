'use client'

import { useRatedMovies } from '../hooks/useRatedMovies'
import React, { useMemo, useState } from 'react'
import { useMovies } from '../hooks/useMovies'
import { Collection } from './Collection'
import { NavBar } from './NavBar'
import { Button } from './Button'

export const Completionist = () => {
  const { data: ratedMovies } = useRatedMovies()
  const ratedMovieIds = ratedMovies?.map(item => item.id) || []
  const movies = useMovies(ratedMovieIds)

  const calculateCollections = function (movies: any[]) {
    const collections: { [key: number]: number[] } = {}

    for (let index = 0; index < movies.length; index++) {
      const collection = movies[index].data && movies[index].data.belongs_to_collection

      if (collection && !collections[collection.id]) {
        collections[collection.id] = [movies[index].data.id]
      } else {
        collection && collections[collection.id].push(movies[index].data.id)
      }
    }

    return Object.entries(collections).map(([id, movieIds]) => ({
      id: Number(id),
      movieIds,
    }))
  }

  const progress =
    (movies.filter(item => item.status === 'success').length / ratedMovieIds.length) * 100
  const isSuccess = progress === 100

  const collections = useMemo(() => calculateCollections(movies), [isSuccess])

  function compareCollections(
    a: { id: number; movieIds: number[] },
    b: { id: number; movieIds: number[] }
  ) {
    if (a.movieIds.length < b.movieIds.length) {
      return 1
    } else if (a.movieIds.length > b.movieIds.length) {
      return -1
    }
    return 0
  }

  const [visibleItems, setVisibleItems] = useState(25)
  return (
    <>
      <NavBar />
      <main className="container grid gap-8">
        {progress !== 100 ? (
          <div className="flex items-center">
            <progress value={progress} max="100" />
            <p>Loading {Math.ceil(progress)}%</p>
          </div>
        ) : (
          <>
            {collections
              ?.sort(compareCollections)
              .slice(0, visibleItems)
              .map(collection => (
                <Collection
                  id={collection.id}
                  ratedMovieIds={collection.movieIds}
                  key={collection.id}
                />
              ))}
            <div className="flex justify-center">
              <Button onClick={() => setVisibleItems(prev => (prev += 25))} label="Show more" />
            </div>
          </>
        )}
      </main>
    </>
  )
}
