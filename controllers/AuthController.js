import successResponse from '../utils/response'
import crypto from 'crypto'

class AuthController {
  constructor(authService, Email) {
    this.authService = authService
    this.Email = Email

    this.signUp = this.signUp.bind(this)
    this.logIn = this.logIn.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
    this.forgotPassword = this.forgotPassword.bind(this)
  }

  async signUp(req, res, next) {
    const { email, password, fullName, storename } = req.body

    try {
      const { store, accessToken } = await this.authService.signupService(
        email,
        password,
        fullName,
        storename
      )

      var data = {}
      var message = ''
      data.name = store.storename
      data.accessToken = accessToken
      message = `Created successfully `

      return successResponse(res, 201, message, data)
    } catch (error) {
      return next(error)
    }
  }

  async logIn(req, res, next) {
    const { email, password } = req.body
    try {
      const token = await this.authService.loginService(email, password)
      return successResponse(res, 200, 'log in successful', token)
    } catch (err) {
      return next(err)
    }
  }

  async forgotPassword(req, res, next) {
    const { email } = req.body
    try {
      const { resetToken, store } = await this.authService.recoveryService(
        email
      )
      const resetURL = `${req.protocol}/${req.get(
        'host'
      )}/api/v1/auth/reset-password/${resetToken}`

      await new this.Email(store, resetURL).resetPassword()
      return successResponse(res, 200, 'revovery mail sent', resetURL)
    } catch (err) {
      console.log(err)
      return next(err)
    }
  }

  async resetPassword(req, res, next) {
    const { token } = req.params
    const { password } = req.body

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const { store } = await this.authService.resetPasswordService(
      hashedToken,
      password
    )
    var data = null
    // data.accessToken = accessToken
    data.store = store.storename
    return successResponse(
      res,
      200,
      'Password successfully changed proceed to log in',
      data
    )
  }
}

export default AuthController
