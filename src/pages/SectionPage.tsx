import { Link, useParams, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { FeedbackTab } from '../components/FeedbackTab'

const sectionLabels: Record<string, string> = {
  fit: 'Fit',
  build: 'Build',
  launch: 'Launch',
}

const pageTitles: Record<string, string> = {
  canvas: 'Canvas',
  'problem-map': 'Problem Map',
  'story-map': 'Story Map',
  'goals-metrics': 'Goals & Metrics',
  'product-strategy': 'Product Strategy',
  'planning-board': 'Planning Board',
  'initiative-board': 'Initiative Board',
  roadmap: 'Roadmap',
  'launch-plan': 'Launch Plan',
  'growth-plan': 'Growth Plan',
  'ideas-feedback': 'Ideas & Feedback',
}

export function SectionPage() {
  const { page } = useParams<{ page: string }>()
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const section = pathParts[0]
  const sectionLabel = sectionLabels[section] ?? section
  const pageTitle = page ? pageTitles[page] ?? page : 'Page'

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 lg:px-6 py-8 max-w-4xl mx-auto w-full">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <li>
              <Link to="/" className="hover:text-primary-600">
                Dashboard
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <span className="text-gray-700 font-medium">{sectionLabel}</span>
            </li>
            <li aria-hidden>/</li>
            <li>
              <span className="text-gray-900 font-medium" aria-current="page">
                {pageTitle}
              </span>
            </li>
          </ol>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
        <p className="text-gray-600 mb-6">
          Placeholder for {sectionLabel} &gt; {pageTitle}. Content coming soon.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Back to Dashboard
        </Link>
      </main>
      <FeedbackTab />
    </div>
  )
}
