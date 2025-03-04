import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePanel } from '@/contexts/panel-context'
import {
  AppWindowIcon,
  CodeIcon,
  SettingsIcon,
  ShareIcon,
  TrashIcon,
} from 'lucide-react'
import { Button } from '../ui/button'

export function ArticleOptions() {
  const { removeCurrent } = usePanel()
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
        <Button variant="secondary">
          <ShareIcon className="h-4 w-4" />
        </Button>

        <Button variant="destructive" onClick={removeCurrent}>
          <TrashIcon className="h-4 w-4" />
        </Button>

        <Button variant="outline">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
