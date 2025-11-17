require("dotenv").config()
const express = require('express')
const path = require('path')

const app = express() 
const port = process.env.PORT

//connect database
const database = require("./config/database")
database.connect()

//setting template engine
app.set('views', './views')
app.set('view engine', 'pug')

//setting static files public
app.use(express.static('public'))

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//setting static files chart 
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/chart.js/dist')));

//routing
const routes = require("./routes/index.route")
routes(app)

app.listen(port, ()=>{
    console.log(`listen at ${port}`) 
})

