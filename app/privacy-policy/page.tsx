import PageContainer from '@/components/page-container'

export default function PrivacyPage() {
  return (
    <PageContainer lastUpdated={new Date().toLocaleDateString()}>
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">Cookie Usage</h2>
          <p className="leading-relaxed">
            We use essential cookies that are necessary for our website to
            function properly. These cookies enable basic features like secure
            login and remembering your preferences. By using our website, you
            consent to these essential cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Data Collection</h2>
          <p className="leading-relaxed">
            We collect minimal information required to provide our services:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Account information when you register</li>
            <li>Usage data to improve our services</li>
            <li>Support-related communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How We Use Your Data</h2>
          <p className="leading-relaxed">
            Your data is used solely to provide and improve our services, and to
            ensure website security and functionality. We do not sell or share
            your personal information with third parties.
          </p>
        </section>
      </div>
    </PageContainer>
  )
}
