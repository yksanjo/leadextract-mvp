# 🚀 One-Click Vercel Deployment

## **Click this button to deploy instantly:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyksanjo%2Fleadextract-mvp&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,ENCRYPTION_KEY,NEXT_PUBLIC_APP_URL&envDescription=Required%20environment%20variables&project-name=leadextract&repository-name=leadextract-mvp)

## **Deployment Steps:**

### **1. Click the Vercel button above**
- Connect your GitHub account
- Authorize Vercel access

### **2. Configure Project**
- **Project Name:** `leadextract` (or choose your own)
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### **3. Add Environment Variables**
**During deployment, add these placeholder values (we'll update later):**

```
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_anon_key
SUPABASE_SERVICE_ROLE_KEY=placeholder_service_key
ENCRYPTION_KEY=placeholder_32_char_encryption_key_123
NEXT_PUBLIC_APP_URL=https://leadextract.vercel.app
```

### **4. Click Deploy**
- Vercel will build and deploy your app
- Takes 2-3 minutes
- You'll get a live URL like: `https://leadextract.vercel.app`

## **After Deployment:**

### **1. Set up Supabase Database**
Run the setup script:
```bash
./setup-supabase.sh
```
Or follow manual steps in `DEPLOYMENT.md`

### **2. Update Environment Variables in Vercel**
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Replace placeholders with real values:
   - Supabase URL and keys
   - Real encryption key (`openssl rand -base64 32`)
   - Your actual app URL

### **3. Redeploy with Real Values**
In Vercel dashboard:
1. Go to Deployments
2. Find latest deployment
3. Click "Redeploy"

## **🎉 Your App is Live!**

**Visit:** `https://leadextract.vercel.app`

## **Quick Test:**
1. Open your app URL
2. Click "Start Free Trial"
3. Sign up with test credentials
4. Go to Dashboard
5. Set up LinkedIn session

## **Troubleshooting:**

### **If build fails:**
- Check environment variables are set
- Verify all required vars are present
- Check Vercel build logs

### **If app doesn't load:**
- Wait 1-2 minutes after deployment
- Clear browser cache
- Try incognito mode

### **If database connection fails:**
- Verify Supabase is running
- Check API keys are correct
- Ensure tables were created

## **Need Help?**
- GitHub Issues: https://github.com/yksanjo/leadextract-mvp/issues
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs

---

**⏱️ Total Time: 10-15 minutes**
**💰 Revenue Ready: TODAY**