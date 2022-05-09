import successResponse from '../utils/response'

class ProductController {
  constructor(productService) {
    this.productService = productService
    this.createProduct = this.createProduct.bind(this)
    this.getProduct = this.getProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.updateProduct = this.updateProduct.bind(this)
    this.searchProduct = this.searchProduct.bind(this)
    this.createCollection = this.createCollection.bind(this)
    this.getCollection = this.getCollection.bind(this)
    this.addToCollection = this.addToCollection.bind(this)
    this.removeFromCollection = this.removeFromCollection.bind(this)
    this.deleteCollection = this.deleteCollection.bind(this)
    this.updateCollection = this.updateCollection.bind(this)
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

  async updateProduct(req, res, next) {
    const { name, quantity, price, description } = req.body
    const { id } = req.params
    var query = {}
    if (name) query.name = name
    if (quantity) query.quantity = quantity
    if (price) query.price = price
    if (description) query.description = description

    try {
      await this.productService.updateProduct(id, query)

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
      const product = await this.productService.fetchProduct(id)

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
      await this.productService.destroyProduct(req.user, id)

      var message = 'Product has been deleted successfully'

      return successResponse(res, 200, message)
    } catch (error) {
      return next(error)
    }
  }

  async searchProduct(req, res, next) {
    const { key } = req.params
    try {
      const products = await this.productService.search(key)
      var data = {}
      var message = 'Successful'
      data.count = products.length
      data.body = products

      return successResponse(res, 200, message, data)
    } catch (error) {
      return next(error)
    }
  }

  async createCollection(req, res, next) {
    const { name, description } = req.body
    try {
      const collection = await this.productService.makeCollection(
        req.user,
        name,
        description
      )
      var data = {}
      var message = 'Collection successfully created'
      data = collection

      return successResponse(res, 201, message, data)
    } catch (error) {
      return next(error)
    }
  }

  async getCollection(req, res, next) {
    const { collectionId } = req.params
    try {
      const collection = await this.productService.getCollection(collectionId)
      var data = {}
      var message = 'Success'
      data = collection
      return successResponse(res, 200, message, data)
    } catch (error) {
      return next(error)
    }
  }

  async addToCollection(req, res, next) {
    const { productId } = req.body
    const { collectionId } = req.params
    try {
      const added = await this.productService.addProduct(
        productId,
        collectionId
      )
      var data = {}
      var message = 'Added successfully'
      data = added

      return successResponse(res, 200, message, data)
    } catch (error) {
      return next(error)
    }
  }

  async removeFromCollection(req, res, next) {
    const { productId } = req.body
    const { collectionId } = req.params
    try {
      const removed = await this.productService.removeProduct(
        productId,
        collectionId
      )
      var data = {}
      var message = 'removed successfully'
      data = removed

      return successResponse(res, 200, message, data)
    } catch (error) {
      return next(error)
    }
  }

  async updateCollection(req, res, next) {
    const { collectionId } = req.params
    const { name, description } = req.body
    var query = {}
    if (name) query.name = name
    if (description) query.description = description

    try {
      await this.productService.updateCollection(collectionId, query)

      var message = 'Update successful'

      return successResponse(res, 200, message)
    } catch (error) {
      return next(error)
    }
  }

  async deleteCollection(req, res, next) {
    const { collectionId } = req.params

    try {
      await this.productService.destroyCollection(req.user, collectionId)

      var message = 'Collection has been deleted successfully'

      return successResponse(res, 200, message)
    } catch (error) {
      return next(error)
    }
  }
}

export default ProductController
