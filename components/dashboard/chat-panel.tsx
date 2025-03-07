'use client'

import { usePanel } from '@/contexts/panel-context'
import { useEffect, useRef } from 'react'
import { ChatInput } from './chat-input'
import { ChatMessage } from './chat-message'

export function ChatPanel() {
  const { conversation, addMessage, updateArticle, updateTitle } = usePanel()

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (conversation.length === 0) {
        addMessage({
          message: `Hello ahafidi,

            Welcome! I hope you're doing well.

            Please provide me with some instructions, such as key facts, style guidelines, and context, so I can start drafting your article. =)`,
          isBot: true,
        })
      }
    }, 1000)

    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight
    }

    return () => clearTimeout(timeoutID)
  }, [conversation])

  const scrollableDivRef = useRef<HTMLDivElement>(null)

  return (
    <aside className="h-full flex flex-col p-4">
      <div ref={scrollableDivRef} className="flex-1 space-y-4 overflow-y-auto">
        {conversation.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} isBot={msg.isBot} />
        ))}
      </div>

      <ChatInput />
    </aside>
  )
}
