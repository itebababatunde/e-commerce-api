class ProductService {
  constructor(productRepository, collectionRepository, AppError) {
    this.productRepository = productRepository
    this.collectionRepository = collectionRepository
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

  async updateProduct(id, update) {
    const product = await this.productRepository.findByIdAndUpdate(id, update)
  }

  async fetchProduct(id) {
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new this.AppError(404, 'This product does not exist')
    }
    return product
  }

  async destroyProduct(store, id) {
    const product = await this.productRepository.findById(id)
    if (product.store.toString() != store._id) {
      throw new this.AppError(400, 'You do not own this product')
    }
    await this.productRepository.findByIdAndDelete(id)
  }

  async search(key) {
    const regex = new RegExp(key)
    const products = await this.productRepository.find({
      name: { $regex: regex, $options: 'i' },
    })
    return products
  }

  async makeCollection(store, name, description) {
    if (!name) {
      throw new this.AppError(400, 'Collection must have a name')
    }
    if (!description) {
      throw new this.AppError(400, 'Collection must have a description')
    }

    const colletion = await this.collectionRepository.create({
      store: store._id,
      name,
      description,
    })
    return colletion
  }

  async getCollection(id) {
    const colletion = await this.collectionRepository.findById(id)
    if (!colletion) {
      throw new this.AppError(404, 'Collection does not exist')
    }
    return colletion
  }

  async addProduct(product, collection) {
    const p = await this.productRepository.findById(product)

    if (!p) {
      throw new this.AppError(404, 'Product does not exist')
    }

    const c = await this.collectionRepository.findById(collection)
    if (!c) {
      throw new this.AppError(404, 'Collection does not exist')
    }

    const exists = await this.collectionRepository.find({
      $and: [{ _id: collection }, { products: `${product}` }],
    })
    console.log(exists)
    if (exists.length > 0) {
      throw new this.AppError(400, 'Product is already in this collection')
    }

    const updatedCollection = await this.collectionRepository.findByIdAndUpdate(
      collection,
      {
        $push: { products: product },
      }
    )
    return updatedCollection
  }

  async removeProduct(product, collection) {
    const p = await this.productRepository.findById(product)

    if (!p) {
      throw new this.AppError(404, 'Product does not exist')
    }

    const c = await this.collectionRepository.findById(collection)
    if (!c) {
      throw new this.AppError(404, 'Collection does not exist')
    }

    const exists = await this.collectionRepository.find({
      $and: [{ _id: collection }, { products: `${product}` }],
    })
    if (exists.length < 1) {
      throw new this.AppError(400, 'Product does not exist in this collection')
    }

    const updatedCollection = await this.collectionRepository.findByIdAndUpdate(
      collection,
      {
        $pull: { products: product },
      }
    )
    return updatedCollection
  }

  async updateCollection(id, object) {
    const c = await this.collectionRepository.findById(id)

    if (!c) {
      throw new this.AppError(404, 'Collection does not exist')
    }

    const updatedCollection = await this.collectionRepository.findByIdAndUpdate(
      id,
      object
    )

    return updatedCollection
  }

  async destroyCollection(store, id) {
    const col = await this.collectionRepository.findById(id)
    if (col.store.toString() != store._id) {
      throw new this.AppError(400, 'You do not own this product')
    }
    await this.collectionRepository.findByIdAndDelete(id)
  }
}

export default ProductService
