import EditProfileForm from '@/components/edit-profile-form'
import PageContainer from '@/components/page-container'
import { cn } from '@/lib/utils'
export default async function EditProfilePage({
  params,
}: {
  params: Promise<{ id?: string[] }>
}) {
  const matchedId = (await params).id?.[0] ?? null // get the first id from the params if it exists

  return (
    <PageContainer>
      <h1
        className={cn('mb-8 text-3xl font-bold', matchedId && 'text-red-500')}
      >
        {matchedId ? `Admin profile ${matchedId}` : 'Edit my profile'}
      </h1>

      <EditProfileForm />
    </PageContainer>
  )
}
