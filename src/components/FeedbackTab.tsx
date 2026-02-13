import { useState, useEffect } from 'react'
import { getFeedbackOpen, setFeedbackOpen } from '../lib/storage'
import { MessageSquare, X } from 'lucide-react'

export function FeedbackTab() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsOpen(getFeedbackOpen())
  }, [])

  useEffect(() => {
    if (mounted) setFeedbackOpen(isOpen)
  }, [mounted, isOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 w-10 py-12 bg-primary-700 text-white rounded-l-lg shadow-md hover:bg-primary-800 focus:outline-none flex items-center justify-center"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        aria-label="Open feedback"
      >
        <span className="tracking-widest text-xs font-medium">Feedback</span>
      </button>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Feedback"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary-500" />
                Feedback
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                Share your feedback to help us improve the dashboard.
              </p>
              <textarea
                placeholder="Your feedback..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
                >
                  Send feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
