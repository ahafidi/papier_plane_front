'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { PaperclipIcon, Send } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export function ChatInput({
  onMessageReceived,
  onMessageSubmitted,
}: {
  onMessageReceived: (message: string, title: string, article: string) => void
  onMessageSubmitted: (message: string) => void
}) {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const eventSourceRef = useRef<EventSource | null>(null)
  const accumulatedResponseRef = useRef('')

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }
    }
  }, [])

  const submitMessage = useCallback(() => {
    if (!message.trim()) return

    onMessageSubmitted(message)
    setMessage('')

    try {
      setIsLoading(true)

      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }

      const eventSource = new EventSource(
        `http://localhost:8000/ai?prompt=${encodeURIComponent(message)}`,
        {
          withCredentials: true,
        }
      )
      eventSourceRef.current = eventSource

      accumulatedResponseRef.current = ''

      eventSource.onopen = (event) => {
        console.log('SSE connection opened:', event)
      }

      eventSource.addEventListener('message', (event) => {
        try {
          if (event.data === '\\n') {
            accumulatedResponseRef.current += '\n'
          } else {
            accumulatedResponseRef.current += event.data
          }
        } catch (error) {
          console.error('Error parsing (sse.onmessage):', error)
          toast.error('Error processing response')
          eventSource.close()
          setIsLoading(false)
        }
      })

      eventSource.addEventListener('done', (event) => {
        console.log('Stream ended event received:', event)
        try {
          const { message, title, article } = JSON.parse(
            accumulatedResponseRef.current
          )

          accumulatedResponseRef.current = ''

          onMessageReceived(
            message?.trim() ?? '',
            title?.trim() ?? '',
            article?.trim() ?? ''
          )
        } catch (error) {
          console.error('Error parsing SSE done event:', error)
          toast.error('Error processing response')
        }
        eventSource.close()
        eventSourceRef.current = null
        setIsLoading(false)
      })

      eventSource.onerror = (err) => {
        console.log('EventSource error:', err)
        console.log('ReadyState:', eventSource.readyState)

        if (eventSource.readyState === EventSource.CLOSED) {
          console.log('Connection was closed')
        } else if (eventSource.readyState === EventSource.CONNECTING) {
          console.log('Attempting to reconnect')
        }

        toast.error('Connection error - please try again')
        setIsLoading(false)
        eventSource.close()
        eventSourceRef.current = null
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message')
      setIsLoading(false)
    }
  }, [message, onMessageReceived, onMessageSubmitted])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'Enter') {
        event.preventDefault()
        submitMessage()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [message, submitMessage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitMessage()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-t py-3 mt-3">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="h-20 resize-none border-none shadow-none focus-visible:ring-0"
          rows={5}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="cursor-pointer select-none"
          disabled
        >
          <PaperclipIcon className="h-4 w-4" />
        </Button>
        <Button
          className="group cursor-pointer select-none"
          type="submit"
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? 'Sending...' : 'Send'}
          <Send className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-45 " />
        </Button>
      </div>
    </form>
  )
}
