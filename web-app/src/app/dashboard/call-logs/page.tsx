'use client'

import { useState, useEffect } from 'react'
import { BrowserProvider } from 'ethers'
import { Poppins } from "next/font/google"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Shield, Phone, LayoutDashboard, FileText, Search, Filter, Share2 } from "lucide-react"
import Link from "next/link"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

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

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

export default function CallLogsPage() {
  const [address, setAddress] = useState<string>('')
  const [isConnected, setIsConnected] = useState(false)
  const [calls, setCalls] = useState<Call[]>([])
  const [loadingCalls, setLoadingCalls] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

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

  // Fetch calls when connected
  useEffect(() => {
    const fetchCalls = async () => {
      if (isConnected && address) {
        setLoadingCalls(true)
        try {
          // First get user's phone data to get assistant ID
          const phoneResponse = await fetch(`/api/get-user-phone?walletAddress=${address}`)
          if (phoneResponse.ok) {
            const phoneData = await phoneResponse.json()
            console.log('Phone data:', phoneData)
            
            if (phoneData.vapi_assistant_id) {
              // Fetch calls using assistant ID
              const callsResponse = await fetch(`/api/get-calls?assistantId=${phoneData.vapi_assistant_id}`)
              if (callsResponse.ok) {
                const callsData = await callsResponse.json()
                console.log('Calls data:', callsData)
                setCalls(callsData || [])
              } else {
                console.error('Failed to fetch calls')
                setCalls([])
              }
            } else {
              setCalls([])
            }
          } else {
            setCalls([])
          }
        } catch (error) {
          console.error('Error fetching calls:', error)
          setCalls([])
        } finally {
          setLoadingCalls(false)
        }
      }
    }
    
    fetchCalls()
  }, [isConnected, address])

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

  // Filter calls based on search term
  const filteredCalls = calls.filter(call => {
    const callReason = call.analysis?.structuredData?.call_reason || ''
    return callReason.toLowerCase().includes(searchTerm.toLowerCase())
  })

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
          <Link href="/dashboard" className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-colors">
            <LayoutDashboard className="w-5 h-5 text-gray-600" />
            Dashboard
          </Link>
          <Link href="/dashboard/phone-numbers" className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-colors">
            <Phone className="w-5 h-5 text-gray-600" />
            Phone Numbers
          </Link>
          <div className="flex items-center gap-3 p-3 bg-pink-500 text-white font-semibold rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <FileText className="w-5 h-5" />
            Call Logs
          </div>
        </nav>
      </div>
    </div>
  )

  return (
    <div className={`min-h-[calc(100vh-80px)] bg-[#f5f3f0] ${poppins.className}`}>
      <div className="flex">
        <Sidebar />
        
        {/* Call Logs content */}
        <div className="flex-1 p-16 ml-64">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">Call Logs</h1>
              <p className="text-gray-700 text-lg">View your call history and screening results</p>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search calls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <Button variant="outline" className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Call Logs Table */}
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingCalls ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                  <span className="ml-3 text-gray-600">Loading calls...</span>
                </div>
              ) : filteredCalls.length > 0 ? (
                <div className="space-y-4">
                  {filteredCalls.map((call, index) => {
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
                        <div className="flex items-center gap-4">
                          {isSpam ? (
                            <Shield className="w-6 h-6 text-red-500" />
                          ) : (
                            <Phone className="w-6 h-6 text-green-500" />
                          )}
                          <div>
                            <div className={`font-semibold ${
                              isSpam ? 'text-red-700' : 'text-green-700'
                            }`}>
                              {isSpam ? 'Spam Call Blocked' : 'Call Forwarded'}
                            </div>
                            <div className="text-sm text-gray-600">
                              {callReason} • {timeAgo}
                            </div>
                            <div className="text-xs text-gray-500">
                              AI Confidence: {isSpam ? spamPercent : 100 - spamPercent}%
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-semibold ${
                            isSpam ? 'text-red-700' : 'text-green-700'
                          }`}>
                            {isSpam ? 'BLOCKED' : 'FORWARDED'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {timeAgo}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? 'No calls match your search' : 'No calls found'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 