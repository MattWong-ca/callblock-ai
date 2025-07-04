import Navbar from "@/components/Navbar"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      <Navbar />
      
      {/* Dashboard content will go here */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-black mb-8">Dashboard</h1>
        <p className="text-gray-700 text-lg">
          Dashboard content coming soon...
        </p>
      </div>
    </div>
  )
} 