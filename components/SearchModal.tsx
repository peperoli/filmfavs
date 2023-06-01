import { usePeopleSearch } from '@/hooks/usePeopleSearch'
import { PeopleSearchResult } from '@/types/TMDB'
import { MagnifyingGlassIcon, PersonIcon } from '@radix-ui/react-icons'
import Image from 'next/legacy/image'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Modal } from './Modal'
import { PersonModal } from './PersonModal'

type SearchResultProps = {
  result: PeopleSearchResult
}

export const SearchResult: FC<SearchResultProps> = ({ result }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 py-2 pr-4 border-t border-white/10 text-left"
      >
        <div className="relative flex-shrink-0 grid place-content-center w-14 aspect-2/3 bg-gray-800">
          {result?.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w154${result.profile_path}`}
              alt={result.profile_path}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={`https://image.tmdb.org/t/p/w92${result.profile_path}`}
            />
          ) : (
            <PersonIcon className="w-6 h-6 text-white/50" />
          )}
        </div>
        <div className="text-sm">
          <div>{result.name}</div>
          <div className="text-white/50">{result.known_for_department}</div>
          <div className="line-clamp-2 text-white/50">
            {result.known_for && result.known_for.map(item => item.original_title).join(', ')}
          </div>
        </div>
      </button>
      <PersonModal personId={result.id} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

type SearchModalProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const SearchModal: FC<SearchModalProps> = ({ isOpen, setIsOpen }) => {
  const [query, setQuery] = useState<string>('')
  const { data: peopleSearchResults } = usePeopleSearch(query)
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} headline={`Results for "${query}"`}>
      <h2 className="mb-4 text-xl font-black">Search for people</h2>
      <div className="relative flex items-center mb-4">
        <MagnifyingGlassIcon className="absolute ml-4" />
        <input
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Emma Stone"
          className="w-full pl-12 pr-4 py-3 border border-white text-white bg-gray-900"
        />
      </div>
      <ul className="grid h-full">
        {peopleSearchResults && peopleSearchResults?.total_results > 0 ? (
          peopleSearchResults?.results.map(item => <SearchResult key={item.id} result={item} />)
        ) : (
          <li className="text-sm text-white/50">No results found. Try other search terms.</li>
        )}
      </ul>
    </Modal>
  )
}
