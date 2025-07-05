import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      walletAddress,
      phoneNumber,
      vapiPhoneId,
      vapiAssistantId,
      phoneRegion = 'US'
    } = body

    if (!walletAddress || !phoneNumber || !vapiPhoneId || !vapiAssistantId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create or update user with all phone information in one operation
    const { data: user, error } = await supabase
      .from('users')
      .upsert({
        wallet_address: walletAddress,
        phone_number: phoneNumber,
        vapi_phone_id: vapiPhoneId,
        vapi_assistant_id: vapiAssistantId,
        phone_region: phoneRegion
      }, {
        onConflict: 'wallet_address',
        ignoreDuplicates: false
      })
      .select()
      .single()

    if (error) {
      console.error('Error upserting user:', error)
      return NextResponse.json(
        { error: 'Failed to save user data' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      user: user
    })

  } catch (error) {
    console.error('Error completing purchase:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 