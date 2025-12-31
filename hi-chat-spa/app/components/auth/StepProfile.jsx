import { useState } from "react"
import { Input } from "../../ui/Input"
import { Button } from "../../ui/Button"
import useApi from "../../../../lib/api/useApi"
import { handleError } from "../../../../lib/errorHandler"

export default function StepProfile({ email, password }) {
  const [username, setUsername] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [error, setError] = useState("")
  const { setProfile } = useApi();

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!username) return setError("Username required")

    try {
      const res = await setProfile({username:username,avatar:avatar});
      if(res.status){
        alert("Signup successful!")
      }
    } catch (err) {
      handleError(err)
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files[0])}
        className="block w-full text-sm border p-2 rounded-md"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
            type="submit"
            // disabled={loading}
            className="w-full bg-[#01A982] text-white py-2 rounded-md font-semibold hover:bg-[#019970]"
          >
            Confirm
            {/* {loading ? "Logging in..." : "Login"} */}
          </Button>
    </form>
  )
}
