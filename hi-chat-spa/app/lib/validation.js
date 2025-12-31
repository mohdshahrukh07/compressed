export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
  return regex.test(password)
}
