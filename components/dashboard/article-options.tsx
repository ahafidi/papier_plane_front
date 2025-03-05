import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePanel } from '@/contexts/panel-context'
import { AppWindowIcon, CodeIcon, Pin, PinOff } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogRemove } from './dialog-remove'
import { DialogShare } from './dialog-share'

export function ArticleOptions() {
  const { isPinned, pin, unpin } = usePanel()

  return (
    <div className="flex justify-between w-full border-b pb-3">
      <Tabs defaultValue="preview" className="select-none">
        <TabsList>
          <TabsTrigger value="code" disabled>
            <CodeIcon />
            Markdown
          </TabsTrigger>
          <TabsTrigger value="preview">
            <AppWindowIcon />
            Preview
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-2">
        <DialogShare />

        <DialogRemove />

        {isPinned ? (
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => unpin()}
          >
            <PinOff />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => pin()}
          >
            <Pin />
          </Button>
        )}
      </div>
    </div>
  )
}
