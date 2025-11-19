require("dotenv").config()
const express = require('express')
const path = require('path')
const flash = require("express-flash")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const app = express() 
const port = process.env.PORT

//connect database
const database = require("./config/database")
app.use(async (req, res, next) => {
  try {
    await database.connect();
    next(); 
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).send("Database connection failed");
  }
});

//setting template engine
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

//setting static files public
app.use(express.static(`${__dirname}/public`))

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//setting static files chart 
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/chart.js/dist')));


// Flash
app.use(cookieParser('asdkasjd'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// END Flash


//routing
const routes = require("./routes/index.route")
routes(app)

app.listen(port, ()=>{
    console.log(`listen at ${port}`) 
})

