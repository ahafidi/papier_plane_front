import { PapierPlaneBrand } from '@/components/papier-plane-brand'
import { buttonVariants } from '@/components/ui/button'
import clsx from 'clsx'
import { Send } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <PapierPlaneBrand />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Write Better Articles, <span className="text-primary">Faster</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            The AI-powered writing assistant designed specifically for
            journalists. Transform your workflow and create compelling stories
            with ease.
          </p>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to Transform Your Writing?
          </h2>
          <Link
            href="/dashboard"
            className={clsx('group', buttonVariants({ variant: 'default' }))}
          >
            Start here
            <Send className="h-7 w-7 transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  )
}
