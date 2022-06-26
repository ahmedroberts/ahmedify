const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')
// const imageMimeTypes = ['image/jpeg', 'image/gif', 'image/png' ]

// All Books Route
router.get('/', async (req, res) => {
  let query = Book.find()
  // Search Titles
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  // Search Before (less than date)
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishDate', req.query.publishedBefore)
  }
  // Search After (greates than date)
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('publishDate', req.query.publishedAfter)
  }
  try {
    const books = await query.exec()
    res.render('books/index', {
      books: books,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
  
})

// New Book Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Book())
})

// Create Book Route With FilePond JSon.String
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description
  })
  // // Function to upload JSOn encodeed file to db
  // saveCover(book, req.body.cover)

  try {
    const newBook = await book.save()
    // res.redirect(`books/${newBook.id}`) When we get this built
    res.redirect('books')
  } catch {
    renderNewPage(res, book, true)
  }
})

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({})
    const params = { 
      authors: authors,
      book: book
    }
    if (hasError) params.errorMessage = 'Error Creating Book'
    res.render('books/new', params)
  } catch (err) {
    console.log(err)
    res.redirect('books')
  }
}

// // Function to save JSON encoded funtion
// function saveCover(book, coverEncoded) {
//   console.log('here: ',coverEncoded)
//   if (coverEncoded == null) return
//   const cover = JSON.parse(coverEncoded)
//   if (cover != null && imageMimeTypes.includes(cover.mimetype)) {
//     book.coverImage = new Buffer.from(cover.data, 'base64')
//     book.coverImageType = cover.type
//   }
// }

module.exports = router
