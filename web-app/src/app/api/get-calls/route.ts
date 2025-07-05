import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const assistantId = searchParams.get('assistantId')

    if (!assistantId) {
      return NextResponse.json(
        { error: 'Assistant ID is required' },
        { status: 400 }
      )
    }

    const response = await fetch(`https://api.vapi.ai/call?assistantId=${assistantId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.VAPI_API_KEY}`
      }
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Vapi API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to fetch calls from Vapi' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Error fetching calls:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 