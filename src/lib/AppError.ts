class AppError extends Error {
  status
  code
  message

  constructor (msg: string, code?: number) {
    super()
    this.status = 200
    this.code = code
    this.message = msg
  }
}

export default AppError
