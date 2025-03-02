import PageContainer from '@/components/page-container'

export default function TermsPage() {
  return (
    <PageContainer lastUpdated={new Date().toLocaleDateString()}>
      <h1 className="mb-8 text-3xl font-bold">Terms of Service</h1>

      <div className="space-y-8">
        <section>
          <h2>1. Terms</h2>
          <p className="leading-relaxed">
            By accessing papier plane, you agree to be bound by these terms of
            service and agree that you are responsible for compliance with any
            applicable local laws.
          </p>
        </section>

        <section>
          <h2>2. Use License</h2>
          <p className="leading-relaxed">
            Permission is granted to temporarily download one copy of the
            materials (information or software) on papier plane for personal,
            non-commercial transitory viewing only.
          </p>
        </section>
      </div>
    </PageContainer>
  )
}
