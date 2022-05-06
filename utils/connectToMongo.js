import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('DB connected successfully')
  } catch (err) {
    console.log(err)
    logger.error('DB connection not successful')
  }
}

export default connectToMongo
