const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}



const app = express()

// view configuration to use ejs
app.set("view engine", "ejs")    /// this is we are setting which engine is we are gone use for our views
app.set('views', __dirname + '/views')   /// this is settings the path where all of our views will be stored


// configration of layout(base html files and public files)
app.set('layout', 'layouts/layout')    // this is saying that our base html or layout is find to layouts/layout
app.use(expressLayouts)
app.use(express.static('public'))   // telling the expresss that where we put our public files


//database configuration

mongoose.connect("mongodb://127.0.0.1:27017/mybrary")
const db = mongoose.connection
db.on('error', error=>console.log(error))
db.on('open', ()=>console.log("connected to manago"))



// server configuration
app.listen(process.env.PORT || 3000)

// routing 

app.use('/', indexRouter)