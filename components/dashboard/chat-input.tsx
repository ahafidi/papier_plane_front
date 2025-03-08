'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { usePanel } from '@/contexts/panel-context'
import { LoaderCircle, PaperclipIcon, Send } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export function ChatInput() {
  const {
    addMessage,
    updateArticle,
    updateTitle,
    streamChunkMessage,
    isLoading,
    setIsLoading,
  } = usePanel()

  const [message, setMessage] = useState('')
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

    addMessage({ message, isBot: false })
    addMessage({ message: '', isBot: true })

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
            if (accumulatedResponseRef.current.length > 16) {
              streamChunkMessage(accumulatedResponseRef.current)
            }
          } else {
            accumulatedResponseRef.current += event.data
            if (accumulatedResponseRef.current.length > 16) {
              streamChunkMessage(event.data)
            }
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
          const { title, article } = JSON.parse(accumulatedResponseRef.current)

          accumulatedResponseRef.current = ''

          toast.info('New message from the bot!')

          if (article !== '') {
            updateArticle(article)
            toast.success('Article updated!')
          }

          if (title !== '') {
            updateTitle(title)
            toast.success('Title updated!')
          }
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
  }, [message])

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
          {isLoading ? (
            <>
              Response loading...
              <LoaderCircle className="h-6 w-6 animate-spin" />
            </>
          ) : (
            <>
              Send
              <Send className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-45 " />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
