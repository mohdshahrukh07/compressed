export function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`transition-all font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#01A982] ${className}`}
    >
      {children}
    </button>
  )
}
