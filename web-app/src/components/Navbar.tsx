'use client'

import { useState } from 'react'
import { BrowserProvider } from 'ethers'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Poppins } from "next/font/google"

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

export default function Navbar() {
  const [address, setAddress] = useState<string>('')

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum)
        // Request account access
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address.slice(0, 6) + '...' + address.slice(-4))
      } else {
        alert('Please install MetaMask!')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  return (
    <nav className={`bg-black text-white px-6 py-4 sticky fixed top-0 z-50 ${poppins.className}`}>
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
          CallBlock.ai
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/spam-registry" className="hover:text-gray-300 transition-colors">
            Spam Registry
          </Link>
          <Button
            onClick={connectWallet}
            variant="outline"
            className="bg-transparent border-white font-bold text-white hover:bg-white hover:text-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            {address || 'Connect Wallet'}
          </Button>
        </div>
      </div>
    </nav>
  )
} 