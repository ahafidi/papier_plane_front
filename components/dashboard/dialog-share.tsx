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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePanel } from '@/contexts/panel-context'
import { Check, Copy, Download, ShareIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function DialogShare() {
  const pathname = usePathname()
  const { id, article } = usePanel()

  const [copied, setCopied] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState<'markdown' | 'pdf'>(
    'markdown'
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = () => {
    const shareUrl =
      typeof window !== 'undefined'
        ? `${window.location.protocol}//${window.location.host}/share/${id.split('-').join('')}`
        : ''

    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
  }

  const handleDownload = () => {
    const fileName = `article-${id}.${downloadFormat === 'pdf' ? 'pdf' : 'md'}`

    const blob = new Blob([article], {
      type: downloadFormat === 'pdf' ? 'application/pdf' : 'text/markdown',
    })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="cursor-pointer">
          <ShareIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center">
          <div className="grid flex-1 gap-2 w-full">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <div className="relative w-full">
              <Input
                id="link-share"
                className="pr-10"
                defaultValue={
                  typeof window !== 'undefined'
                    ? `${window.location.protocol}//${window.location.host}/share/${id.split('-').join('')}`
                    : ''
                }
                readOnly
              />
              <Button
                type="button"
                size="sm"
                className={`absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 cursor-pointer`}
                onClick={handleCopy}
              >
                <span className="sr-only">{copied ? 'Copied' : 'Copy'}</span>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with download options
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Select
            defaultValue="markdown"
            onValueChange={(value) =>
              setDownloadFormat(value as 'markdown' | 'pdf')
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="markdown">Markdown</SelectItem>
              <SelectItem value="pdf" disabled>
                PDF
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleDownload}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>

        <DialogFooter className="justify-end mt-5">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
