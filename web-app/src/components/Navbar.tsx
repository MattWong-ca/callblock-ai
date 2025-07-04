import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
          CallBlock.ai
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/spam-registry" className="hover:text-gray-300 transition-colors">
            Spam Registry
          </Link>
          <Button
            variant="outline"
            className="bg-transparent border-white font-bold text-white hover:bg-white hover:text-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  )
} 