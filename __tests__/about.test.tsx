import AboutPage from '@/app/about/page'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

describe('About Page', () => {
  test('renders the about page title', () => {
    render(<AboutPage />)

    expect(screen.getByRole('heading', { name: /about/i })).toBeDefined()
  })
})
