// 7.  Check if this is development or production
// Make Sure .env is top-level file
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

// 1. Setting up the Express Server as an App
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

console.log(process.env.DATABASE_URL);

// 4. Require our routers
const indexRouter = require('./routes/index')

// 2. Setting defaults of the App
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('connection', () => console.log('Connected to Mongoose'))

// 5. Use Routers inside the app just like Controllers
app.use('/', indexRouter)

// 3. Start Running the App
// 9. Update this for Heroku
const PORT = process.env.PORT || '3000'
app.set("port", PORT)
app.listen(process.env.PORT || '3000')
