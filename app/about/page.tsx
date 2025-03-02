import PageContainer from '@/components/page-container'

export default function AboutPage() {
  return (
    <PageContainer>
      <h1 className="mb-8 text-3xl font-bold">About</h1>

      <div className="space-y-6">
        <section>
          <p className="text-lg leading-relaxed">
            papier plane is a powerful web tool designed specifically for
            journalists to streamline their press article writing process. Our
            platform combines modern technology with intuitive design to enhance
            productivity and creativity in journalism.
          </p>
        </section>

        <section>
          <h2>Our Mission</h2>
          <p className="leading-relaxed">
            We aim to empower journalists with tools that make their writing
            process more efficient, allowing them to focus on what matters most
            - creating impactful stories that inform and engage their audience.
          </p>
        </section>
      </div>
    </PageContainer>
  )
}
