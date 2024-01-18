require('dotenv').config()
const express = require('express')
const { sequelize } = require('./models')
const schoolsRouter = require('./routes/school')
const authRouter = require('./routes/auth')
const app = express()


app.use(express.static('./public'))
app.use(express.json())

app.use('/', authRouter)
app.use('/api', schoolsRouter)

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //await connectDB()
    //await associations()
    await sequelize.sync()
    app.listen(port, () => {
      console.log(`Server listening on port ${port}....`)
    })
  }
  catch (error) {
    console.log(error)
  } 
}

start()
