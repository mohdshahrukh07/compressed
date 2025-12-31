import { useState } from "react"
import { Input } from "../../ui/Input"
import { Button } from "../../ui/Button"
import { validatePassword } from "../../../../lib/validation"
import useApi from "../../../../lib/api/useApi"
import { handleError } from "../../../../lib/errorHandler"

export default function StepPassword({ email,onNext }) {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const { newPassword } = useApi();
  const handlePassword = async (e) => {
    e.preventDefault()
    if (!validatePassword(password)){
      return setError("Password must include uppercase, number & special char.")
    }
    else if (password !== confirm) {
      return setError("Passwords do not match")
    }
    else{
      setError("")
          // setLoading(true)
          try {
           const response = await newPassword({email:email,password:password,confirm_password:confirm})
           if(response.status){
             onNext();
           }
          } catch (err) {
            handleError(err)
            setError(err.message)
          } finally {
            // setLoading(false)
          }
    }
  }

  return (
    <form onSubmit={handlePassword} className="space-y-4">
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
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
