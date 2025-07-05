'use client'

import { useState, useEffect } from 'react'
import { Poppins } from "next/font/google"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Shield, Search, Filter } from "lucide-react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface SpamCall {
  phoneNumber: string
  lastReported: string
  reportCount: number
  spamLikelihood: number
  status: 'high' | 'medium' | 'low'
}

interface CallData {
  type: string
  endedAt: string
  from?: string
  customer?: {
    number?: string
  }
  analysis?: {
    structuredData?: {
      is_spam?: boolean
      is_spam_percent?: number
    }
  }
}

export default function SpamRegistryPage() {
  const [spamData, setSpamData] = useState<SpamCall[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSpamData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://gateway.pinata.cloud/ipfs/bafkreifatpwvueb4b4has3awmh3bwcfgeephljskuudoybgiiczgamcapi')
        
        if (!response.ok) {
          throw new Error('Failed to fetch spam data from IPFS')
        }

        const data = await response.json()
        console.log('IPFS data:', data)

        // Process calls to extract spam data
        const spamCalls: SpamCall[] = []
        
        if (data.calls && Array.isArray(data.calls)) {
            console.log('Calls:', data.calls)
          data.calls.forEach((call: CallData) => {
            // Check if it's an inbound phone call and marked as spam
            if (call.type === 'inboundPhoneCall' && 
                call.analysis?.structuredData?.is_spam === true) {
              
                              // Extract phone number from the call data
                const rawPhoneNumber = call.customer?.number || call.from || 'Unknown'
                
                // Format to show only last 4 digits for privacy
                const formatPhoneNumber = (phone: string): string => {
                  if (phone === 'Unknown') return phone
                  
                  // Remove all non-digits
                  const cleaned = phone.replace(/\D/g, '')
                  
                  if (cleaned.length >= 4) {
                    const last4 = cleaned.slice(-4)
                    return `***-***-${last4}`
                  }
                  
                  return phone
                }
                
                const phoneNumber = formatPhoneNumber(rawPhoneNumber)
              
              // Format the date
              const lastReported = new Date(call.endedAt).toLocaleDateString()
              
              // Get spam likelihood percentage
              const spamLikelihood = call.analysis?.structuredData?.is_spam_percent || 0
              
              // Determine status based on spam likelihood
              let status: 'high' | 'medium' | 'low'
              if (spamLikelihood >= 80) {
                status = 'high'
              } else if (spamLikelihood >= 50) {
                status = 'medium'
              } else {
                status = 'low'
              }

              spamCalls.push({
                phoneNumber,
                lastReported,
                reportCount: 1, // Each call is one report
                spamLikelihood,
                status
              })
            }
          })
        }

        setSpamData(spamCalls)
        setError(null)
      } catch (err) {
        console.error('Error fetching spam data:', err)
        setError('Failed to load spam registry data')
      } finally {
        setLoading(false)
      }
    }

    fetchSpamData()
  }, [])

  // Filter spam data based on search term
  const filteredSpamData = spamData.filter(item =>
    item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className={`min-h-[calc(100vh-80px)] bg-[#f5f3f0] ${poppins.className}`}>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-6">Spam Registry</h1>
          <p className="text-xl text-gray-700 mx-auto max-w-3xl">
            Community database of known spam numbers, built on IPFS. These numbers were marked as spam by AIs and other users.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search phone numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <Button variant="outline" className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            Powered by IPFS • {spamData.length} numbers in registry
          </div>
        </div>

        {/* Spam Registry Table */}
        <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-pink-500" />
              Spam Numbers Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                <span className="ml-3 text-gray-600">Loading spam registry...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                <p>{error}</p>
              </div>
            ) : filteredSpamData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left py-4 px-6 font-semibold text-black">Phone Number</th>
                      <th className="text-left py-4 px-6 font-semibold text-black">Last Reported</th>
                      <th className="text-left py-4 px-6 font-semibold text-black">Reports</th>
                      <th className="text-left py-4 px-6 font-semibold text-black">Spam Likelihood</th>
                      <th className="text-left py-4 px-6 font-semibold text-black">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSpamData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-6 font-mono text-lg">
                          {item.phoneNumber}
                        </td>
                        <td className="py-4 px-6 text-gray-700">
                          {item.lastReported}
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-pink-500">
                            {item.reportCount}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-gray-700">
                            {item.spamLikelihood}%
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-none ${
                            item.status === 'high' 
                              ? 'bg-red-100 text-red-700 border border-red-300' 
                              : item.status === 'medium'
                              ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                              : 'bg-green-100 text-green-700 border border-green-300'
                          }`}>
                            {item.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'No spam numbers match your search' : 'No spam numbers found'}
              </div>
            )}
          </CardContent>
        </Card>

        {/* IPFS Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <AlertTriangle className="w-4 h-4" />
            Data stored on IPFS • Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
} 