import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/app/lib/supabase/client'
import { hash } from '@/app/lib/encryption/crypto'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, company, plan } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin()
    
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create user
    const hashedPassword = hash(password)
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + 14) // 14-day trial

    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email,
        encrypted_password: hashedPassword,
        name,
        company: company || null,
        subscription_status: 'trial',
        subscription_tier: plan || 'pro',
        trial_ends_at: trialEndsAt.toISOString(),
        monthly_export_limit: 1000, // Trial limit
        exports_this_month: 0,
      })
      .select()
      .single()

    if (error) {
      console.error('Signup error:', error)
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Create session
    const session = {
      userId: user.id,
      email: user.email,
      name: user.name,
      tier: user.subscription_tier,
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tier: user.subscription_tier,
        trialEndsAt: user.trial_ends_at,
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
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}