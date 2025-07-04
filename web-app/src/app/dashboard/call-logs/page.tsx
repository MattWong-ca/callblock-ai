'use client'

import { useState, useEffect } from 'react'
import { BrowserProvider } from 'ethers'
import { Poppins } from "next/font/google"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Shield, Phone, CheckCircle, LayoutDashboard, FileText, Search, Filter } from "lucide-react"
import Link from "next/link"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

export default function CallLogsPage() {
  const [, setAddress] = useState<string>('')
  const [isConnected, setIsConnected] = useState(false)

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum)
        // Request account access
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address.slice(0, 6) + '...' + address.slice(-4))
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
            setAddress(address.slice(0, 6) + '...' + address.slice(-4))
            setIsConnected(true)
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error)
        }
      }
    }
    
    checkWalletConnection()
  }, [])

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
        <div className="flex-1 p-16 ml-64 overflow-y-auto h-screen">
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
                  className="pl-10 pr-4 py-2 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <Button variant="outline" className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Call Logs Table */}
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-50 border-l-4 border-red-500">
                  <div className="flex items-center gap-4">
                    <Shield className="w-6 h-6 text-red-500" />
                    <div>
                      <div className="font-semibold text-red-700">Spam Call Blocked</div>
                      <div className="text-sm text-gray-600">+1 (555) 999-8888 • 2 hours ago</div>
                      <div className="text-xs text-gray-500">AI Confidence: 98%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-red-700">BLOCKED</div>
                    <div className="text-xs text-gray-500">0:00</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 border-l-4 border-green-500">
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-green-500" />
                    <div>
                      <div className="font-semibold text-green-700">Call Forwarded</div>
                      <div className="text-sm text-gray-600">+1 (555) 123-4567 • 4 hours ago</div>
                      <div className="text-xs text-gray-500">AI Confidence: 12%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-700">FORWARDED</div>
                    <div className="text-xs text-gray-500">2:34</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 border-l-4 border-red-500">
                  <div className="flex items-center gap-4">
                    <Shield className="w-6 h-6 text-red-500" />
                    <div>
                      <div className="font-semibold text-red-700">Spam Call Blocked</div>
                      <div className="text-sm text-gray-600">+1 (555) 777-6666 • 6 hours ago</div>
                      <div className="text-xs text-gray-500">AI Confidence: 95%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-red-700">BLOCKED</div>
                    <div className="text-xs text-gray-500">0:00</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 border-l-4 border-green-500">
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-green-500" />
                    <div>
                      <div className="font-semibold text-green-700">Call Forwarded</div>
                      <div className="text-sm text-gray-600">+1 (555) 456-7890 • 8 hours ago</div>
                      <div className="text-xs text-gray-500">AI Confidence: 8%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-700">FORWARDED</div>
                    <div className="text-xs text-gray-500">1:45</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 border-l-4 border-yellow-500">
                  <div className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-yellow-500" />
                    <div>
                      <div className="font-semibold text-yellow-700">Call Screened</div>
                      <div className="text-sm text-gray-600">+1 (555) 333-4444 • 12 hours ago</div>
                      <div className="text-xs text-gray-500">AI Confidence: 65%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-yellow-700">SCREENED</div>
                    <div className="text-xs text-gray-500">0:15</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">47</div>
                <div className="text-sm text-gray-600">Calls Blocked</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">12</div>
                <div className="text-sm text-gray-600">Calls Forwarded</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">3</div>
                <div className="text-sm text-gray-600">Calls Screened</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">98%</div>
                <div className="text-sm text-gray-600">AI Accuracy</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 