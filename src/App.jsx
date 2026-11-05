import { useState } from 'react'
import { SubmissionsProvider } from './context/SubmissionsContext'
import BrokerPortal from './pages/BrokerPortal'
import ReviewerPortal from './pages/ReviewerPortal'

export default function App() {
  const [activePage, setActivePage] = useState('broker')

  return (
    <SubmissionsProvider>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        {/* Top Header & Navigation */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Facio Insurance Workflow</h1>
              <p className="text-xs text-slate-500">Broker Intake & Underwriting Portal</p>
            </div>
            <nav className="flex gap-2">
              <button
                onClick={() => setActivePage('broker')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activePage === 'broker' 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Page 1: Broker Portal
              </button>
              <button
                onClick={() => setActivePage('reviewer')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activePage === 'reviewer' 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Page 2: Small Business Reviewer Team
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          {activePage === 'broker' ? <BrokerPortal /> : <ReviewerPortal />}
        </main>
      </div>
    </SubmissionsProvider>
  )
}