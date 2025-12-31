export const SignupProgress = ({ currentStep }) => {
  const steps = ["step 1", "step 2", "step 3", "step 4"]

  return (
    <div className="flex justify-between mb-6 text-sm">
      {steps.map((step, index) => {
        const completed = index < currentStep
        const active = index === currentStep
        return (
          <div key={step} className="flex-1 text-center">
            <div
              className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center font-semibold
                ${completed ? "bg-green-500 text-white" : active ? "bg-[#01A982] text-white" : "bg-gray-300"}`}
            >
              {index + 1}
            </div>
            <p className="mt-2">{step}</p>
          </div>
        )
      })}
    </div>
  )
}
