import { ArticleOptions } from '@/components/dashboard/article-options'
import { usePanel } from '@/contexts/panel-context'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, test, vi } from 'vitest'

vi.mock('@/contexts/panel-context', () => ({
  usePanel: vi.fn(),
}))

vi.mocked(usePanel).mockReturnValue({
  id: '2',
  article: 'target article content',
  conversation: [],
  isPinned: false,
  isLoading: false,
  list: [
    {
      id: '1',
      title: 'test title',
      isSelected: false,
      isPinned: false,
      isLoading: false,
    },
    {
      id: '2',
      title: 'target article',
      isSelected: true,
      isPinned: false,
      isLoading: false,
    },
    {
      id: '3',
      title: 'pinned article',
      isSelected: false,
      isPinned: true,
      isLoading: false,
    },
  ],
  addMessage: vi.fn(),
  updateLastMessage: vi.fn(),
  updateArticle: vi.fn(),
  updateTitle: vi.fn(),
  create: vi.fn(),
  removeCurrent: vi.fn(),
  pin: vi.fn(),
  unpin: vi.fn(),
  changeSelection: vi.fn(),
  setIsLoading: vi.fn(),
})

describe('Article', () => {
  test('should render the article tabs properly', () => {
    const onTabChangeMock = vi.fn()

    render(
      <ArticleOptions
        activeTab="preview"
        onTabChange={onTabChangeMock}
        isLoading={false}
      />
    )

    const markdownTab = screen.getByRole('tab', { name: 'Markdown' })
    const previewTab = screen.getByRole('tab', { name: 'Preview' })

    expect(markdownTab).toBeDefined()
    expect(previewTab).toBeDefined()

    expect(previewTab.getAttribute('aria-selected')).toBe('true')
    expect(markdownTab.getAttribute('aria-selected')).toBe('false')

    expect(onTabChangeMock).not.toHaveBeenCalled()
  })

  test('should change the tab when the user clicks on it', async () => {
    const user = userEvent.setup()

    const onTabChangeMock = vi.fn()

    const TestComponent = () => {
      const [activeTab, setActiveTab] = useState('preview')

      return (
        <ArticleOptions
          activeTab={activeTab}
          onTabChange={onTabChangeMock.mockImplementation((tab) => {
            setActiveTab(tab)
          })}
          isLoading={false}
        />
      )
    }

    render(<TestComponent />)

    const markdownTab = screen.getByRole('tab', { name: 'Markdown' })
    const previewTab = screen.getByRole('tab', { name: 'Preview' })

    expect(previewTab.getAttribute('aria-selected')).toBe('true')
    expect(markdownTab.getAttribute('aria-selected')).toBe('false')

    await user.click(markdownTab)

    expect(onTabChangeMock).toHaveBeenCalledWith('markdown')

    expect(previewTab.getAttribute('aria-selected')).toBe('false')
    expect(markdownTab.getAttribute('aria-selected')).toBe('true')
  })
})
