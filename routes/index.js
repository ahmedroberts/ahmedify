const express = require('express')
const routerIndex = express.Router()

routerIndex.get('/', (req, res) => {
  //res.send('Jumbo Rafiki - Anything')
  res.render('index')
})

// Export this router for use
module.exports = routerIndex
