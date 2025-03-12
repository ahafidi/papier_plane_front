import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import Home from '../app/page'

describe('Home page', () => {
  test('renders the main heading', () => {
    render(<Home />)
    expect(screen.getByText(/Write Better Articles/)).toBeDefined()
  })

  test('renders a "Start here" call-to-action button', () => {
    render(<Home />)
    const ctaButtons = screen.getAllByText('Start here')
    expect(ctaButtons.length).toBeGreaterThan(0)
    const ctaButton = ctaButtons[0]
    expect(ctaButton).toBeDefined()
    expect(ctaButton.closest('a')).not.toBeNull()
    expect(ctaButton.closest('a')?.getAttribute('href')).toBe('/dashboard')
  })
})
