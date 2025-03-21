import { AuthNav } from '@/components/auth-nav'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

describe('Global Layout', () => {
  test('should render the header properly', () => {
    render(<Header />)

    const brand = screen.getByText('papier plane')
    expect(brand).toBeDefined()
    expect(brand.closest('a')).not.toBeNull()
    expect(brand.closest('a')?.getAttribute('href')).toBe('/')
  })

  test('should render the customer portal properly', () => {
    render(<AuthNav />)

    const loginButton = screen.getByText('Sign In')
    expect(loginButton).toBeDefined()
    expect(loginButton.closest('a')).not.toBeNull()
    expect(loginButton.closest('a')?.getAttribute('href')).toBe('/signin')

    const signupButton = screen.getByText('Sign Up')
    expect(signupButton).toBeDefined()
    expect(signupButton.closest('a')).not.toBeNull()
    expect(signupButton.closest('a')?.getAttribute('href')).toBe('/signup')
  })

  test('should render the footer properly', () => {
    render(<Footer />)

    const about = screen.getByText('About')
    expect(about).toBeDefined()
    expect(about.closest('a')).not.toBeNull()
    expect(about.closest('a')?.getAttribute('href')).toBe('/about')

    const help = screen.getByText('Help')
    expect(help).toBeDefined()
    expect(help.closest('a')).not.toBeNull()
    expect(help.closest('a')?.getAttribute('href')).toBe('/help')

    const terms = screen.getByText('Terms')
    expect(terms).toBeDefined()
    expect(terms.closest('a')).not.toBeNull()
    expect(terms.closest('a')?.getAttribute('href')).toBe('/terms-of-service')

    const privacy = screen.getByText('Privacy')
    expect(privacy).toBeDefined()
    expect(privacy.closest('a')).not.toBeNull()
    expect(privacy.closest('a')?.getAttribute('href')).toBe('/privacy-policy')
  })
})
