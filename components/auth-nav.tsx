'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import {
  BadgeCheckIcon,
  BellIcon,
  ChevronLeftIcon,
  CreditCardIcon,
  LogIn,
  LogOut,
  UserPlus,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function AuthNav() {
  const pathname = usePathname()
  const isAuthenticated = pathname === '/dashboard'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return isAuthenticated ? (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group h-12 justify-start px-2 md:max-w-[300px] cursor-pointer select-none focus-visible:ring-0 focus-visible:outline-0"
        >
          <Avatar>
            <AvatarImage
              src="https://ahafidi.github.io/assets/profile.png"
              alt="ahafidi"
            />
            <AvatarFallback className="rounded-lg">AH</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">ahafidi</span>
            <span className="text-muted-foreground truncate text-xs">
              ahafidi@example.com
            </span>
          </div>
          <ChevronLeftIcon
            className={cn(
              'text-muted-foreground ml-auto transition-transform duration-500',
              isDropdownOpen && '-rotate-90'
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheckIcon />
            My Account
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <BellIcon />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <nav className="flex items-center gap-3">
      <Button variant="outline" asChild>
        <Link href="/signin">
          <LogIn className="h-4 w-4 mr-1" />
          Sign In
        </Link>
      </Button>
      <Button asChild>
        <Link href="/signup">
          <UserPlus className="h-4 w-4 mr-1" />
          Sign Up
        </Link>
      </Button>
    </nav>
  )
}
