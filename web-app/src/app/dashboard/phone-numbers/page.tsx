'use client'

import { useState, useEffect } from 'react'
import { BrowserProvider } from 'ethers'
import { Poppins } from "next/font/google"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Shield, Phone, CheckCircle, LayoutDashboard, FileText, Plus, Settings } from "lucide-react"
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

export default function PhoneNumbersPage() {
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
    <div className="w-64 bg-white border-r-2 border-black min-h-[calc(100vh-80px)] ">
      <div className="p-6">
        <nav className="space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-colors">
            <LayoutDashboard className="w-5 h-5 text-gray-600" />
            Dashboard
          </Link>
          <div className="flex items-center gap-3 p-3 bg-pink-500 text-white font-semibold rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Phone className="w-5 h-5" />
            Phone Numbers
          </div>
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
        
        {/* Phone Numbers content */}
        <div className="flex-1 p-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">Phone Numbers</h1>
              <p className="text-gray-700 text-lg">Manage your AI proxy numbers</p>
            </div>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <Plus className="w-5 h-5 mr-2" />
              Add New Number
            </Button>
          </div>

          {/* Active Numbers */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-pink-500" />
                    Primary Number
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pink-500 mb-4">+1 (555) 123-4567</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calls Blocked:</span>
                    <span>47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calls Forwarded:</span>
                    <span>12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span>Jan 15, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-blue-500" />
                    Business Number
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500 mb-4">+1 (555) 987-6543</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calls Blocked:</span>
                    <span>23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calls Forwarded:</span>
                    <span>8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span>Feb 3, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Number Settings */}
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle>Number Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-black mb-4">Forwarding Rules</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 border-l-4 border-pink-500">
                      <div>
                        <div className="font-semibold">Legitimate Calls</div>
                        <div className="text-sm text-gray-600">Forward to your real number</div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 border-l-4 border-red-500">
                      <div>
                        <div className="font-semibold">Spam Calls</div>
                        <div className="text-sm text-gray-600">Block completely</div>
                      </div>
                      <Shield className="w-5 h-5 text-red-500" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-4">AI Screening</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Spam Detection</span>
                      <span className="text-green-600 font-semibold">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Voice Analysis</span>
                      <span className="text-green-600 font-semibold">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Call Recording</span>
                      <span className="text-gray-400">Disabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 