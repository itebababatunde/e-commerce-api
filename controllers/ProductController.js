import successResponse from '../utils/response'

class ProductController {
  constructor(productService) {
    this.productService = productService
    this.createProduct = this.createProduct.bind(this)
    this.getProduct = this.getProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.updateProduct = this.updateProduct.bind(this)
  }

  async createProduct(req, res, next) {
    const { name, quantity, price, description } = req.body

    try {
      const product = await this.productService.make(
        req.user,
        name,
        quantity,
        price,
        description
      )

      var data = {}
      var message = ''
      data = product
      message = `Created successfully `

      return successResponse(res, 201, message, data)
    } catch (error) {
      return next(error)
    }
  }

  async updateProduct(req, res, next) {
    const { name, quantity, price, description } = req.body
    const { id } = req.params
    var query = {}
    if (name) query.name = name
    if (quantity) query.quantity = quantity
    if (price) query.price = price
    if (description) query.description = description

    try {
      await this.productService.update(id, query)

      var data = {}
      var message = 'Update successful'

      return successResponse(res, 200, message, data)
    } catch (error) {
      return next(error)
    }
  }

  async getProduct(req, res, next) {
    const { id } = req.params

    try {
      const product = await this.productService.fetch(id)

      var data = {}
      var message = 'Successful'
      data = product

      return successResponse(res, 200, message, data)
    } catch (error) {
      return next(error)
    }
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params

    try {
      await this.productService.destroy(req.user, id)

      var message = 'Product has been deleted successfully'

      return successResponse(res, 200, message)
    } catch (error) {
      return next(error)
    }
  }
}

export default ProductController
