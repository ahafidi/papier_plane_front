/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { usePanel } from '@/contexts/panel-context'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
// import remarkBreaks from 'remark-breaks'
import { Skeleton } from '@/components/ui/skeleton'
import remarkGfm from 'remark-gfm'
import { ArticleOptions } from './article-options'

export function ArticleCanvas() {
  const { article, isLoading } = usePanel()

  const [isClient, setIsClient] = useState(false)

  // Handle hydration issues by ensuring we only render on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <main className="h-full flex flex-col p-4">
      <ArticleOptions />

      <div className="flex-1 overflow-y-auto mt-3">
        {isClient && article ? (
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="scroll-m-20 text-2xl font-semibold tracking-tight"
                    {...props}
                  />
                ),
                h4: ({ node, ...props }) => (
                  <h4
                    className="scroll-m-20 text-xl font-semibold tracking-tight"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="leading-7 [&:not(:first-child)]:mt-6"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
                ),
                ol: ({ node, ...props }) => <ol {...props} />,
                li: ({ node, ...props }) => <li {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="mt-6 border-l-2 pl-6 italic"
                    {...props}
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
                    {...props}
                  />
                ),
                // TODO: table
              }}
            >
              {article}
            </ReactMarkdown>
          </article>
        ) : (
          <>
            {!isLoading ? (
              <div className="text-center text-gray-500 mt-10">
                No article content yet. Start a conversation to generate an
                article.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Skeleton className="w-1/2 h-10" />
                <Skeleton className="w-full h-30" />
                <Skeleton className="w-3/4 h-10" />
                <Skeleton className="w-full h-15" />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
