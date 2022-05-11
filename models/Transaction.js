import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
  {
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem',
      },
    ],
  },
  { timestamps: true }
)

CartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'items',
    select: 'product quantity',
  })
  next()
})

const CartModel = mongoose.model('Cart', CartSchema)

export default CartModel
