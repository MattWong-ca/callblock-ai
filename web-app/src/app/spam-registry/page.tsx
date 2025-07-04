import { Poppins } from "next/font/google"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Shield, Search, Filter } from "lucide-react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

// Mock data - in real implementation this would come from IPFS
const spamData = [
  {
    phoneNumber: "+1 (555) 999-8888",
    lastReported: "2024-01-15",
    reportCount: 47,
    status: "high"
  },
  {
    phoneNumber: "+1 (555) 777-6666",
    lastReported: "2024-01-14",
    reportCount: 23,
    status: "medium"
  },
  {
    phoneNumber: "+1 (555) 444-3333",
    lastReported: "2024-01-13",
    reportCount: 12,
    status: "low"
  },
  {
    phoneNumber: "+1 (555) 111-2222",
    lastReported: "2024-01-12",
    reportCount: 8,
    status: "low"
  },
  {
    phoneNumber: "+1 (555) 888-7777",
    lastReported: "2024-01-11",
    reportCount: 35,
    status: "high"
  }
]

export default function SpamRegistryPage() {
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-4 px-6 font-semibold text-black">Phone Number</th>
                    <th className="text-left py-4 px-6 font-semibold text-black">Last Reported</th>
                    <th className="text-left py-4 px-6 font-semibold text-black">Reports</th>
                    <th className="text-left py-4 px-6 font-semibold text-black">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {spamData.map((item, index) => (
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