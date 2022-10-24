const express = require('express')
require('dotenv').config()
require('./config/db')
const port = process.env.PORT || 3333

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { errorHandeler } = require('./middelware/errorMiddleware')
app.use(errorHandeler)

const userRouter = require('./routers/userRoutes')
const roleRouter = require('./routers/roleRoutes')
// require('./middelware/generatorRole')

app.use('/api/auth', userRouter)
app.use('/api/user', roleRouter)


// const user = require('./routers/roleRoutes')
// app.get('/api/user', user)



app.listen(port, () => {
  console.log(`Server Started on port ${port}`)
})