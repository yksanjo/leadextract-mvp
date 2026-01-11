'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BarChart3,
  Download,
  Users,
  Clock,
  TrendingUp,
  Plus,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

export default function DashboardPage() {
  const [stats] = useState({
    totalLeads: 1245,
    exportsThisMonth: 342,
    activeJobs: 3,
    successRate: 94
  })

  const [recentJobs] = useState([
    { id: 1, name: 'Music Production Companies', status: 'completed', leads: 245, date: '2024-01-15' },
    { id: 2, name: 'AI Startup Founders', status: 'running', leads: 0, date: '2024-01-16' },
    { id: 3, name: 'VC Partners in SF', status: 'pending', leads: 0, date: '2024-01-16' },
  ])

  const [quickActions] = useState([
    { title: 'New Scrape Job', description: 'Start scraping new leads', icon: Plus, href: '/dashboard/jobs/new', color: 'bg-blue-100 text-blue-600' },
    { title: 'Export Leads', description: 'Download your leads', icon: Download, href: '/dashboard/leads', color: 'bg-green-100 text-green-600' },
    { title: 'LinkedIn Setup', description: 'Update session cookie', icon: Users, href: '/dashboard/setup', color: 'bg-purple-100 text-purple-600' },
    { title: 'Upgrade Plan', description: 'Get more exports', icon: TrendingUp, href: '/dashboard/billing', color: 'bg-yellow-100 text-yellow-600' },
  ])

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, John!</h1>
            <p className="text-primary-100 mt-1">
              You have exported {stats.exportsThisMonth} leads this month.
              {stats.exportsThisMonth < 5000 ? ` ${5000 - stats.exportsThisMonth} exports remaining in your plan.` : ' Unlimited exports active!'}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm">Current Plan</div>
              <div className="text-xl font-bold">Pro</div>
              <div className="text-sm opacity-90">$299/month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Leads</p>
              <p className="text-2xl font-bold">{stats.totalLeads.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="rounded-lg bg-green-100 p-3">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Exports This Month</p>
              <p className="text-2xl font-bold">{stats.exportsThisMonth.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="rounded-lg bg-purple-100 p-3">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Jobs</p>
              <p className="text-2xl font-bold">{stats.activeJobs}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="rounded-lg bg-yellow-100 p-3">
              <BarChart3 className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold">{stats.successRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link
                key={index}
                href={action.href}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center">
                  <div className={`rounded-lg p-3 ${action.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recent Scrape Jobs</h2>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{job.name}</h3>
                  <p className="text-sm text-gray-500">{job.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold">{job.leads} leads</div>
                    <div className="flex items-center text-sm">
                      {job.status === 'completed' ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-600">Completed</span>
                        </>
                      ) : job.status === 'running' ? (
                        <>
                          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse mr-1" />
                          <span className="text-blue-600">Running</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-yellow-600">Pending</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/jobs/${job.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/dashboard/jobs" className="text-primary-600 hover:text-primary-700 font-medium">
              View all jobs →
            </Link>
          </div>
        </div>

        {/* Setup Reminder */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">LinkedIn Setup</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800">Session Expired</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  Your LinkedIn session cookie has expired. Update it to continue scraping.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">LinkedIn Connection</div>
                <div className="text-sm text-gray-500">Last updated 2 days ago</div>
              </div>
              <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Expired
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Proxy Status</div>
                <div className="text-sm text-gray-500">Bright Data residential proxies</div>
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Active
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/setup"
            className="btn-primary w-full mt-6 text-center"
          >
            Update LinkedIn Session
          </Link>
        </div>
      </div>

      {/* Usage Chart Placeholder */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Monthly Usage</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Usage chart will appear here</p>
            <p className="text-sm text-gray-400">Showing exports per day this month</p>
          </div>
        </div>
      </div>
    </div>
  )
}