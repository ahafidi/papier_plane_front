'use client'

import React, { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type PanelState = {
  id: string
  title: string
  article: string
  conversation: Message[]
  isSelected: boolean
}

export type Message = {
  message: string
  isBot: boolean
}

type PanelContextType = {
  article: string
  conversation: Message[]
  addMessage: (message: Message) => void
  updateArticle: (article: string) => void
  updateTitle: (title: string) => void
  create: (title: string) => void
  removeCurrent: () => void
  list: () => { id: string; title: string; isSelected: boolean }[]
  changeSelection: (id: string) => void
}

const PanelContext = createContext<PanelContextType | undefined>(undefined)

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [panel, setPanel] = useState<PanelState[]>([
    {
      id: uuidv4(),
      title: 'New article',
      article: '',
      conversation: [],
      isSelected: true,
    },
  ])

  const article = panel.find((content) => content.isSelected)?.article ?? ''

  const conversation =
    panel.find((content) => content.isSelected)?.conversation ?? []

  const addMessage = (message: Message) => {
    setPanel((prev) =>
      prev.map((content) =>
        content.isSelected
          ? { ...content, conversation: [...content.conversation, message] }
          : content
      )
    )
  }

  const updateArticle = (article: string) => {
    setPanel((prev) =>
      prev.map((content) => ({
        ...content,
        ...(content.isSelected ? { article } : {}),
      }))
    )
  }

  const updateTitle = (title: string) => {
    setPanel((prev) =>
      prev.map((content) => ({
        ...content,
        ...(content.isSelected ? { title } : {}),
      }))
    )
  }

  const create = (title: string) => {
    setPanel((prev) => [
      ...prev.map((content) => ({ ...content, isSelected: false })),
      { id: uuidv4(), title, article: '', conversation: [], isSelected: true },
    ])
  }

  const removeCurrent = () => {
    if (panel.length === 1) {
      setPanel([
        {
          id: uuidv4(),
          title: 'New article',
          article: '',
          conversation: [],
          isSelected: true,
        },
      ])
    } else {
      setPanel((prev) =>
        prev
          .filter((content) => !content.isSelected)
          .map((content, index) => ({ ...content, isSelected: index === 0 }))
      )
    }
  }

  const list = () => {
    return panel.map(({ id, title, isSelected }) => ({
      id,
      title,
      isSelected,
    }))
  }

  const changeSelection = (id: string) => {
    setPanel((prev) =>
      prev.map((content) => ({ ...content, isSelected: content.id === id }))
    )
  }

  return (
    <PanelContext.Provider
      value={{
        article,
        conversation,
        addMessage,
        updateArticle,
        updateTitle,
        create,
        removeCurrent,
        list,
        changeSelection,
      }}
    >
      {children}
    </PanelContext.Provider>
  )
}

export function usePanel() {
  const context = useContext(PanelContext)
  if (context === undefined) {
    throw new Error('usePanel must be used within an PanelProvider')
  }
  return context
}
