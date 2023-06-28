import { IconProps } from '@radix-ui/react-icons/dist/types'
import { FC } from 'react'

type ButtonProps = {
  label: string
  onClick: () => void
  icon?: IconProps
}

export const Button = ({ label, onClick, icon }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 border border-white bg-gray-900"
    >
      <>
        {icon}
        <span>{label}</span>
      </>
    </button>
  )
}

type FilterButtonProps = ButtonProps & { isSelected: boolean }

export const FilterButton: FC<FilterButtonProps> = ({ label, onClick, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1 border border-white${
        isSelected ? ' text-gray-900 bg-white' : ' bg-gray-900'
      }`}
    >
      {label}
    </button>
  )
}
