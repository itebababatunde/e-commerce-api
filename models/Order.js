import mongoose from 'mongoose'

var cartItemSchema = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
    },
  },
  { _id: false }
)

const OrderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    products: [cartItemSchema],
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    fullname: {
      type: String,
    },
    shipping: {
      type: Number,
      default: 1000,
    },
    status: {
      type: String,
      required: ['true', 'Transaction status is required'],
      enum: ['PENDING', 'PAID', 'DELIVERED'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
)

OrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products',
    populate: {
      path: 'id',
      model: 'Product',
      select: { name: 1, quantity: 1, price: 1 },
    },
  })
  next()
})

const OrderModel = mongoose.model('Order', OrderSchema)

export default OrderModel
