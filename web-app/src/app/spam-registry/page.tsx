import { Poppins } from "next/font/google"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Plus, AlertTriangle, Shield } from "lucide-react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function SpamRegistryPage() {
  return (
    <div className={`min-h-[calc(100vh-80px)] bg-[#f5f3f0] ${poppins.className}`}>
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-6">Spam Registry</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Community-driven database of known spam numbers. Help protect others by reporting suspicious calls.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white p-8 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">Search Phone Numbers</h2>
          <div className="flex gap-4 max-w-md">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                placeholder="Enter phone number..."
                className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              Search
            </Button>
          </div>
        </div>

        {/* Report Section */}
        <div className="bg-white p-8 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">Report a Spam Number</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Spam Type</label>
              <select className="w-full px-4 py-3 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-500">
                <option>Select type...</option>
                <option>Robocall</option>
                <option>Scam Call</option>
                <option>Telemarketing</option>
                <option>Debt Collection</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Describe what happened..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <Button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-5 h-5 mr-2" />
            Report Number
          </Button>
        </div>

        {/* Recent Reports */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700">
                Latest spam numbers reported by the community. Help verify and rate these reports.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-500" />
                Verified Numbers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700">
                Community-verified spam numbers with high confidence ratings.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-500 mb-2">1,247</div>
            <div className="text-gray-700">Numbers Reported</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500 mb-2">892</div>
            <div className="text-gray-700">Verified Spam</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">156</div>
            <div className="text-gray-700">Reports This Week</div>
          </div>
        </div>
      </div>
    </div>
  )
} 