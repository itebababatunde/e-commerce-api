class AppError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'AppError'
    this.status = status
  }

  getErrorResponse(res) {
    const resp = {
      success: false,
      error: this.message,
      status: this.status,
    }

    return res.status(this.status).send(resp)
  }
}

export default AppError
