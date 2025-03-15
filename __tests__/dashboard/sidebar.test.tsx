import { Sidebar } from '@/components/dashboard/sidebar'
import { usePanel } from '@/contexts/panel-context'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

vi.mock('@/contexts/panel-context', () => ({
  usePanel: vi.fn(),
}))

vi.mocked(usePanel).mockReturnValue({
  id: '',
  article: '',
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
      isSelected: false,
      isPinned: false,
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

describe('Dashboard Sidebar', () => {
  test('should render the dashboard sidebar properly', () => {
    render(<Sidebar />)

    expect(screen.getByText('Start a new article')).toBeDefined()
    expect(screen.getByPlaceholderText('Search articles...')).toBeDefined()
    expect(screen.getByText('test title')).toBeDefined()

    const articles = screen.getAllByTestId(/unpinned-article-\d+/)
    expect(articles).toHaveLength(2)
    expect(articles[0].textContent).toBe('test title')
    expect(articles[1].textContent).toBe('target article')
  })

  test('should display the target article', () => {
    render(<Sidebar />)

    const searchInput = screen.getByPlaceholderText('Search articles...')
    fireEvent.change(searchInput, { target: { value: 'target article' } })

    const articles = screen.getAllByTestId(/unpinned-article-\d+/)
    expect(articles).toHaveLength(1)
    expect(articles[0].textContent).toBe('target article')
  })
})
