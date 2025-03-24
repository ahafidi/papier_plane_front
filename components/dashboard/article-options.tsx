import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePanel } from '@/contexts/panel-context'
import {
  AppWindowIcon,
  CodeIcon,
  LoaderCircle,
  Pin,
  PinOff,
} from 'lucide-react'
import { DialogRemove } from './dialog-remove'
import { DialogShare } from './dialog-share'

export function ArticleOptions({
  activeTab,
  onTabChange,
  isLoading,
}: {
  activeTab: string
  onTabChange: (tab: string) => void
  isLoading: boolean
}) {
  const { isPinned, pin, unpin } = usePanel()

  return (
    <div className="flex justify-between w-full border-b pb-3">
      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        className="select-none flex flex-row items-center gap-2"
      >
        <TabsList>
          <TabsTrigger value="markdown" className="cursor-pointer">
            <CodeIcon />
            Markdown
          </TabsTrigger>
          <TabsTrigger value="preview" className="cursor-pointer">
            <AppWindowIcon />
            Preview
          </TabsTrigger>
        </TabsList>
        {isLoading && <LoaderCircle className="h-6 w-6 animate-spin" />}
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
