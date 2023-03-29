import { Dialog } from '@headlessui/react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Dispatch, SetStateAction, ReactNode, FC, useState, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  headline: string
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, headline, children }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollContainer = useRef<HTMLDivElement>(null)

  function handleScroll() {
    let scrollPos = scrollContainer.current?.scrollTop || 0
    if (scrollPos >= 100) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-saturate-0" aria-hidden="true" />
      <div className="fixed inset-0 left-auto p-6">
        <Dialog.Panel className="relative flex flex-col w-128 max-h-full max-w-full border border-white bg-gray-900">
          <div className={`flex justify-between items-center gap-4 px-8 py-4${isScrolled ? ' bg-gray-800' : ''}`}>
            <div className={`font-bold${isScrolled ? '' : ' opacity-0'}`}>{headline}</div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 border border-white bg-gray-900"
            >
              <Cross1Icon />
              Close
            </button>
          </div>
          <div ref={scrollContainer} onScroll={handleScroll} className="p-8 pt-0 overflow-auto">
            {children}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
