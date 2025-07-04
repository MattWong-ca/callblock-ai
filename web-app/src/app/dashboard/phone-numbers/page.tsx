'use client'

import { useState, useEffect } from 'react'
import { BrowserProvider, Contract } from 'ethers'
import { Poppins } from "next/font/google"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Phone, LayoutDashboard, FileText, Settings, CreditCard, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

// Network specific configurations
const NETWORK_CONFIG = {
  // Sepolia
  "0xaa36a7": {
    name: "Sepolia",
    symbol: "ETH",
    contractAddress: ""
  },
  // Flow EVM Testnet
  "0x221": {
    name: "Flow EVM Testnet",
    symbol: "FLOW",
    contractAddress: "0xE9f4bFA4f4351eDD69AB7cAab516bdc73aA29922"
  },
  // Filecoin Calibration Testnet
  "0x4cb2f": {
    name: "Filecoin Calibration",
    symbol: "FIL",
    contractAddress: ""
  }
}

// Whitelisted wallet addresses
const WHITELISTED_ADDRESSES = [
  "0xB68918211aD90462FbCf75b77a30bF76515422CE",
]

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
  const [showFlowAlert, setShowFlowAlert] = useState(false)
  const [networkConfig, setNetworkConfig] = useState<typeof NETWORK_CONFIG["0x221"] | null>(null)
  const [loading, setLoading] = useState(false)
  const [purchased, setPurchased] = useState(false)
  const [formData, setFormData] = useState({
    agentName: '',
    proxyNumber: '',
    realNumber: '',
    whitelistNumbers: '',
    specialInstructions: ''
  })

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

  const handlePurchase = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!')
      return
    }

    if (!networkConfig) {
      alert('Please switch to a supported network (Sepolia, Flow EVM Testnet, or Filecoin Calibration)')
      return
    }

    // Get current wallet address
    const provider = new BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const walletAddress = await signer.getAddress()
    console.log(walletAddress)

    // Check if wallet is whitelisted
    if (!WHITELISTED_ADDRESSES.includes(walletAddress)) {
      alert('CallBlock.ai is still in beta.Your wallet address is not whitelisted, please DM @mattwong_ca to be added!')
      return
    }

    setLoading(true)
    try {
      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new Contract(networkConfig.contractAddress, [
        "function purchaseProxyNumber() public payable"
      ], signer)
      
      // Make payment to purchase the proxy number
      const tx = await contract.purchaseProxyNumber({
        value: BigInt(25000000000000000000)
      })

      await tx.wait()
      
      // Success! Set purchased state to true
      setPurchased(true)
      
      // Reset form or redirect
    //   setFormData({
    //     agentName: '',
    //     proxyNumber: '',
    //     realNumber: '',
    //     whitelistNumbers: '',
    //     specialInstructions: ''
    //   })
      
    } catch (error) {
      console.error('Purchase error:', error)
      alert('Error processing purchase. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handlePurchase()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
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
            
            // Check network and set config
            const network = await provider.getNetwork()
            const chainId = "0x" + network.chainId.toString(16)
            const config = NETWORK_CONFIG[chainId as keyof typeof NETWORK_CONFIG]
            
            if (config) {
              setNetworkConfig(config)
              
              // Show alert if not on supported network
              if (!["0xaa36a7", "0x221", "0x4cb2f"].includes(chainId)) {
                setShowFlowAlert(true)
              }
            } else {
              setNetworkConfig(null)
              setShowFlowAlert(true)
            }
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
        <div className="flex-1 p-16 ml-64">
          {/* Flow Network Alert */}
          {showFlowAlert && (
            <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-500 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Switch to Flow Network</h3>
                  <p className="text-sm text-yellow-700">
                    Please switch to a supported network (Sepolia, Flow EVM Testnet, or Filecoin Calibration) to purchase phone numbers.
                  </p>
                </div>
                <Button 
                  onClick={() => setShowFlowAlert(false)}
                  size="sm" 
                  variant="outline" 
                  className="ml-auto border-yellow-500 text-yellow-700 hover:bg-yellow-100 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}
          
          <div className="mb-8">
            <div>
              <h1 className="text-4xl font-bold text-black">Add New Number</h1>
            </div>
          </div>

          {/* Purchase Form */}
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-12">
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Name of Agent
                    </label>
                    <input
                      type="text"
                      value={formData.agentName}
                      onChange={(e) => handleInputChange('agentName', e.target.value)}
                      placeholder="Matt's Assistant"
                      className="w-full p-3 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Choose AI Proxy Number
                    </label>
                    <select
                      value={formData.proxyNumber}
                      onChange={(e) => handleInputChange('proxyNumber', e.target.value)}
                      className="w-full p-3 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    >
                      <option value="">Select a number</option>
                      <option value="+1 (555) 111-2222">+1 (555) 111-2222</option>
                      <option value="+1 (555) 333-4444">+1 (555) 333-4444</option>
                      <option value="+1 (555) 555-6666">+1 (555) 555-6666</option>
                      <option value="+1 (555) 777-8888">+1 (555) 777-8888</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Your Real Number (AI will transfer to this number)
                  </label>
                  <input
                    type="password"
                    value={formData.realNumber}
                    onChange={(e) => handleInputChange('realNumber', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-3 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Whitelist Numbers (optional)
                  </label>
                  <textarea
                    value={formData.whitelistNumbers}
                    onChange={(e) => handleInputChange('whitelistNumbers', e.target.value)}
                    placeholder="Enter phone numbers that should always be forwarded, separated by commas"
                    rows={1}
                    className="w-full p-3 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Special Instructions (optional)
                  </label>
                  <textarea
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    placeholder="Any special instructions for your AI agent..."
                    rows={3}
                    className="w-full p-3 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div className="flex justify-end">
                  {purchased ? (
                    <div className="flex items-center gap-2 text-green-600 font-semibold text-lg">
                      <CheckCircle className="w-6 h-6" />
                      Purchased
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      {loading ? 'Processing...' : 'Purchase Number - $9/month'}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* My Numbers Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">My Numbers</h2>
            <div className="grid md:grid-cols-2 gap-8">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 