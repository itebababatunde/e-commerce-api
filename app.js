import express from 'express'
const app = express()
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/index.js'
import bodyparser from 'body-parser'
import errorMiddleWare from './utils/errorHandler'
dotenv.config()

app.use(morgan('combined'))
app.use(cors())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(express.json({ limit: '50mb' }))
app.use(express.static('public'))
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Welcome to the e-commerce API')
})

app.use('/api/v1', router)

app.get('*', (req, res) => {
  res.status(404).send({ success: false, error: 'Page not found', status: 404 })
})

//Error Handling
app.use((err, req, res, next) => {
  console.log(err)
  if (err.name === 'AppError') {
    return err.getErrorResponse(res)
  }
  errorMiddleWare(err, req, res, next)
})

export default app
