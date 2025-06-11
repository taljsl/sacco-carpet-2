import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$')({
  component: () => {
    // Instead of redirecting, show a proper 404 page
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Page not found</p>
          <a 
            href="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go Home
          </a>
        </div>
      </div>
    )
  },
})