import { NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase/client'

export async function GET() {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true })

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'LeadExtract API',
      version: '1.0.0',
      database: error ? 'disconnected' : 'connected',
      environment: process.env.NODE_ENV || 'development',
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      service: 'LeadExtract API',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}