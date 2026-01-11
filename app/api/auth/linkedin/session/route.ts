import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/app/lib/supabase/client'
import { encrypt } from '@/app/lib/encryption/crypto'

export async function POST(request: NextRequest) {
  try {
    // For MVP, we'll use simple session validation
    // In production, implement proper authentication
    const { cookie } = await request.json()

    if (!cookie) {
      return NextResponse.json(
        { error: 'LinkedIn cookie is required' },
        { status: 400 }
      )
    }

    // Validate cookie format (should start with AQEDAT...)
    if (!cookie.startsWith('AQEDAT')) {
      return NextResponse.json(
        { error: 'Invalid LinkedIn cookie format' },
        { status: 400 }
      )
    }

    // For MVP, we'll simulate user ID 1
    // In production, get user ID from session
    const userId = '00000000-0000-0000-0000-000000000001' // Demo user ID

    const supabase = supabaseAdmin()
    
    // Encrypt and save cookie
    const encryptedCookie = encrypt(cookie)
    
    const { data, error } = await supabase
      .from('linkedin_sessions')
      .upsert({
        user_id: userId,
        encrypted_cookie: encryptedCookie,
        is_active: true,
        last_used_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('LinkedIn session save error:', error)
      return NextResponse.json(
        { error: 'Failed to save LinkedIn session' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'LinkedIn session saved successfully',
      sessionId: data.id,
    })

  } catch (error) {
    console.error('LinkedIn session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}