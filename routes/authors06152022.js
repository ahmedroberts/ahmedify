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
    const authors = await Author.find({})
    res.render('authors/index', { 
      authors: authors,
      searchOptions: req.query
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
  // res.send('Create') after body-parser
  // res.send(req.body.name) Displays the request in the Body
  const author = new Author({
    name: req.body.name
  })
  // author.save((err, newAuthor) => {
  //   if (err) {
  //     res.render('authors/new', {
  //       author: author,
  //       errorMessage: 'Error creating Author'
  //     })
  //   } else {
  //     // res.redirect('authors/${newAuthor.id}') until it is built
  //     res.redirect('authors')
  //   }
  // })
//  res.send(req.body.name)
})


// Export this Authors router for use
module.exports = authorsRouter
