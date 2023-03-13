import { RatedMovie } from '@/types/types'
import { FC, useState } from 'react'

interface PopularityChartProps {
  data: RatedMovie[]
}

export const PopularityChart: FC<PopularityChartProps> = ({ data }) => {
  const [selected, setSelected] = useState<null | number>(null)
  const roundedData = data.map(item => Math.ceil(item.popularity / 10))
  const popCounts: { id: number; count: number }[] = []

  for (let index = 0; index < roundedData.length; index++) {
    const element = roundedData[index]
    const found = popCounts.find(item => item.id === element)
    if (!found) {
      popCounts.push({ id: element, count: 1 })
    } else {
      found.count += 1
    }
  }

  function compare(a: { id: number }, b: { id: number }) {
    let comparison = 0
    if (a.id > b.id) {
      comparison = 1
    } else if (a.id < b.id) {
      comparison = -1
    }
    return comparison
  }

  const highestCount = Math.max(...popCounts.map(item => item.count))
  const lowestCount = Math.min(...popCounts.map(item => item.count))
  const range = [...Array(highestCount - lowestCount).keys()].map(item => item + lowestCount)
  for (let index = 0; index < range.length; index++) {
    const element = range[index]
    const found = popCounts.find(item => item.id === element)
    if (!found) {
      popCounts.push({ id: element, count: 0 })
    }
  }
  return (
    <section>
      <h2>Ratings by popularity</h2>
      <div className="relative flex items-stretch gap-1 w-full h-64 border-b border-blue-500">
        {popCounts.sort(compare).map(item => (
          <div key={item.id} className="flex-1 flex flex-col justify-end items-center group">
            <button
              onClick={() => setSelected(item.id)}
              className="w-2 bg-blue-500"
              style={{ height: (item.count / highestCount) * 100 + '%' }}
            />
            <div className="absolute w-max px-1 border border-black bg-white shadow-lg pointer-events-none invisible group-hover:visible">
              <strong>{item.id * 10}</strong>
              <br />
              {item.count}
            </div>
          </div>
        ))}
      </div>
      <ul>
        {data
          .filter(item => Math.ceil(item.popularity / 10) === selected)
          .map(item => (
            <li key={item.id}>
              {item.original_title}{' '}
              {item.title !== item.original_title && (
                <span className="text-gray-500">({item.title})</span>
              )}
              , {item.popularity}
            </li>
          ))}
      </ul>
    </section>
  )
}
