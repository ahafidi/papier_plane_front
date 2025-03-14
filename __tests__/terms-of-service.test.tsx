import TermsPage from '@/app/terms-of-service/page'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

describe('Terms of Service Page', () => {
  test('renders the terms of service title', () => {
    render(<TermsPage />)

    expect(
      screen.getByRole('heading', { name: /terms of service/i })
    ).toBeDefined()
  })
})
