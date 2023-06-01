import { useMovieStates } from '@/hooks/useMovieStates'
import { Part, PersonMovieCredit } from '@/types/TMDB'
import { BookmarkFilledIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import Image from 'next/legacy/image'

type MovieProps = {
  movie: (Part & { job?: string; character?: string }) | PersonMovieCredit
}

export const Movie = ({ movie }: MovieProps) => {
  const { data: movieStates, status } = useMovieStates(movie.id)

  return (
    <li
      className={clsx(
        'flex-shrink-0 flex items-center gap-4 pt-2 pr-4 border-t border-white/10',
        status !== 'loading' && !movieStates?.rated && 'opacity-50 hover:opacity-100'
      )}
    >
      <div className="relative flex-shrink-0 w-14 aspect-2/3 bg-gray-800">
        {movie?.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
            alt={movie.poster_path}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`https://image.tmdb.org/t/p/w45${movie.poster_path}`}
          />
        )}
        {movieStates?.watchlist && (
          <div className="absolute right-0 pl-1 pb-1 bg-gray-900">
            <BookmarkFilledIcon className="text-yellow-400" />
          </div>
        )}
      </div>
      <div className="text-sm overflow-hidden">
        <h5 className="line-clamp-2">{movie.title}</h5>
        {movie.job && <p className="truncate text-white/50">{movie.job}</p>}
        {movie.character && <p className="truncate italic text-white/50">{movie.character}</p>}
        <div className="flex gap-2">
          <div className="flex gap-1 items-center">
            <StarIcon /> {String(movie.vote_average).slice(0, 3)}
          </div>
          {movieStates?.rated && (
            <div className="flex gap-1 items-center">
              <StarFilledIcon className="text-aqua-300" /> {movieStates.rated.value}
            </div>
          )}
        </div>
        <p className="text-white/50">{movie.release_date.slice(0, 4)}</p>
      </div>
    </li>
  )
}
