#!/bin/bash

echo "🚀 Starting LeadExtract MVP..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚙️  Creating environment file..."
    cp .env.local.example .env.local
    echo "⚠️  Please edit .env.local with your Supabase credentials"
fi

echo "🌐 Starting development server..."
echo "📱 Open http://localhost:3000 in your browser"
echo ""

npm run dev