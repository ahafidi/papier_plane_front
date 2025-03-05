'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { usePanel } from '@/contexts/panel-context'
import { Trash2 } from 'lucide-react'

export function DialogRemove() {
  const { removeCurrent } = usePanel()

  const handleRemove = () => {
    removeCurrent()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove article</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this article? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              className="cursor-pointer"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
