import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
    },
    status: {
      type: String,
      required: ['true', 'Transaction status is required'],
      enum: ['PENDING', 'SUCCESSFUL', 'FAILED'],
      default: 'PENDING',
    },
    authorization_url: {
      type: String,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  },
  { timestamps: true }
)

const TransactionModel = mongoose.model('Transaction', TransactionSchema)

export default TransactionModel
