import PrivacyPage from '@/app/privacy-policy/page'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

describe('Privacy Policy Page', () => {
  test('renders the privacy policy title', () => {
    render(<PrivacyPage />)

    expect(
      screen.getByRole('heading', { name: /privacy policy/i })
    ).toBeDefined()
  })
})
