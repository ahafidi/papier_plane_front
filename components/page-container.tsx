import { Card } from '@/components/ui/card'

interface PageContainerProps {
  children: React.ReactNode
  lastUpdated?: string
}

export default function PageContainer({
  children,
  lastUpdated,
}: PageContainerProps) {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 prose dark:prose-invert">
          {children}
          {lastUpdated && (
            <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
