import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
// import uniqueValidator from 'mongoose-unique-validator'
const StoreSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    storename: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    logo: {
      type: String,
      default:
        'https://res.cloudinary.com/studentpaddy/image/upload/v1638016229/WhatsApp_Image_2021-11-27_at_1.21.42_PM_woe865.jpg',
    },

    banner: {
      type: String,
      default:
        'https://res.cloudinary.com/studentpaddy/image/upload/v1638016229/WhatsApp_Image_2021-11-27_at_1.21.42_PM_woe865.jpg',
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],

    ratingCount: {
      type: Number,
    },

    ratingAverage: {
      type: Number,
    },

    customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
      },
    ],

    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
      },
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
)

StoreSchema.pre('save', async function (next) {
  //This would run only is password is actually modified
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 12)

  next()
})

StoreSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  return resetToken
}

StoreSchema.methods.verifyPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  return resetToken
}

const StoreModel = mongoose.model('Store', StoreSchema)

export default StoreModel
