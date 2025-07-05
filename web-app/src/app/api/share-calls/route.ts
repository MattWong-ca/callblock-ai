import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!
const pinataJwt = process.env.PINATA_JWT!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Body:', body)
    // const { userId } = body

    // if (!userId) {
    //   return NextResponse.json(
    //     { error: 'User ID is required' },
    //     { status: 400 }
    //   )
    // }

    // Fetch all calls for the user from database
    const { data: calls, error } = await supabase
      .from('calls')
      .select('*')
      // .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching calls:', error)
      return NextResponse.json(
        { error: 'Failed to fetch calls from database' },
        { status: 500 }
      )
    }

    if (!calls || calls.length === 0) {
      return NextResponse.json(
        { error: 'No calls found for this user' },
        { status: 404 }
      )
    }

    // Create a JSON file with the calls data
    const callsData = {
      // userId,
      totalCalls: calls.length,
      calls: calls,
      exportedAt: new Date().toISOString(),
      source: 'CallBlock.ai'
    }

    // Convert to JSON string
    const jsonData = JSON.stringify(callsData, null, 2)

    // Upload to IPFS using Pinata v3 API
    const formData = new FormData()
    formData.append('file', new Blob([jsonData], { type: 'application/json' }), 'call-logs.json')
    formData.append('network', 'public')

    const pinataResponse = await fetch('https://uploads.pinata.cloud/v3/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pinataJwt}`
      },
      body: formData
    })

    if (!pinataResponse.ok) {
      throw new Error('Failed to upload to Pinata')
    }

    const pinataData = await pinataResponse.json()
    const ipfsHash = pinataData.data.cid

    return NextResponse.json({
      success: true,
      ipfsHash: ipfsHash,
      ipfsUrl: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      totalCalls: calls.length
    })

  } catch (error) {
    console.error('Error sharing calls:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 