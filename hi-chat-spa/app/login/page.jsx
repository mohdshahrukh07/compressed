"use client";
import { useState } from "react"
import Link from "next/link"
import { handleError } from "../lib/errorHandler"
import { loginUser} from "../lib/api/auth"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", remember: false })
  const [loading, setLoading] = useState(false)
  const route = useRouter();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === "checkbox" ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      handleError({ message: "Email and password are required" })
      return
    }

    setLoading(true)
    try {
      const res = await loginUser(form)
      if(res.status){
        route.push("/");
      }
      // TODO: Redirect to /chats after successful login
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6F6F2]">
      <div className="bg-white shadow-[0px_0px_50px_0px_#01aa85] rounded-lg p-8 w-full max-w-md relative">
        {/* Top Tabs */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex bg-white rounded-md shadow">
          <Link href="/login" className="px-6 py-2 bg-[#01A982] text-white font-semibold rounded-l-md">
            Login
          </Link>
          <Link href="/signup" className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md">
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <Input
              type="email"
              name="email"
              placeholder="test@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="w-4 h-4"
              />
              Remember Me
            </label>
            <Link href="/forgot-password" className="text-[#01A982] hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#01A982] text-white py-2 rounded-md font-semibold hover:bg-[#019970]"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}
