'use client'

import { ArticleCanvas } from '@/components/dashboard/article-canvas'
import { ChatPanel } from '@/components/dashboard/chat-panel'
import { Sidebar } from '@/components/dashboard/sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ArticleProvider } from '@/contexts/article-context'

export default function DashboardPage() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border backdrop-blur-xs"
    >
      <ArticleProvider>
        <ResizablePanel defaultSize={20} collapsible minSize={15} maxSize={25}>
          <Sidebar />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50} minSize={30} maxSize={100}>
          <ArticleCanvas />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={30} collapsible minSize={20} maxSize={50}>
          <ChatPanel />
        </ResizablePanel>
      </ArticleProvider>
    </ResizablePanelGroup>
  )
}
