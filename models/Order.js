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
  },
  { timestamps: true }
)

OrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products',
    populate: {
      path: 'id',
      model: 'Product',
    },
  })
  next()
})

const OrderModel = mongoose.model('Order', OrderSchema)

export default OrderModel
