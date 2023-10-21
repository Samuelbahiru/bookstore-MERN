const express = require ('express')
const router = express.Router()

router.get('/', (request, res)=>{
    res.render('index')
})


module.exports = router