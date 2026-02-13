import { useState } from 'react'
import { Header } from '../components/Header'
import { FeedbackTab } from '../components/FeedbackTab'
import { getUserProfile, setUserProfile } from '../lib/storage'
import { Pencil, Hexagon } from 'lucide-react'

const tabs = [
  { id: 'profile', label: 'My Profile' },
  { id: 'company', label: 'Company' },
  { id: 'workspaces', label: 'Workspaces' },
  { id: 'billing', label: 'Billing' },
  { id: 'integrations', label: 'Integrations' },
]

export function AccountSettings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfileState] = useState(getUserProfile())
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingEmail, setEditingEmail] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)

  const setProfile = (next: typeof profile) => {
    setProfileState(next)
    setUserProfile(next)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 lg:px-6 py-8 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-1">
          <Hexagon className="w-8 h-8 text-primary-500" />
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        </div>
        <p className="text-gray-500 text-sm mb-6">Settings for your account</p>
        <div
          className="flex flex-wrap gap-2 mb-6"
          role="tablist"
          aria-label="Settings sections"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">My Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Profile</h3>
                  <button
                    type="button"
                    onClick={() => setEditingProfile(!editingProfile)}
                    className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      First Name
                    </label>
                    {editingProfile ? (
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) =>
                          setProfile({ ...profile, firstName: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Last Name
                    </label>
                    {editingProfile ? (
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) =>
                          setProfile({ ...profile, lastName: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Phone
                    </label>
                    {editingProfile ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.phone || '—'}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Security</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Email
                      </label>
                      {editingEmail ? (
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900 truncate">{profile.email}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingEmail(!editingEmail)}
                      className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 shrink-0"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Password
                      </label>
                      <p className="text-gray-900">{profile.passwordMask}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingPassword(!editingPassword)}
                      className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 shrink-0"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab !== 'profile' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center text-gray-500">
            <p>{tabs.find((t) => t.id === activeTab)?.label} settings coming soon.</p>
          </div>
        )}
      </main>
      <FeedbackTab />
    </div>
  )
}
