import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES

class LogInDependencies {
  async comparePasswords(provided, stored) {
    const passwordsMatch = await bcrypt.compare(provided, stored)
    return passwordsMatch
  }

  generateAccessToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    })
  }
}

//generates jwt access token from user Id.

export default LogInDependencies
