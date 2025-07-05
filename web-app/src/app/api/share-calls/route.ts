import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!
const pinataJwt = process.env.PINATA_JWT!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress } = body

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    // First, get user's assistant ID from database
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('vapi_assistant_id')
      .eq('wallet_address', walletAddress)
      .single()

    if (userError || !userData?.vapi_assistant_id) {
      console.error('Error fetching user data:', userError)
      return NextResponse.json(
        { error: 'User not found or no assistant ID' },
        { status: 404 }
      )
    }

    // Fetch calls from Vapi using assistant ID
    const vapiResponse = await fetch(`https://api.vapi.ai/call?assistantId=${userData.vapi_assistant_id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!vapiResponse.ok) {
      console.error('Error fetching calls from Vapi:', vapiResponse.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch calls from Vapi' },
        { status: 500 }
      )
    }

    const vapiData = await vapiResponse.json()
    console.log('Vapi data:', vapiData)
    const calls = vapiData || []

    if (calls.length === 0) {
      return NextResponse.json(
        { error: 'No calls found for this user' },
        { status: 404 }
      )
    }

    // Create a JSON file with the calls data
    const callsData = {
      walletAddress,
      assistantId: userData.vapi_assistant_id,
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