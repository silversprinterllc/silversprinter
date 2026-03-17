'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-[#1a1612] border border-[#433d38] p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            {title && (
              <Dialog.Title className="font-serif text-xl text-[#f0e6d0]">{title}</Dialog.Title>
            )}
            <Dialog.Close asChild>
              <button className="ml-auto text-[#5f5850] hover:text-[#f0e6d0] transition-colors">
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
