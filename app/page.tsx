import Link from 'next/link'
import { CheckCircle, Zap, Shield, Download } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-600">LeadExtract</div>
          <div className="flex gap-4">
            <Link href="/login" className="text-gray-600 hover:text-primary-600">Login</Link>
            <Link href="/signup" className="btn-primary">Start Free Trial</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Export <span className="text-primary-600">Unlimited Leads</span> from LinkedIn Sales Navigator
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Bypass LinkedIn's 2,500/month export limit. Get unlimited exports for just $299/month -
            still cheaper than Sales Navigator Advanced ($1,600/year).
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-3">
              Start Free Trial
            </Link>
            <Link href="/login" className="btn-secondary text-lg px-8 py-3">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unlimited Exports</h3>
              <p className="text-gray-600">No more 2,500/month limit. Export as many leads as you need.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Reliable</h3>
              <p className="text-gray-600">Enterprise-grade proxies and stealth technology to avoid detection.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
              <p className="text-gray-600">Export to CSV, Excel, or JSON. Integrate with your CRM.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LeadExtract?</h2>
          <div className="max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-4 px-6 text-left">Feature</th>
                  <th className="py-4 px-6 text-left text-gray-500">LinkedIn Sales Navigator</th>
                  <th className="py-4 px-6 text-left text-primary-600">LeadExtract</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b">
                  <td className="py-4 px-6 font-medium">Monthly Price</td>
                  <td className="py-4 px-6">$99</td>
                  <td className="py-4 px-6 font-semibold">$299</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 font-medium">Export Limit</td>
                  <td className="py-4 px-6">2,500/month</td>
                  <td className="py-4 px-6 font-semibold">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 font-medium">Advanced Plan</td>
                  <td className="py-4 px-6">$1,600/year</td>
                  <td className="py-4 px-6 font-semibold">Included</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 font-medium">CRM Integration</td>
                  <td className="py-4 px-6">Limited</td>
                  <td className="py-4 px-6 font-semibold">Full API Access</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Support</td>
                  <td className="py-4 px-6">Standard</td>
                  <td className="py-4 px-6 font-semibold">Priority 24/7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="card border-2 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-4xl font-bold mb-2">$99<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-gray-600">Perfect for small teams</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>5,000 exports/month</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>Basic support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>CSV/Excel export</span>
                </li>
              </ul>
              <Link href="/signup?plan=starter" className="btn-primary w-full text-center block">
                Get Started
              </Link>
            </div>

            {/* Pro Plan - Featured */}
            <div className="card border-2 border-primary-600 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-2">$299<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-gray-600">For serious sales teams</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="font-semibold">Unlimited exports</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>All export formats</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>Email finding integration</span>
                </li>
              </ul>
              <Link href="/signup?plan=pro" className="btn-primary w-full text-center block">
                Get Started
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="card border-2 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold mb-2">$599<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-gray-600">For large organizations</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>API access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Link href="/signup?plan=enterprise" className="btn-primary w-full text-center block">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Export Unlimited Leads?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of sales teams who have already bypassed LinkedIn's limits.
          </p>
          <Link href="/signup" className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold text-white">LeadExtract</div>
              <p className="text-gray-400">© 2024 LeadExtract. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}