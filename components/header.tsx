import { AuthNav } from '@/components/auth-nav'
import { PapierPlaneBrand } from './papier-plane-brand'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between mx-10">
        <PapierPlaneBrand />
        <AuthNav />
      </div>
    </header>
  )
}
