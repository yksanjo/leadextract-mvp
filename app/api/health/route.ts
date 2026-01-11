import { NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase/client'

export async function GET() {
  try {
    let databaseStatus = 'unknown'
    
    // Test database connection if supabase is available
    if (supabase) {
      const { error } = await supabase
        .from('users')
        .select('count', { count: 'exact', head: true })
      
      databaseStatus = error ? 'disconnected' : 'connected'
    } else {
      databaseStatus = 'not_configured'
    }

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'LeadExtract API',
      version: '1.0.0',
      database: databaseStatus,
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