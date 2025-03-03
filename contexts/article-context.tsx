'use client'

import React, { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Article {
  id: string
  title: string
  content: string
  isSelected: boolean
}

type ArticleContextType = {
  content: string
  update: (content: string) => void
  create: (title: string) => void
  removeCurrent: () => void
  list: () => { id: string; title: string; isSelected: boolean }[]
  changeSelection: (id: string) => void
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined)

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([
    { id: uuidv4(), title: 'New article', content: '', isSelected: true },
  ])

  const content = articles.find((article) => article.isSelected)?.content ?? ''

  const update = (content: string) => {
    setArticles((prev) =>
      prev.map((article) => ({
        ...article,
        ...(article.isSelected ? { content } : {}),
      }))
    )
  }

  const create = (title: string) => {
    setArticles((prev) => [
      ...prev.map((article) => ({ ...article, isSelected: false })),
      { id: uuidv4(), title, content: '', isSelected: true },
    ])
  }

  const removeCurrent = () => {
    if (articles.length === 1) {
      setArticles([
        { id: uuidv4(), title: 'New article', content: '', isSelected: true },
      ])
    } else {
      setArticles((prev) =>
        prev
          .filter((article) => !article.isSelected)
          .map((article, index) => ({ ...article, isSelected: index === 0 }))
      )
    }
  }

  const list = () => {
    return articles.map(({ id, title, isSelected }) => ({
      id,
      title,
      isSelected,
    }))
  }

  const changeSelection = (id: string) => {
    setArticles((prev) =>
      prev.map((article) => ({ ...article, isSelected: article.id === id }))
    )
  }

  return (
    <ArticleContext.Provider
      value={{
        content,
        update,
        create,
        removeCurrent,
        list,
        changeSelection,
      }}
    >
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
