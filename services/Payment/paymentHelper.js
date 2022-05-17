import axios from 'axios'
import crypto from 'crypto'
import dotenv from 'dotenv'
import AppError from '../../utils/error.js'
dotenv.config()
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

class paymentDependencies {
  generateReference = () => {
    console.log('here')
    const token = crypto.randomBytes(16).toString('hex')
    return token
  }

  validateWebhook(req) {
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex')

    var status = false
    if (hash == req.headers['x-paystack-signature']) {
      status = true
    }
    return status
  }

  async initializeTransaction(amount, email, reference, metadata) {
    try {
      //initialize the payment on paystack
      const { data } = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email,
          amount: amount * 100,
          reference,
          metadata,
        },
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const { authorization_url } = data.data

      return authorization_url
    } catch (err) {
      console.log(err)
      throw new AppError(400, `Error initializing payment \n ${err}`)
    }
  }
}

//generates jwt access token from user Id.

export default paymentDependencies
