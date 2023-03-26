import { Dialog } from '@headlessui/react'
import { Dispatch, SetStateAction, ReactNode, FC } from 'react'

interface ModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, children }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-saturate-0" aria-hidden="true" />
      <div className="fixed inset-0 left-auto p-6 overflow-auto">
        <Dialog.Panel className="w-96 max-w-full p-8 bg-gray-80">{children}</Dialog.Panel>
      </div>
    </Dialog>
  )
}
