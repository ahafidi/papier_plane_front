import HelpPage from '@/app/help/page'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

describe('Help Page', () => {
  test('renders the help page title', () => {
    render(<HelpPage />)

    expect(screen.getByRole('heading', { name: /help center/i })).toBeDefined()
  })
})
