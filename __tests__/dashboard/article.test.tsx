import { ArticleCanvas } from '@/components/dashboard/article-canvas'
import { ArticleOptions } from '@/components/dashboard/article-options'
import { ArticleProvider } from '@/contexts/panel-context'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, test, vi } from 'vitest'

describe('Article', () => {
  test('should render the article tabs properly', () => {
    const onTabChangeMock = vi.fn()

    render(
      <ArticleProvider>
        <ArticleOptions
          activeTab="preview"
          onTabChange={onTabChangeMock}
          isLoading={false}
        />
      </ArticleProvider>
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
        <ArticleProvider>
          <ArticleOptions
            activeTab={activeTab}
            onTabChange={onTabChangeMock.mockImplementation((tab) => {
              setActiveTab(tab)
            })}
            isLoading={false}
          />
        </ArticleProvider>
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

  test('the input typed in the markdown tab should render properly in the preview tab', async () => {
    const user = userEvent.setup()

    render(
      <ArticleProvider>
        <ArticleCanvas />
      </ArticleProvider>
    )

    const markdownTab = screen.getByRole('tab', { name: 'Markdown' })
    const previewTab = screen.getByRole('tab', { name: 'Preview' })

    await user.click(markdownTab)

    const markdownInput = screen.getByTestId('markdown-input')

    const newContent = '> Hello *World!*'
    await user.type(markdownInput, newContent)

    await user.click(previewTab)

    const previewOutput = screen.getByTestId('preview-output')

    expect(previewOutput.textContent).toContain('Hello World!')
    expect(previewOutput.querySelector('blockquote')).not.toBeNull()
    expect(previewOutput.querySelector('em')).not.toBeNull()
  })
})
