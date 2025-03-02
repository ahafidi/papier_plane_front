'use client'

import { useArticle } from '@/contexts/article-context'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { ChatInput } from './chat-input'
import { ChatMessage } from './chat-message'

interface Message {
  message: string
  isBot: boolean
}

export function ChatPanel() {
  const scrollableDivRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const { setArticle } = useArticle()

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setMessages([
        {
          message: `Hello ahafidi,

            Welcome! I hope you're doing well.

            Please provide me with some instructions, such as key facts, style guidelines, and context, so I can start drafting your article. =)`,
          isBot: true,
        },
      ])
    }, 1000)

    return () => clearTimeout(timeoutID)
  }, [])

  const handleMessageReceived = (message: string, article: string) => {
    setMessages((prev) => [...prev, { message, isBot: true }])
    toast.info('New message from the bot!')

    // Update the article in the context if it's not empty
    if (article) {
      setArticle(article)
      toast.success('Article updated!')
    }
  }

  const handleSubmitMessage = (userMessage: string) => {
    setMessages((prev) => [...prev, { message: userMessage, isBot: false }])
    toast.info('Message sent!')
  }

  return (
    <aside className="h-full flex flex-col p-4">
      <div ref={scrollableDivRef} className="flex-1 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} isBot={msg.isBot} />
        ))}
      </div>

      <ChatInput
        onMessageReceived={handleMessageReceived}
        onMessageSubmitted={handleSubmitMessage}
      />
    </aside>
  )
}
