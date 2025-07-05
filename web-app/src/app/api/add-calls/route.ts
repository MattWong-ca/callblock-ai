import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, calls } = body

    if (!userId || !calls || !Array.isArray(calls)) {
      return NextResponse.json(
        { error: 'User ID and calls array are required' },
        { status: 400 }
      )
    }

    // Transform calls data to match our database schema
    const callsToInsert = calls.map((call) => ({
      user_id: null,
      call_summary: call.analysis?.summary || '',
      call_reason: call.analysis?.structuredData?.call_reason || '',
      is_spam: call.analysis?.structuredData?.is_spam || false,
      spam_percent: call.analysis?.structuredData?.is_spam_percent || 0
    }))

    // Insert all calls into the database
    const { data, error } = await supabase
      .from('calls')
      .insert(callsToInsert)
      .select()

    if (error) {
      console.error('Error inserting calls:', error)
      return NextResponse.json(
        { error: 'Failed to add calls to database' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      callsAdded: data?.length || 0
    })

  } catch (error) {
    console.error('Error adding calls:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 