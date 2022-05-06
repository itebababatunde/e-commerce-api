import successResponse from '../utils/response'

class ProductController {
  constructor(productService) {
    this.productService = productService
    this.createProduct = this.createProduct.bind(this)
  }

  async createProduct(req, res, next) {
    const { name, quantity, price, description } = req.body

    try {
      const product = await this.productService.makeProduct(
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
}

export default ProductController
