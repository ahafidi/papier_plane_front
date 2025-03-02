import PageContainer from '@/components/page-container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import Link from 'next/link'

export default async function ViewProfilePage({
  params,
}: {
  params: Promise<{ id?: string[] }>
}) {
  const matchedId = (await params).id?.[0] ?? null // get the first id from the params if it exists

  return (
    <PageContainer>
      <div className="flex items-top justify-between">
        <h1 className="mb-8 text-3xl font-bold">
          {matchedId ? `View profile ${matchedId}` : 'My profile'}
        </h1>

        <Link
          className={buttonVariants({
            variant: `${matchedId ? 'destructive' : 'outline'}`,
          })}
          href={`/profile/edit/${matchedId ?? ''}`}
        >
          <Edit className="mr-2 h-4 w-4" />
          {`${matchedId ? 'Admin profile' : 'Edit my profile'}`}
        </Link>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">About Me</h2>
          <p className="text-muted-foreground leading-relaxed">
            Frontend developer with a passion for creating beautiful and
            intuitive user interfaces. I specialize in React and TypeScript, and
            love working on projects that make a difference. When I'm not
            coding, you can find me hiking or reading about new tech trends.
          </p>
        </div>
      </div>
    </PageContainer>
  )
}
