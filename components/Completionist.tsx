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

  const collections = useMemo(() => calculateCollections(movies), [])

  const [visibleItems, setVisibleItems] = useState(25)
  return (
    <>
      <NavBar headline="Most Seen" />
      <main className="container grid gap-4">
        {collections?.slice(0, visibleItems).map(collection => (
          <Collection id={collection.id} ratedMovieIds={collection.movieIds} key={collection.id} />
        ))}
        <Button onClick={() => setVisibleItems(prev => (prev += 25))} label="Show more" />
      </main>
    </>
  )
}
