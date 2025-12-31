"use client";
import { useState } from "react"
import Link from "next/link"
import StepEmail from "../components/auth/StepEmail"
import StepOtp from "../components/auth/StepOtp"
import StepPassword from "../components/auth/StepPassword"
import StepProfile from "../components/auth/StepProfile"
import { SignupProgress } from "../components/auth/SignupProgress"

export default function SignupPage() {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6F6F2]">
      <div className="bg-white shadow-[0px_0px_50px_0px_#01aa85] rounded-lg p-8 w-full max-w-md relative">
        {/* Top Tabs */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex bg-white rounded-md shadow">
          <Link href="/login" className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md">
            Login
          </Link>
          <Link href="/signup" className="px-6 py-2 bg-[#01A982] text-white font-semibold rounded-r-md">
            Signup
          </Link>
        </div>
        {/* Logo */}
        <div className="text-center mb-6 mt-4">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-[#01A982]">Hi-</span>Chat
          </h1>
          <p className="text-sm text-gray-600">
            Hello Everyone, We are chatzy
          </p>
          <p className="text-xs text-gray-400">
            Welcome to chatzy! Please login to your account.
          </p>
        </div>

        <SignupProgress currentStep={step} />

        {step === 0 && <StepEmail onNext={(email) => { setEmail(email); setStep(1) }} />}
        {step === 1 && <StepOtp email={email} onNext={() => setStep(2)} />}
        {step === 2 && <StepPassword email={email} onNext={(pwd) => { setPassword(pwd); setStep(3) }} />}
        {step === 3 && <StepProfile email={email} password={password} />}
      </div>
    </div>
  )
}
