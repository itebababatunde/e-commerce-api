import Joi from 'joi'

const signUpSchema = Joi.object({
  storename: Joi.string().required(),
  fullName: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
  confirm_password: Joi.ref('password'),
}).with('password', 'confirm_password')

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required(),
  confirm_password: Joi.ref('password'),
})

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().integer().min(1),
  price: Joi.number(),
})

const updateProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  quantity: Joi.number().integer().min(1),
  price: Joi.number(),
})
export {
  signUpSchema,
  loginSchema,
  resetPasswordSchema,
  createProductSchema,
  updateProductSchema,
}
