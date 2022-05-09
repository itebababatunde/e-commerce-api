class ProductService {
  constructor(productRepository, AppError) {
    this.productRepository = productRepository
    this.AppError = AppError
  }

  async make(store, name, quantity, price, description) {
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

  async update(id, update) {
    const product = await this.productRepository.findByIdAndUpdate(id, update)
  }

  async fetch(id) {
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new this.AppError(404, 'This product does not exist')
    }
    return product
  }

  async destroy(store, id) {
    const product = await this.productRepository.findById(id)
    if (product.store.toString() != store._id) {
      throw new this.AppError(400, 'You do not own this product')
    }
    await this.productRepository.findByIdAndDelete(id)
  }
}

export default ProductService
