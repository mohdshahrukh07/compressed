export function handleError(error) {
  const message = error?.message || "Something went wrong"
  alert(message) // Replace with toast from shadcn/ui if installed
  console.error(message)
}
