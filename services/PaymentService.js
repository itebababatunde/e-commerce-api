class PaymentService {
  constructor(productRepository, orderRepository, AppError) {
    this.productRepository = productRepository
    this.orderRepository = orderRepository
    this.AppError = AppError
  }

  async makeOrder(amount, products, store) {
    if (!amount) {
      throw new this.AppError(400, 'Amount is required')
    }

    if (products.length < 1) {
      throw new this.AppError(400, 'Order must contain at least one product')
    }
    const order = await this.orderRepository.create({ amount, store })
    products.forEach((element) => {
      order.products.push(element)
    })
    await order.save()
    return order
  }
  async fetchOrder(orderId) {
    const order = await this.orderRepository.find({ _id: orderId })
    return order
  }
}

export default PaymentService
