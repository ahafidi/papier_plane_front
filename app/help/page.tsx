import PageContainer from '@/components/page-container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function HelpPage() {
  return (
    <PageContainer>
      <h1 className="mb-8 text-3xl font-bold">Help Center</h1>

      <div className="space-y-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="getting-started">
            <AccordionTrigger>Getting Started</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create an account or sign in</li>
                <li>Navigate to the dashboard</li>
                <li>Create your first article</li>
                <li>Use the AI assistant for help</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="create-article">
            <AccordionTrigger>How do I create a new article?</AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed">
                Click the plus button in the dashboard to create a new article.
                You can then start writing in the editor. The editor supports
                markdown formatting and you can preview your article before
                publishing.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ai-assistant">
            <AccordionTrigger>How does the AI assistant work?</AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed">
                Our AI assistant helps you write and edit articles. Simply click
                the AI helper button while editing an article to get
                suggestions, help with grammar, or generate new content ideas.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="account-settings">
            <AccordionTrigger>
              How do I manage my account settings?
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed">
                Access your account settings by clicking your profile picture in
                the top right corner. Here you can update your profile
                information, change your password, and manage notification
                preferences.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="collaboration">
            <AccordionTrigger>Can I collaborate with others?</AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed">
                Yes! You can invite team members to collaborate on articles.
                Share your article with specific users or create a team
                workspace where multiple people can contribute and edit content
                together.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="export">
            <AccordionTrigger>Can I export my articles?</AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed">
                Yes, you can export your articles in various formats including
                PDF, Markdown, and HTML. Go to the article settings menu and
                select the export option to choose your preferred format.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </PageContainer>
  )
}
