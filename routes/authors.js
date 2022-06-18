const express = require('express')
const authorsRouter = express.Router()
const Author = require('../models/author')

// All Authors Route
authorsRouter.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', { 
      authors: authors,
      searchOptions: searchOptions
      // searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
  res.render('authors/index')
})

// New Author Route
authorsRouter.get('/new', (req, res) => {
  res.render('authors/new',  { author: new Author() })
})

// Create Author Route
authorsRouter.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  })
  try {
    const newAuthor = await author.save()
    // res.redirect('authors/${newAuthor.id}') until it is built
    res.redirect('authors')
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    })
  }
})

// Export this Authors router for use
module.exports = authorsRouter
