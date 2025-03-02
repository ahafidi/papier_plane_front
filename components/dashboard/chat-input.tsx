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
  onMessageReceived: (message: string, article: string) => void
  onMessageSubmitted: (message: string) => void
}) {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const eventSourceRef = useRef<EventSource | null>(null)
  const accumulatedResponseRef = useRef('')

  const numberChunkRef = useRef(0)

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

      // Close any existing EventSource
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

      // Reset accumulated response for new conversation
      accumulatedResponseRef.current = ''
      numberChunkRef.current = 0

      // Register event handlers before assigning to ref to avoid race conditions
      eventSource.onopen = (event) => {
        console.log('SSE connection opened:', event)
        toast.success('SSE connection opened')
      }

      eventSource.addEventListener('message', (event) => {
        try {
          numberChunkRef.current += 1

          if (event.data === '\\n') {
            accumulatedResponseRef.current += '\n'
          } else {
            accumulatedResponseRef.current += event.data
          }

          if (!event.data) {
            console.log(`Received empty data chunk #${numberChunkRef.current}`)
            console.log(event)
          }
        } catch (error) {
          console.error('Error parsing SSE message:', error)
          toast.error('Error processing response (sse.onmessage)')
          eventSource.close()
          setIsLoading(false)
        }
      })

      eventSource.addEventListener('update', (event) => {
        console.log('update event received:', event)
        toast.info('update event received')
      })

      eventSource.addEventListener('done', (event) => {
        console.log('Stream ended event received:', event)
        try {
          // console.log(accumulatedResponseRef.current)

          const [message, article] = accumulatedResponseRef.current.split('---')
          accumulatedResponseRef.current = ''
          onMessageReceived(message?.trim() ?? '', article?.trim() ?? '')
        } catch (error) {
          console.error('Error parsing SSE message:', error)
          toast.error('Error processing response (sse.onmessage)')
        }
        eventSource.close()
        setIsLoading(false)
      })

      eventSource.onerror = (err) => {
        console.log('eventSource.onerror')
        console.log('EventSource error:', err)
        console.log('ReadyState:', eventSource.readyState)

        if (eventSource.readyState === EventSource.CLOSED) {
          console.log('Connection was closed')
        } else if (eventSource.readyState === EventSource.CONNECTING) {
          console.log('Attempting to reconnect')
        }

        toast.error('Connection error - please try again (sse.onerror)')
        setIsLoading(false)
        eventSource.close()
        eventSourceRef.current = null
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message (catch)')
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
          disabled={
            isLoading || !message.trim() /* check if the message is not empty */
          }
        >
          {isLoading ? 'Sending...' : 'Send'}
          <Send className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-45 " />
        </Button>
      </div>
    </form>
  )
}
