class ProductService {
  constructor(productRepository, AppError) {
    this.productRepository = productRepository
    this.AppError = AppError
  }

  async makeProduct(store, name, quantity, price, description) {
    if (!name) {
    }
    if (!quantity) {
      throw new this.AppError(400, 'Quantity is required')
    }
    if (!price) {
      throw new this.AppError(400, 'Price is required')
    }

    const product = await this.productRepository.create({
      name,
      quantity,
      price,
      description,
      store: store._id,
    })

    return product
  }
}

export default ProductService
