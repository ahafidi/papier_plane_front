'use client'

import { Send } from 'lucide-react'
import Link from 'next/link'

export function PapierPlaneBrand() {
  return (
    <Link href="/" className="group flex items-center space-x-2">
      <Send className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45" />
      <span className="font-bold">papier plane</span>
    </Link>
  )
}
