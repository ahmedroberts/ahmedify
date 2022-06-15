// 7.  Check if this is development or production
if (process.env.NODE_ENV !== 'production'){
  require('dotenv')
}

// 1. Setting up the Express Server as an App
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// 4. Require our routers
const indexRouter = require('./routes/index')

// 2. Setting defaults of the App
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))



// 5. Use Routers inside the app just like Controllers
app.use('/', indexRouter)

// 3. Start Running the App
// 9. Update this for Heroku
const PORT = process.env.PORT || '3000'
app.set("port", PORT)
app.listen(process.env.PORT || '3000')
