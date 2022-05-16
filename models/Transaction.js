import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
    },
    status: {
      type: String,
      required: ['true', 'Transaction status is required'],
      enum: ['INITIATED', 'FAILURE', 'SUCCESS'],
      default: 'INITIATED',
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
