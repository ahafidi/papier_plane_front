import ResetPasswordPage from '@/app/(auth-layout)/reset-password/page'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

describe('Reset Password Page', () => {
  test('renders the reset password form', () => {
    render(<ResetPasswordPage />)

    expect(
      screen.getByRole('heading', { name: /reset password/i })
    ).toBeDefined()
  })

  test('renders the email input properly', () => {
    render(<ResetPasswordPage />)

    expect(screen.getByLabelText(/email/i)).toBeDefined()
  })

  test('renders the reset password button properly', () => {
    render(<ResetPasswordPage />)

    expect(
      screen.getByRole('button', { name: /send reset link/i })
    ).toBeDefined()
  })

  test('renders the sign in link properly', () => {
    render(<ResetPasswordPage />)

    const signInButton = screen.getByText('Sign in')

    expect(signInButton).toBeDefined()
    expect(signInButton.closest('a')).not.toBeNull()
    expect(signInButton.closest('a')?.getAttribute('href')).toBe('/signin')
  })
})
