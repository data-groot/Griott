import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { FeedbackTab } from '../components/FeedbackTab'

export function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 lg:px-6 py-8 max-w-4xl mx-auto w-full">
        <h1 className="text-display font-bold text-gray-900">How it works</h1>
        <p className="text-gray-600 mb-6">
          Placeholder for the How it works page. Content coming soon.
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
