import dotenv from 'dotenv'
import http from 'http'
import app from './app.js'

import connectToMongo from './utils/connectToMongo.js'
dotenv.config()

const port = process.env.PORT || 3000
const server = http.createServer(app)

const startServer = async () => {
  console.log('Connecting to the databse')
  await connectToMongo()
  server.listen(port, () => {
    console.log(`
        ################################################
        🛡️  Server listening on port: ${port} 🛡️
        ################################################
        SERVER IN ${process.env.NODE_ENV} MODE
      `)
  })
}

startServer()

// process.on('unhandledRejection', (err) => {
//   console.log('Unhandled rejection, shutting down')
//   server.close(() => {
//     process.exit(1)
//   })
// })

export default app
