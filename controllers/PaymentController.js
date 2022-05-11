import successResponse from '../utils/response'

class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService
    this.createOrder = this.createOrder.bind(this)
    this.getOrder = this.getOrder.bind(this)
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
