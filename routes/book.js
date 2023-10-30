const express = require ('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')
const path = require("path")
const fs = require("fs")
const uploadPath = path.join("public", Book.coverImageBasePath)
const multer = require("multer")

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) =>{
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})

// All books Routes
router.get('/', async(req, res)=>{
    let query = Book.find()
    if(req.query.title !=null && req.query.title != ''){
      query = query.regex('title', new RegExp(req.query.title, "i"))
    }
    if(req.query.publishedBefore !=null && req.query.publishedBefore != ''){
      query = query.lte("publishDate", req.query.publishedBefore)
    } 
    if(req.query.publishedAfter !=null && req.query.publishedAfter != ''){
      query = query.gte("publishDate", req.query.publishedAfter)
    } 
  try{
    const books = await query.exec()
    res.render("books/index", {
      books: books,
      searchOptions: req.query
     })
  }
  catch{
    res.render("/")
  }

})


// New books Roles
router.get('/new', async(request, res)=>{
  renderNewPage(res, new Book())
})


// creating book
router.post("/", upload.single('cover'), async(req, res)=>{
  console.log("req.file", req.file)
  const fileName = req.file != null ? req.file.filename: null
  console.log("filename", fileName)
  const book = new Book({
    title: req.body.title, 
    author: req.body.author, 
    publishDate: new Date(req.body.publishDate), 
    pageCount: req.body.pageCount, 
    coverImageName: fileName,
    description: req.body.description 
    })

  try{
      const newBook = book.save()
      console.log("newbook", newBook)
      res.redirect("books")
  }
  catch{
    console.log("this is in a ctachhhhhhhhhhhhhhhhhhhhhhhhh")
    if(book.coverImageName){ removeBookCover(book.coverImageName)}

    renderNewPage(res, book, true)
  }


})

function removeBookCover(filename){
  fs.unlink(path.join(uploadPath, filename), (Err)=> {
    
    if(Err) {console.error( Err)}
  })
}


async function renderNewPage(res, book, hasError = false){
  try{
    const authors = await Author.find({})
    const params = {authors: authors, book:book}
    if(hasError) params.errorMessage = 'Error creating book'
    res.render('books/new', params )
}
  catch{
      res.redirect('books')
  }

}

module.exports = router