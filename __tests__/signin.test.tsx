import SignInPage from '@/app/(auth-layout)/signin/page'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

describe('Sign In Page', () => {
  test('renders the sign in form', () => {
    render(<SignInPage />)

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeDefined()
  })

  test('renders the email input properly', () => {
    render(<SignInPage />)

    expect(screen.getByLabelText(/email/i)).toBeDefined()
  })

  test('renders the password input properly', () => {
    render(<SignInPage />)

    expect(screen.getByLabelText(/password/i)).toBeDefined()
  })

  test('renders all the sign in buttons properly', () => {
    render(<SignInPage />)

    expect(screen.getAllByRole('button')).toHaveLength(4)

    expect(screen.getAllByRole('button').at(0)?.textContent).toMatch(/login/i)
    expect(screen.getAllByRole('button').at(1)?.textContent).toMatch(
      /login with apple/i
    )
    expect(screen.getAllByRole('button').at(2)?.textContent).toMatch(
      /login with google/i
    )
    expect(screen.getAllByRole('button').at(3)?.textContent).toMatch(
      /login with meta/i
    )
  })
})
