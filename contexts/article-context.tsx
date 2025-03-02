'use client'

import React, { createContext, useContext, useState } from 'react'

type ArticleContextType = {
  article: string
  setArticle: (article: string) => void
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined)

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [article, setArticle] = useState<string>('')

  return (
    <ArticleContext.Provider value={{ article, setArticle }}>
      {children}
    </ArticleContext.Provider>
  )
}

export function useArticle() {
  const context = useContext(ArticleContext)
  if (context === undefined) {
    throw new Error('useArticle must be used within an ArticleProvider')
  }
  return context
}
