class PaymentService {
  constructor(transactionRepository, orderRepository, AppError) {
    this.transactionRepository = transactionRepository
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

  async completeOrder(orderId, email, address, fullName) {
    if (!email) {
      throw new this.AppError(400, 'Email is required')
    }
    if (!address) {
      throw new this.AppError(400, 'Address is required')
    }
    if (!fullName) {
      throw new this.AppError(400, 'Name is required')
    }

    const order = await this.orderRepository.findByIdAndUpdate(orderId, {
      email,
      address,
      fullName,
    })

    if (!order) {
      throw new this.AppError(400, 'Order does not exist')
    }

    return order
  }

  async makeTransaction(reference, authorization_url, orderId) {
    if (!reference) {
      throw new this.AppError(400, 'Reference is required')
    }
    if (!orderId) {
      throw new this.AppError(400, 'Order Id is required')
    }
    if (!authorization_url) {
      throw new this.AppError(400, 'Auth url is required')
    }

    const transaction = await this.transactionRepository.create({
      reference,
      authorization_url,
      order: orderId,
    })

    return transaction
  }
}

export default PaymentService
