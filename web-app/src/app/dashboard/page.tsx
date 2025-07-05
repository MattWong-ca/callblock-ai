'use client'

import { useState, useEffect } from 'react'
import { BrowserProvider } from 'ethers'
import { Poppins } from "next/font/google"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Shield, Phone, CheckCircle, LayoutDashboard, FileText } from "lucide-react"
import Link from "next/link"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

// Helper function to format phone number
const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return 'N/A'
  
  // Remove all non-digits
  const cleaned = phoneNumber.replace(/\D/g, '')
  
  // Check if it's a US number (10 or 11 digits)
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    // Format: +1 (123) 456-7890
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  } else if (cleaned.length === 10) {
    // Format: +1 (123) 456-7890
    return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  // Return original if it doesn't match expected format
  return phoneNumber
}

// Helper function to get time ago
const getTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

export default function DashboardPage() {
  const [address, setAddress] = useState<string>('')
  const [isConnected, setIsConnected] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [loadingPhone, setLoadingPhone] = useState(false)
  interface Call {
    endedAt: string;
    analysis: {
      summary?: string;
      structuredData?: {
        is_spam?: boolean;
        is_spam_percent?: number;
        call_reason?: string;
      };
    };
  }
  
  const [calls, setCalls] = useState<Call[]>([])
  const [loadingCalls, setLoadingCalls] = useState(false)

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum)
        // Request account access
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)
        setIsConnected(true)
      } else {
        alert('Please install MetaMask!')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  // Check if wallet is already connected on page load
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new BrowserProvider(window.ethereum)
          const accounts = await provider.listAccounts()
          if (accounts.length > 0) {
            const address = await accounts[0].getAddress()
            setAddress(address)
            setIsConnected(true)
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error)
        }
      }
    }
    
    checkWalletConnection()
  }, [])

  // Fetch user's phone number when connected
  useEffect(() => {
    const fetchPhoneNumber = async () => {
      if (isConnected && address) {
        setLoadingPhone(true)
        try {
          const response = await fetch(`/api/get-user-phone?walletAddress=${address}`)
          if (response.ok) {
            const data = await response.json()
            console.log(data)
            setPhoneNumber(data.phone_number)
            
            // If we have a Vapi phone ID, fetch the calls
            if (data.vapi_assistant_id) {
              await fetchCalls(data.vapi_assistant_id)
            }
          } else {
            setPhoneNumber('No number assigned')
          }
        } catch (error) {
          console.error('Error fetching phone number:', error)
          setPhoneNumber('No number assigned')
        } finally {
          setLoadingPhone(false)
        }
      }
    }
    
    fetchPhoneNumber()
  }, [isConnected, address])

  // Function to fetch calls from Vapi
  const fetchCalls = async (assistantId: string) => {
    setLoadingCalls(true)
    try {
      const response = await fetch(`/api/get-calls?assistantId=${assistantId}`)
      if (response.ok) {
        const data = await response.json()
        console.log('Calls data:', data)
        setCalls(data || [])
      } else {
        console.error('Failed to fetch calls')
        setCalls([])
      }
    } catch (error) {
      console.error('Error fetching calls:', error)
      setCalls([])
    } finally {
      setLoadingCalls(false)
    }
  }

  if (!isConnected) {
    return (
      <div className={`min-h-[calc(100vh-80px)] bg-[#f5f3f0] ${poppins.className}`}>
        
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="bg-white p-12 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
            <div className="w-24 h-24 bg-pink-500 rounded-none flex items-center justify-center mx-auto mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <Wallet className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-black mb-6">Connect Your Wallet</h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              To access your CallBlock.ai dashboard, please connect your wallet first. This ensures secure access to your AI phone number and call screening data.
            </p>
            <Button 
              onClick={connectWallet}
              size="lg" 
              className="text-xl bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 font-semibold rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const Sidebar = () => (
    <div className="w-64 bg-white border-r-2 border-black h-screen fixed left-0 z-50">
      <div className="p-6">
        <nav className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-pink-500 text-white font-semibold rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </div>
          <Link href="/dashboard/phone-numbers" className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-colors">
            <Phone className="w-5 h-5 text-gray-600" />
            Phone Numbers
          </Link>
          <Link href="/dashboard/call-logs" className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-colors">
            <FileText className="w-5 h-5 text-gray-600" />
            Call Logs
          </Link>
        </nav>
      </div>
    </div>
  )

  return (
    <div className={`min-h-[calc(100vh-80px)] bg-[#f5f3f0] ${poppins.className}`}>
      <div className="flex">
        <Sidebar />
        
        {/* Dashboard content for connected users */}
        <div className="flex-1 p-16 ml-64">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">Welcome back!</h1>
              <p className="text-gray-700 text-lg">Connected: {address}</p>
            </div>
                          <div className="text-right">
                <div className="text-2xl font-bold text-pink-500">
                  {loadingPhone ? 'Loading...' : formatPhoneNumber(phoneNumber)}
                </div>
                <div className="text-sm text-gray-600">Your AI Number</div>
              </div>
          </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-500" />
                Calls Blocked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">0</div>
              <CardDescription className="text-gray-700">
                This month
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-blue-500" />
                Calls Forwarded
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">0</div>
              <CardDescription className="text-gray-700">
                This month
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-pink-500" />
                Protection Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-pink-500">24/7</div>
              <CardDescription className="text-gray-700">
                Always protecting
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingCalls ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                <span className="ml-3 text-gray-600">Loading calls...</span>
              </div>
            ) : calls.length > 0 ? (
              <div className="space-y-4">
                {calls.slice(0, 5).map((call, index) => {
                  const isSpam = call.analysis?.structuredData?.is_spam
                  const spamPercent = call.analysis?.structuredData?.is_spam_percent || 0
                  const callReason = call.analysis?.structuredData?.call_reason || 'Unknown'
                  const endedAt = new Date(call.endedAt)
                  const timeAgo = getTimeAgo(endedAt)
                  
                  return (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-4 border-l-4 ${
                        isSpam 
                          ? 'bg-red-50 border-red-500' 
                          : 'bg-green-50 border-green-500'
                      }`}
                    >
                      <div>
                        <div className={`font-semibold ${
                          isSpam ? 'text-red-700' : 'text-green-700'
                        }`}>
                          {isSpam ? 'Spam Call Blocked' : 'Call Forwarded'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {callReason} • {timeAgo}
                        </div>
                        {isSpam && (
                          <div className="text-xs text-red-600 mt-1">
                            Spam likelihood: {spamPercent}%
                          </div>
                        )}
                      </div>
                      {isSpam ? (
                        <Shield className="w-5 h-5 text-red-500" />
                      ) : (
                        <Phone className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent calls found
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
} 