# LeadExtract - LinkedIn Sales Navigator Scraper MVP

A web application that allows B2B sales teams to export unlimited leads from LinkedIn Sales Navigator, bypassing LinkedIn's 2,500/month export limit.

## 🚀 Quick Start

### 1. Clone and Install
```bash
cd linkedin-scraper-mvp
npm install
```

### 2. Environment Setup
```bash
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### 3. Database Setup
1. Create a Supabase project at https://supabase.com
2. Run the SQL from `db/schema.sql` in the Supabase SQL editor
3. Copy your Supabase URL and anon key to `.env.local`

### 4. Run Development Server
```bash
npm run dev
```
Open http://localhost:3000

## 📁 Project Structure

```
linkedin-scraper-mvp/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Authentication
│   ├── signup/            # Registration
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── supabase/          # Database client
│   ├── encryption/        # Crypto utilities
│   └── scraper/           # LinkedIn scraping logic
├── db/                    # Database schemas
└── public/                # Static assets
```

## 🔧 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase (PostgreSQL)
- **Authentication**: Custom auth with Supabase
- **Payments**: Stripe (optional for MVP)
- **Scraping**: Puppeteer/Playwright integration ready
- **Security**: AES-256 encryption for LinkedIn cookies

## 🗄️ Database Schema

Key tables:
- `users` - User accounts and subscription info
- `linkedin_sessions` - Encrypted LinkedIn cookies
- `scrape_jobs` - Scraping job queue
- `leads` - Scraped LinkedIn profiles
- `exports` - Export history

## 💰 Pricing Tiers

| Tier | Price | Limits | Features |
|------|-------|--------|----------|
| Starter | $99/mo | 5,000 exports/month | Basic support, CSV/Excel export |
| Pro | $299/mo | Unlimited exports | Priority support, all formats, email finding |
| Enterprise | $599/mo | Unlimited + API | Dedicated support, API access, custom integrations |

## 🚢 Deployment

### Vercel (Frontend)
```bash
vercel
```

### Supabase (Backend)
1. Create project at https://supabase.com
2. Run `db/schema.sql`
3. Get URL and keys for environment variables

### Environment Variables
See `.env.local.example` for all required variables.

## 🔐 Security

- LinkedIn session cookies are encrypted with AES-256
- API keys are hashed with SHA-256
- Row Level Security (RLS) on all tables
- Rate limiting on API endpoints

## 🎯 MVP Features

### ✅ Completed
- Landing page with value proposition
- Authentication (login/signup)
- Dashboard with stats
- LinkedIn session setup
- Database schema
- API routes structure

### ⚙️ Ready for Implementation
- LinkedIn scraping engine
- Job queue system
- Lead management
- Export functionality
- Stripe integration

## 📞 Support

For questions or issues, please open a GitHub issue or contact support.

## 📄 License

MIT License - see LICENSE file for details.