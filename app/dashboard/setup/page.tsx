'use client'

import { useState } from 'react'
import { Link, Shield, CheckCircle, AlertCircle, Copy, Key } from 'lucide-react'

export default function SetupPage() {
  const [linkedinCookie, setLinkedinCookie] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/auth/linkedin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookie: linkedinCookie }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setLinkedinCookie('')
      } else {
        setError(data.error || 'Failed to save LinkedIn session')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    {
      number: 1,
      title: 'Login to LinkedIn',
      description: 'Go to linkedin.com and log in to your account',
    },
    {
      number: 2,
      title: 'Open Developer Tools',
      description: 'Right-click anywhere on the page and select "Inspect"',
    },
    {
      number: 3,
      title: 'Go to Application Tab',
      description: 'Click on the "Application" tab in Developer Tools',
    },
    {
      number: 4,
      title: 'Find li_at Cookie',
      description: 'Under Storage → Cookies → https://www.linkedin.com, find the "li_at" cookie',
    },
    {
      number: 5,
      title: 'Copy Cookie Value',
      description: 'Double-click the "Value" field and copy the entire string',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">LinkedIn Setup</h1>
        <p className="text-gray-600 mt-1">
          Connect your LinkedIn account to start scraping leads
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Setup Steps */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Key className="h-5 w-5 mr-2 text-primary-600" />
            How to Get Your LinkedIn Cookie
          </h2>
          
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800">Security Note</h3>
                <p className="text-blue-700 text-sm mt-1">
                  Your LinkedIn cookie is encrypted with AES-256 and stored securely. 
                  We never store your LinkedIn password.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cookie Form */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary-600" />
            Enter Your LinkedIn Cookie
          </h2>

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-800">Success!</h3>
                  <p className="text-green-700 text-sm mt-1">
                    Your LinkedIn session has been saved securely. You can now start scraping leads.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800">Error</h3>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="cookie" className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Cookie (li_at)
              </label>
              <textarea
                id="cookie"
                name="cookie"
                rows={4}
                value={linkedinCookie}
                onChange={(e) => setLinkedinCookie(e.target.value)}
                className="input-field font-mono text-sm"
                placeholder="AQEDAT..."
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Paste the entire "li_at" cookie value here. It should start with "AQEDAT..."
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I understand this gives access to my LinkedIn account
                </label>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('AQEDAT...')
                  alert('Example cookie copied to clipboard')
                }}
                className="flex items-center text-sm text-primary-600 hover:text-primary-700"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy example
              </button>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || !linkedinCookie}
                className="btn-primary flex-1"
              >
                {loading ? 'Saving...' : 'Save LinkedIn Session'}
              </button>
              <Link
                href="/dashboard/jobs/new"
                className="btn-secondary flex-1 text-center"
              >
                Skip for Now
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="text-primary-600 hover:text-primary-700">
                  Watch video tutorial
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary-600 hover:text-primary-700">
                  Read detailed guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary-600 hover:text-primary-700">
                  Contact support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Current Setup Status</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">LinkedIn Connection</div>
              <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Not Connected
              </div>
            </div>
            <p className="text-sm text-gray-500">Last updated: Never</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Proxy Status</div>
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Active
              </div>
            </div>
            <p className="text-sm text-gray-500">Bright Data residential proxies</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Export Limit</div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                1,000/month
              </div>
            </div>
            <p className="text-sm text-gray-500">Trial period (14 days remaining)</p>
          </div>
        </div>
      </div>
    </div>
  )
}