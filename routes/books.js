const express = require('express')
const router = express.Router()
const Book = require('../models/book')

// All Books Route
router.get('/', async (req, res) => {
  res.send('Here Are all the Books')
})

// New Book Route
router.get('/new', (req, res) => {
  res.send('Newest Book Would be here')
})

// Create Book Route
router.post('/', async (req, res) => {
  res.send('Creating all the Books here') 
})

module.exports = router
