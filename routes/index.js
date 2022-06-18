const express = require('express')
const routerIndex = express.Router()
const Book = require('../models/book')

routerIndex.get('/', async (req, res) => {
  let books
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    books = []
  }
  //res.send('Jumbo Rafiki - Anything')
  res.render('index', {
    books: books
  })
})

// Export this router for use
module.exports = routerIndex
