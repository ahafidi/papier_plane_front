'use client'

import { Send } from 'lucide-react'
import Link from 'next/link'

export function PapierPlaneBrand() {
  return (
    <Link href="/" className="group flex items-center space-x-1">
      <Send className="h-6 w-6 transition-transform duration-400 group-hover:rotate-45 text-blue-400" />
      <span className="tracking-tighter text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-gray-900 dark:from-blue-400 dark:via-indigo-400 dark:to-gray-100 bg-clip-text text-transparent">
        papier plane
      </span>
    </Link>
  )
}
