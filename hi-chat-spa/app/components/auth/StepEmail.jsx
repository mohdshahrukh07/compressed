import { useState } from "react"
import { Input } from "../../ui/Input"
import { Button } from "../../ui/Button"
import { handleError } from "../../../../lib/errorHandler"
import useApi from "../../../../lib/api/useApi"

export default function StepEmail({ onNext }) {
  const { checkEmail } = useApi();
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleEmailCheck = async (e) => {
    e.preventDefault()
    if (!email) return setError("Email is required")
    setLoading(true)
    try {
      const response = await checkEmail({email:email})
      if(response.status){
        onNext(email)
      }
    } catch (err) {
      handleError(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleEmailCheck} className="space-y-4">
      <Input
        type="email"
        placeholder="Enter your email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
        type="submit"
        // disabled={loading}
        className="w-full bg-[#01A982] text-white py-2 rounded-md font-semibold hover:bg-[#019970]"
      >
        Next
        {/* {loading ? "Logging in..." : "Login"} */}
      </Button>
    </form>
  )
}
