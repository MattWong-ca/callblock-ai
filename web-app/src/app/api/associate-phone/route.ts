import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumberId, assistantId } = body

    if (!phoneNumberId || !assistantId) {
      return NextResponse.json(
        { error: 'Phone number ID and assistant ID are required' },
        { status: 400 }
      )
    }

    const response = await fetch(`https://api.vapi.ai/phone-number/${phoneNumberId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${process.env.VAPI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "provider": "vapi",
        "assistantId": assistantId
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Vapi API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to associate phone number with assistant' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Error associating phone number:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 