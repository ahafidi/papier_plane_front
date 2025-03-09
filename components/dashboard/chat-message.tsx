import { Skeleton } from '@/components/ui/skeleton'
import { Bot, User } from 'lucide-react'
interface ChatMessageProps {
  message: string
  isBot?: boolean
}

export function ChatMessage({ message, isBot = false }: ChatMessageProps) {
  const formattedMessage = message.replace(/\n/g, '<br />')
  return (
    <div
      className={`flex items-start gap-2 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div
        className={`min-w-8 min-h-8 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'border' : 'bg-primary text-primary-foreground'
        }`}
      >
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>

      <div
        className={`flex flex-col gap-2 rounded-lg p-4 w-full ${isBot ? 'bg-primary/10' : 'bg-muted'}`}
      >
        {formattedMessage === '' && <Skeleton className="w-30 h-5" />}
        <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />
      </div>
    </div>
  )
}
