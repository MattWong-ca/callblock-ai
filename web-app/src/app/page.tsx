import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Phone, Zap, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function LandingPage() {
  return (
    <div className={`min-h-screen bg-[#f5f3f0] relative overflow-hidden ${poppins.className}`}>
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-gray-200 rounded-full opacity-30"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-gray-300 rounded-full opacity-20"></div>
        <div className="absolute top-60 left-1/4 w-8 h-8 bg-gray-200 rounded-full opacity-25"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-gray-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-14 h-14 bg-gray-300 rounded-full opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-gray-200 rounded-full opacity-15"></div>
      </div>

      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
        <h1 className="text-6xl md:text-7xl font-bold text-black mt-20 mb-6 leading-tight">
          AI phone numbers to prevent spams and scams
        </h1>
        <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
          Sign up for an AI proxy number that screens calls before they reach you
        </p>
        <div className="flex gap-10 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="text-xl bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 font-semibold rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              Sign up <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/dashboard" className="flex items-center mt-1 text-xl font-bold text-black hover:text-gray-700 transition-colors">
            Go to dashboard <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
            <h2 className="text-3xl font-bold text-black mb-4">The Spam Problem</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Americans lost $12.5 billion to phone scams in 2024. The average victim loses $1,400.<br /><br />Your number is likely already in a scammer&apos;s database.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2021/12/smartphone_alert_hero_1200x675.jpg"
              alt="Smartphone with spam alert notification"
              width={400}
              height={300}
              className="rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-black text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-pink-500 w-16 h-16 rounded-none flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-black mb-4">1. Get Your AI Number</h3>
            <p className="text-gray-700">Sign up and receive your dedicated AI proxy phone number</p>
          </div>
          <div className="text-center">
            <div className="bg-pink-500 w-16 h-16 rounded-none flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-black mb-4">2. AI Screens Calls</h3>
            <p className="text-gray-700">Your custom AI agent analyzes incoming calls and identifies spam/scams</p>
          </div>
          <div className="text-center">
            <div className="bg-pink-500 w-16 h-16 rounded-none flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-black mb-4">3. Only Real Calls Reach You</h3>
            <p className="text-gray-700">Legitimate calls are forwarded to your real number, while spam is blocked</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-black text-center mb-16">Benefits of Using CallBlock.ai</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="text-xl">
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-pink-500" />
                Advanced AI Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-md">
                Our AI learns and adapts to new spam patterns, providing cutting-edge protection against evolving
                threats.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="text-xl">
              <CardTitle className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-pink-500" />
                Instant Call Screening
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-md">
                Real-time analysis ensures legitimate calls reach you immediately while spam is blocked instantly.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="text-xl">
              <CardTitle className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-pink-500" />
                Keep Your Real Number Private
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-md">
                Use your AI number publicly while keeping your personal number completely private and secure.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="text-xl">
              <CardTitle className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-pink-500" />
                99.9% Spam Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-md">
                Industry-leading accuracy ensures you never miss important calls while blocking unwanted ones.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-black text-center mb-16">Simple Pricing</h2>
        <div className="flex justify-center">
          <Card className="border-2 border-black bg-white max-w-md w-full rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-black">Pro Plan</CardTitle>
              <div className="text-5xl font-bold text-pink-500 mt-4">
                $9<span className="text-lg text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Unlimited call screening</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>AI-powered spam detection</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Call forwarding to your real number</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>24/7 protection</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Detailed call reports</span>
              </div>
              <Link href="/dashboard">
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white mt-6 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
