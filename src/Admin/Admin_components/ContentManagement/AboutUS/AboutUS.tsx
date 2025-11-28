import { useState } from 'react'
import WorksCollection from '../WorksCollection/WorksCollection'
import AdminFAQ from '../AdminFAQs/AdminFAQ'
import AboutUsTab from './index'

type Tab = 'works' | 'about' | 'faq'

const TABS: { id: Tab; label: string }[] = [
  { id: 'works', label: 'Works Collection' },
  { id: 'about', label: 'About Us' },
  { id: 'faq', label: 'FAQs' },
]

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState<Tab>('works')

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          Content Management
        </h1>
      </header>

      {/* Tab Navigation */}
      <div className="inline-flex rounded-full p-1 space-x-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`group px-4 py-2 mb-3 text-xs font-semibold uppercase tracking-wide rounded-md 
                        transition-all duration-200 ease-in-out
                        ${activeTab === tab.id
                          ? 'bg-[#E2E2E2] text-[#291471] shadow-md scale-105'
                          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200 hover:scale-105 active:scale-95'
                        }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'works' && (
          <div className="space-y-6">
            <WorksCollection />
          </div>
        )}

        {activeTab === 'about' && <AboutUsTab />}
        {activeTab === 'faq' && <AdminFAQ />}
      </div>
    </section>
  )
}