const express = require ('express')
const router = express.Router()
const Author = require('../models/author')
// All Authors Routes

router.get('/', async(req, res)=>{
let searchOptions = {}
 if(req.query.name != null && req.query.name !== ''){
    searchOptions.name = new RegExp(req.query.name)
}

    try{
        console.log("Searchoptions", searchOptions.name)
        const authors = await Author.find(searchOptions)
        console.log("authors", authors)
        res.render('authors/index', {authors: authors, searchOptions: req.query })
    }
    catch{
        res.redirect('/')
    }
   
})



// New Auhtor Role

router.get('/new', (request, res)=>{
    res.render('authors/new', {author: new Author()})
})

// creating author

router.post("/", async(req, res)=>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()    //this is beacuse everything in mongodb is done asynchronusly
        //  res.redirect(`authors/${newAuthor.id}`)
            res.redirect('authors')
    }
    catch{
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating the Author'
        })
    }
    // author.save().then((err, newAuthor)=>{
    //     if(err){
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: 'Error has happend'
    //         })
    //     }
    //     else{
    //         // res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect(`authors`)
    //     }
    // })
 
})


module.exports = router