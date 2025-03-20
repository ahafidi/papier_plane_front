import { Sidebar } from '@/components/dashboard/sidebar'
import { usePanel } from '@/contexts/panel-context'
import { fireEvent, render, screen } from '@testing-library/react'
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

describe('Dashboard Sidebar', () => {
  test('should render the dashboard sidebar properly', () => {
    render(<Sidebar />)

    expect(screen.getByText('Start a new article')).toBeDefined()
    expect(screen.getByPlaceholderText('Search articles...')).toBeDefined()

    const articles = screen.getAllByTestId(/^unpinned-article-\d+$/)
    expect(articles).toHaveLength(2)
    expect(articles[0].textContent).toBe('test title')
    expect(articles[0].getAttribute('data-testid')).toBe('unpinned-article-1')

    expect(articles[1].textContent).toBe('target article')
    expect(articles[1].getAttribute('data-testid')).toBe('unpinned-article-2')
  })

  test('should display the selected article', () => {
    render(<Sidebar />)

    const selectedArticle = screen.getByTestId('unpinned-article-2')
    expect(selectedArticle).toBeDefined()
    expect(selectedArticle.textContent).toBe('target article')
    expect(selectedArticle.getAttribute('class')).toContain('bg-secondary') // secondary variant
  })

  test('should display the target article when searching', () => {
    render(<Sidebar />)

    const searchInput = screen.getByPlaceholderText('Search articles...')
    fireEvent.change(searchInput, { target: { value: 'target article' } })

    const articles = screen.getAllByTestId(/^unpinned-article-\d+$/)
    expect(articles).toHaveLength(1)
    expect(articles[0].textContent).toBe('target article')
    expect(articles[0].getAttribute('data-testid')).toBe('unpinned-article-2')
  })

  test('should display the pinned article at first', () => {
    render(<Sidebar />)

    const articles = screen.getAllByTestId(/^pinned-article-\d+$/)
    expect(articles).toHaveLength(1)
    expect(articles[0].textContent).toBe('pinned article')
    expect(articles[0].getAttribute('data-testid')).toBe('pinned-article-3')
  })

  test('should create a new article when the user clicks on the "Start a new article" button', () => {
    render(<Sidebar />)

    const newArticleButton = screen.getByText('Start a new article')
    fireEvent.click(newArticleButton)

    expect(usePanel().create).toHaveBeenCalledWith('New article')
  })
})
