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
      required: true,
    },
    image: {
      type: String,
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
    },
  },
  { timestamps: true }
)

const CollectionModel = mongoose.model('Collection', CollectionSchema)

export default CollectionModel
