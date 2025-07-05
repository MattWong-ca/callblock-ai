import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('phone_number, vapi_phone_id, vapi_assistant_id')
      .eq('wallet_address', walletAddress)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No user found
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching user phone:', error)
      return NextResponse.json(
        { error: 'Failed to fetch user phone' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      phone_number: user.phone_number,
      vapi_phone_id: user.vapi_phone_id,
      vapi_assistant_id: user.vapi_assistant_id
    })

  } catch (error) {
    console.error('Error in get-user-phone:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 