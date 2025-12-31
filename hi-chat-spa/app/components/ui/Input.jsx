export function Input({ className, ...props }) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#01A982] focus:outline-none w-full ${className}`}
    />
  )
}
