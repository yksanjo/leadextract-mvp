# 🚀 Deployment Guide - LeadExtract MVP

## 1. Supabase Setup

### Create Supabase Project
1. Go to https://supabase.com and sign up
2. Create a new project
3. Note your project URL and anon key

### Run Database Schema
1. Go to SQL Editor in Supabase dashboard
2. Copy and paste the entire contents of `db/schema.sql`
3. Run the SQL to create all tables and functions

### Get API Keys
1. Go to Project Settings → API
2. Copy:
   - Project URL
   - anon/public key
   - service_role key (keep this secret!)

## 2. Vercel Deployment

### Deploy Frontend
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Or Deploy via GitHub
1. Push code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. Configure project settings

### Environment Variables in Vercel
Add these environment variables in Vercel dashboard:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Encryption Key (generate with: openssl rand -base64 32)
ENCRYPTION_KEY=your_32_char_encryption_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-vercel-url.vercel.app
NODE_ENV=production

# Optional: Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pk
STRIPE_SECRET_KEY=your_stripe_sk
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## 3. Generate Encryption Key
```bash
# Generate a secure encryption key
openssl rand -base64 32
# Copy the output to ENCRYPTION_KEY in Vercel
```

## 4. Test Your Deployment

### 1. Visit Your Vercel URL
Open https://your-project.vercel.app

### 2. Create Account
- Click "Start Free Trial"
- Fill in signup form
- Use demo credentials: test@example.com / password123

### 3. Set Up LinkedIn
- Go to /dashboard/setup
- Follow instructions to get LinkedIn cookie
- Save session

### 4. Test Scraping
- Create a scrape job
- Test with a Sales Navigator search URL
- Export leads

## 5. Production Security Checklist

### ✅ Required
- [ ] Environment variables set in Vercel
- [ ] Supabase RLS policies configured
- [ ] Encryption key generated and secure
- [ ] Custom domain configured (optional)
- [ ] SSL/TLS enabled

### 🔒 Recommended
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure backups in Supabase
- [ ] Set up rate limiting
- [ ] Enable 2FA on all accounts
- [ ] Regular security audits

## 6. Scaling Considerations

### When you reach 100+ users:
1. **Upgrade Supabase Plan**: Scale database resources
2. **Add Redis**: For job queue and caching
3. **Implement CDN**: For static assets
4. **Add Load Balancer**: For high traffic

### When you reach 1000+ users:
1. **Microservices Architecture**: Split scraping workers
2. **Database Sharding**: Distribute data
3. **Global CDN**: For international users
4. **Advanced Monitoring**: Full observability stack

## 7. Troubleshooting

### Common Issues & Solutions

**Vercel Deployment Fails:**
- Check environment variables
- Verify Supabase connection
- Check build logs in Vercel

**Supabase Connection Errors:**
- Verify API keys
- Check network connectivity
- Ensure database is running

**LinkedIn Scraping Issues:**
- Verify session cookie is valid
- Check rate limiting
- Update scraping logic if LinkedIn changes

**Authentication Problems:**
- Check session cookies
- Verify user table permissions
- Test with different browsers

## 8. Monitoring & Analytics

### Essential Tools
1. **Vercel Analytics**: Built-in performance monitoring
2. **Supabase Dashboard**: Database performance
3. **Stripe Dashboard**: Payment analytics
4. **Google Analytics**: User behavior

### Setup Time: 30 minutes
- Free tiers available for all
- Easy integration
- Real-time alerts

## 9. Backup Strategy

### Daily Backups
1. **Supabase**: Automatic daily backups
2. **Database**: Export schema and data weekly
3. **Files**: Backup to S3/Cloud Storage
4. **Configuration**: Version control all configs

### Recovery Plan
1. Document recovery procedures
2. Test backups regularly
3. Keep multiple backup copies
4. Have rollback procedures

## 10. Launch Checklist

### Pre-Launch
- [ ] All features tested
- [ ] Performance optimized
- [ ] Security audit completed
- [ ] Backup system working
- [ ] Monitoring configured

### Launch Day
- [ ] Announce on ProductHunt
- [ ] Share on Twitter/LinkedIn
- [ ] Email waitlist (if any)
- [ ] Monitor closely for issues

### Post-Launch
- [ ] Collect user feedback
- [ ] Fix critical bugs
- [ ] Plan next features
- [ ] Scale infrastructure

## 🎉 Congratulations!

Your LinkedIn Sales Navigator Scraper SaaS is now deployed and ready to generate revenue!

**Next Steps:**
1. Get your first paying customer (you!)
2. Collect testimonials
3. Scale marketing
4. Add more features

**Remember:** Start using it for your Soundraw BD outreach immediately. This validates the product AND generates revenue from Day 1.