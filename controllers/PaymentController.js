import successResponse from '../utils/response'
import Email from '../utils/Email'

class PaymentController {
  constructor(paymentService, paymentDependencies) {
    this.paymentService = paymentService
    this.paymentDependencies = paymentDependencies
    this.createOrder = this.createOrder.bind(this)
    this.getOrder = this.getOrder.bind(this)
    this.initiateTransction = this.initiateTransction.bind(this)
  }

  async createOrder(req, res, next) {
    const { amount, products } = req.body
    const { storeId } = req.params
    try {
      const order = await this.paymentService.makeOrder(
        amount,
        products,
        storeId
      )

      return successResponse(res, 201, 'order created successfully', order)
    } catch (err) {
      next(err)
    }
  }

  async initiateTransction(req, res, next) {
    const { email, address, fullname } = req.body
    const { orderId } = req.params

    try {
      const order = await this.paymentService.completeOrder(
        orderId,
        email,
        address,
        fullname
      )
      const token = await this.paymentDependencies.generateReference()

      var metadata = {
        custom_fields: [
          {
            "display_name": 'Invoice ID',
            "variable_name": 'order',
            "value": 209,
          },
        ],
        cancel_action: 'https://twitter.com',
      }

      const authorization_url =
        await this.paymentDependencies.initializeTransaction(
          order.amount,
          order.email,
          token,
          metadata
        )
      const transaction = await this.paymentService.makeTransaction(
        token,
        authorization_url,
        orderId
      )

      await new Email(order, authorization_url).makePayment()

      return successResponse(
        res,
        200,
        'order created successfully',
        transaction
      )
    } catch (err) {
      next(err)
    }
  }

  async getOrder(req, res, next) {
    const { storeId, orderId } = req.params
    try {
      const order = await this.paymentService.fetchOrder(orderId)

      return successResponse(res, 200, 'successful', order)
    } catch (err) {
      next(err)
    }
  }
}

export default PaymentController
