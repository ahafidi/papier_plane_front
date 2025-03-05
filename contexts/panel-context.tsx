'use client'

import React, { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type PanelState = {
  id: string
  title: string
  article: string
  conversation: Message[]
  isSelected: boolean
  isPinned: boolean
}

export type Message = {
  message: string
  isBot: boolean
}

type PanelContextType = {
  id: string
  article: string
  conversation: Message[]
  isPinned: boolean
  addMessage: (message: Message) => void
  updateArticle: (article: string) => void
  updateTitle: (title: string) => void
  create: (title: string) => void
  removeCurrent: () => void
  list: () => {
    id: string
    title: string
    isSelected: boolean
    isPinned: boolean
  }[]
  pin: () => void
  unpin: () => void
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
      isPinned: false,
    },
  ])

  const id = panel.find(({ isSelected }) => isSelected)?.id ?? ''

  const article = panel.find((content) => content.isSelected)?.article ?? ''

  const conversation =
    panel.find((content) => content.isSelected)?.conversation ?? []

  const isPinned = panel.find(({ isSelected }) => isSelected)?.isPinned ?? false

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
      {
        id: uuidv4(),
        title,
        article: '',
        conversation: [],
        isSelected: true,
        isPinned: false,
      },
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
          isPinned: false,
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
    return panel.map(({ id, title, isSelected, isPinned }) => ({
      id,
      title,
      isSelected,
      isPinned,
    }))
  }

  const pin = () => {
    setPanel((prev) =>
      prev.map((content) => ({
        ...content,
        ...(content.id === id ? { isPinned: true } : {}),
      }))
    )
  }

  const unpin = () => {
    setPanel((prev) =>
      prev.map((content) => ({
        ...content,
        ...(content.id === id ? { isPinned: false } : {}),
      }))
    )
  }

  const changeSelection = (id: string) => {
    setPanel((prev) =>
      prev.map((content) => ({ ...content, isSelected: content.id === id }))
    )
  }

  return (
    <PanelContext.Provider
      value={{
        id,
        article,
        conversation,
        isPinned,
        addMessage,
        updateArticle,
        updateTitle,
        create,
        removeCurrent,
        list,
        pin,
        unpin,
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
