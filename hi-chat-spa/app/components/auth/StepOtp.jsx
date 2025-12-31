"use client"
import { useEffect, useRef, useState } from "react"
import useApi from "../../../../lib/api/useApi"
import { handleError } from "../../../../lib/errorHandler"

export default function StepOtp({ email, onNext }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const inputRefs = useRef([])
  const { checkOtp } = useApi();
  // Move focus automatically
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return // only digits
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Move to next input if current filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Handle backspace to move backward
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  // Watch OTP and auto-submit when all digits filled
  useEffect(() => {
    const allFilled = otp.every((d) => d !== "")
    if (allFilled) verifyOtp()
  }, [otp])

  const verifyOtp = async () => {
    const code = otp.join("")
    try {
      const res = await checkOtp({ email:email, otp: code })
      if(res.status){
        onNext()
      }
    } catch (err) {
      handleError(err)
      setError("Incorrect OTP. Please try again.")
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0].focus()
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-gray-600">Enter the 6-digit OTP sent to <b>{email}</b></p>

      {/* OTP Boxes */}
      <div className="flex justify-between">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`w-12 h-12 text-center border-2 rounded-md text-lg font-semibold 
              focus:outline-none transition-all 
              ${error ? "border-red-500" : "border-gray-300 focus:border-[#01A982]"}`}
          />
        ))}
      </div>

      {error && <p className="text-center text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}
