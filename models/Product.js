import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
// import uniqueValidator from 'mongoose-unique-validator'
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
)

ProductSchema.index({
  name: 'text',
})
const ProductModel = mongoose.model('Product', ProductSchema)

export default ProductModel
