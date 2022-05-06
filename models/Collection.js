import mongoose from 'mongoose'

const CollectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },

    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  { timestamps: true }
)

const CollectionModel = mongoose.model('Collection', CollectionSchema)

export default CollectionModel
