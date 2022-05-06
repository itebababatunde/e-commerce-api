class AuthService {
  constructor(storeRepository, AppError, loginDependencies) {
    this.storeRepository = storeRepository
    this.AppError = AppError
    this.loginDependencies = loginDependencies
  }

  async loginService(email, password) {
    if (!email) {
      throw new this.AppError(400, 'Email is required')
    }

    if (!password) {
      throw new this.AppError(400, 'Password is required')
    }

    // check that user with email exists
    const store = await this.storeRepository.findOne({ email }, '+password')

    if (!store) {
      throw new this.AppError(404, 'Account not found')
    }

    // check the input password matches the users password
    const passwordsMatch = await this.loginDependencies.comparePasswords(
      password,
      store.password
    )

    if (!passwordsMatch) {
      throw new this.AppError(400, 'invalid email or password')
    }

    // generate accessToken and send in request
    const accessToken = this.loginDependencies.generateAccessToken(
      String(store._id)
    )

    return { accessToken }
  }

  async signupService(email, password, fullName, storename) {
    // check that the email is not in use
    const existingStores = await this.storeRepository.find({
      email,
    })

    if (existingStores.length > 0) {
      throw new this.AppError(400, 'Account already exists')
    }

    const existingName = await this.storeRepository.find({
      storename,
    })

    if (existingName.length > 0) {
      throw new this.AppError(400, 'Store Name already taken')
    }

    // create store
    const store = await this.storeRepository.create({
      email,
      password,
      fullName,
      storename,
    }) //firstName, lastName, email, password, password);

    const accessToken = this.loginDependencies.generateAccessToken(
      String(store._id)
    )
    return { store, accessToken }
  }

  async recoveryService(email) {
    if (!email) throw new this.AppError(400, 'Email is required')

    const store = await this.storeRepository.findOne({ email })
    if (!store) throw new this.AppError(404, 'Store not found')
    const resetToken = store.createPasswordResetToken()
    if (!resetToken) {
      throw new this.AppError(400, 'Error generating reset token')
    }
    await store.save({ validateBeforeSave: false })

    //send as an email
    return { resetToken, store }
  }

  async resetPasswordService(token, password) {
    if (!token) throw new this.AppError(400, 'Token is required')
    var store = await this.storeRepository.findOne({
      passwordResetToken: token,
    })
    if (!store) throw new this.AppError(500, 'invalid or expired token')
    console.log(store._id)

    store.password = password
    store.passwordResetToken = undefined
    store.passwordResetExpires = undefined
    await store.save({ validateBeforeSave: false })
    console.log(store)
    //await store.save()

    // const accessToken = this.loginDependencies.generateAccessToken(
    //   String(store._id)
    // )

    return { store }
  }
}

export default AuthService
