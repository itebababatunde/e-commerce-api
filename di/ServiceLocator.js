import Repository from '../repository/Repository'

import StoreModel from '../models/Store'
import ProductModel from '../models/Product'
import CollectionModel from '../models/Collection'
import OrderModel from '../models/Order'

import AuthService from '../services/Auth/AuthService'
import ProductService from '../services/ProductService'
import PaymentService from '../services/PaymentService'

import AppError from '../utils/error'
import LogInDependencies from '../services/Auth/index'

export default class ServiceLocator {
  static storeRepository = new Repository(StoreModel)
  static productRepository = new Repository(ProductModel)
  static collectionRepository = new Repository(CollectionModel)
  static orderRepository = new Repository(OrderModel)

  static loginDependencies = new LogInDependencies()

  static authService = new AuthService(
    this.storeRepository,
    AppError,
    this.loginDependencies
  )

  static productService = new ProductService(
    this.productRepository,
    this.collectionRepository,
    AppError
  )

  static paymentService = new PaymentService(
    this.productRepository,
    this.orderRepository,
    AppError
  )
}
