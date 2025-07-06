import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { agentName, realNumber, whitelistNumbers, specialInstructions } = body

        if (!agentName || !realNumber) {
            return NextResponse.json(
                { error: 'Agent name and real number are required' },
                { status: 400 }
            )
        }

        const response = await fetch("https://api.vapi.ai/assistant", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.VAPI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                voice: {
                    provider: "vapi",
                    voiceId: "Harry"
                },
                model: {
                    provider: "openai",
                    model: "gpt-4o",
                    messages: [
                        {
                            role: "system",
                            content: `You are an intelligent call screener AI designed to protect your user from spam, scams, and unwanted solicitations. Your goal is to have a short conversation with the caller to determine their intent, relationship, and legitimacy. Be polite but persistent in asking clarifying questions. If the caller's reason is related to security, auto warranty, tax, bank account security, or some limited time offer, do not ask more questions and end the call immediately. ONLY ask questions one at a time. Never immediately trust the caller's claim (e.g. "I'm a family member" or "I'm from your bank"). Ask for details like their full name, why they're calling, who they're trying to reach, how they know the user, and any urgent reason for their call. Politely but firmly redirect or end the call if you detect vague or evasive answers, commercial sales pitches, robocalls or scripted spam, or scam indicators (e.g. urgent financial requests, pretending to be IRS, etc.). Only warm transfer the call if the caller gives clear, verifiable information, their purpose seems personal, professional, or expected, and you're reasonably confident they're not spam or scam. Otherwise, say: "Thank you for calling. The person you're trying to reach is unavailable. Goodbye.", and then call the 'transfer_to_human' tool to transfer the call. Always stay calm and professional — you are a trusted gatekeeper. Example follow-up questions include: "Can you explain the reason for your call in more detail?", "What's your relationship to the person you're trying to reach?", "Can I ask where you're calling from?", and "Is this a time-sensitive matter?\n\nIf {{customerNumber}} matches any of these numbers (if any), they are whitelisted so transfer the call right away:\n${whitelistNumbers || 'N/A'}\n\nSpecial instructions:\n${specialInstructions || 'N/A'}`
                        }
                    ],
                    tools: [
                        {
                            type: "transferCall",
                            destinations: [
                                {
                                    type: "number",
                                    number: `+1${realNumber}`,
                                    transferPlan: {
                                        mode: "warm-transfer-say-summary",
                                        summaryPlan: {
                                            enabled: true,
                                            messages: [
                                                {
                                                    role: "system",
                                                    content: "Provide a summary of the call."
                                                },
                                                {
                                                    role: "user",
                                                    content: "Here is the transcript:\n\n{{transcript}}\n\n"
                                                }
                                            ]
                                        }
                                    },
                                    message: "Okay, I'm transferring you now. Hang tight."
                                }
                            ],
                            function: {
                                name: "transfer_to_human"
                            }
                        }
                    ]
                },
                firstMessage: `Hey. This is ${agentName}. This call is being recorded and screened by Call Block AI. Unsolicited or suspicious activity may be reported to law enforcement. How can I help you today?`,
                maxDurationSeconds: 300,
                analysisPlan: {
                    structuredDataPlan: {
                        enabled: true,
                        messages: [
                            {
                                role: "system",
                                content: "Evaluate whether this call was spam (true or false), the likelihood of it as spam (as a percent), and the caller's reason for calling. \n\nReturn is_spam as a bool, is_spam_percent as a number, and call_reason as a string.\n\nJson Schema:\n{{schema}}\n\nOnly respond with the JSON."
                            },
                            {
                                role: "user",
                                content: "Here is the transcript:\n\n{{transcript}}\n\n. Here is the ended reason of the call:\n\n{{endedReason}}\n\n"
                            }
                        ],
                        schema: {
                            type: "object",
                            properties: {
                                is_spam: {
                                    type: "boolean",
                                    description: "Evaluate if the call is spam. Return true or false."
                                },
                                is_spam_percent: {
                                    type: "number",
                                    description: "On a scale of 0 to 100 percent, return a number that represents how likely the call was spam."
                                },
                                call_reason: {
                                    type: "string",
                                    description: "State the caller's reason for calling."
                                }
                            },
                            required: ["is_spam", "is_spam_percent", "call_reason"]
                        }
                    }
                },
                name: agentName,
                endCallFunctionEnabled: true,
                startSpeakingPlan: {
                    waitSeconds: 1.5
                }
            })
        })

        if (!response.ok) {
            const errorData = await response.text()
            console.error('Vapi API error:', errorData)
            return NextResponse.json(
                { error: 'Failed to create Vapi assistant' },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)

    } catch (error) {
        console.error('Error creating Vapi assistant:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 