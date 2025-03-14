import SignUpPage from '@/app/(auth-layout)/signup/page'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

describe('Sign Up Page', () => {
  test('renders the sign up form', () => {
    render(<SignUpPage />)

    expect(
      screen.getByRole('heading', { name: /create an account/i })
    ).toBeDefined()
  })

  test('renders the email input properly', () => {
    render(<SignUpPage />)

    expect(screen.getByLabelText(/email/i)).toBeDefined()
  })

  test('renders the password input properly', () => {
    render(<SignUpPage />)

    expect(screen.getByLabelText(/password/i)).toBeDefined()
  })

  test('renders the create account button properly', () => {
    render(<SignUpPage />)

    expect(
      screen.getByRole('button', { name: /create account/i })
    ).toBeDefined()
  })

  test('renders the sign in link properly', () => {
    render(<SignUpPage />)

    const signInButton = screen.getByText('Sign in')

    expect(signInButton).toBeDefined()
    expect(signInButton.closest('a')).not.toBeNull()
    expect(signInButton.closest('a')?.getAttribute('href')).toBe('/signin')
  })

  test('renders the sign up button properly', () => {
    render(<SignUpPage />)

    expect(screen.getAllByRole('button')).toHaveLength(1)

    expect(screen.getAllByRole('button').at(0)?.textContent).toMatch(
      /create account/i
    )
  })
})
