import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/app/lib/supabase/client'
import { hash } from '@/app/lib/encryption/crypto'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // For MVP, we'll use simple password hashing
    // In production, use Supabase Auth
    const supabase = supabaseAdmin()
    
    // Check if user exists
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Simple password check for MVP
    // In production, use proper password hashing
    const hashedPassword = hash(password)
    if (user.encrypted_password !== hashedPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create session (simplified for MVP)
    // In production, use Supabase Auth sessions
    const session = {
      userId: user.id,
      email: user.email,
      name: user.name,
      tier: user.subscription_tier,
    }

    // Set cookie (simplified for MVP)
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tier: user.subscription_tier,
      }
    })

    // Set session cookie
    response.cookies.set('session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}