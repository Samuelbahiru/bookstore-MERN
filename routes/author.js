const express = require ('express')
const router = express.Router()
const Author = require('../models/author')
// All Authors Routes

router.get('/', (request, res)=>{
    res.render('authors/index')
})



// New Auhtor Role

router.get('/new', (request, res)=>{
    res.render('authors/new', {author: new Author()})
})

// creating author

router.post("/", (req, res)=>{
    const author = new Author({
        name: req.body.name
    })
    res.send(req.body.name)
})


module.exports = router