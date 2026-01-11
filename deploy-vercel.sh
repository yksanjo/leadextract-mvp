#!/bin/bash

echo "🚀 Deploying LeadExtract to Vercel..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Building project..."
npm run build

echo "🌐 Deploying to Vercel..."
echo ""
echo "📝 Answer these questions:"
echo "   - Set up and deploy: Yes"
echo "   - Which scope: yksanjo"
echo "   - Link to existing project: No"
echo "   - Project name: leadextract"
echo "   - Directory: ./"
echo "   - Build Command: npm run build"
echo "   - Output Directory: .next"
echo "   - Development Command: npm run dev"
echo "   - Environment Variables: We'll set after deployment"
echo ""

vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo "📱 Your app will be live at: https://leadextract.vercel.app"
echo ""
echo "🔧 Next steps:"
echo "   1. Set up Supabase database"
echo "   2. Add environment variables in Vercel dashboard"
echo "   3. Test your deployed app"
echo ""
echo "📚 See QUICK_DEPLOY.md for detailed instructions"