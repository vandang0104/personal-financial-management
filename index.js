const express = require('express')

const app = express() 
const port = 3000 

//setting template engine
app.set('views', './views')
app.set('view engine', 'pug')

//setting static files
app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.render('pages/dashboard/index.pug') 
})

app.get('/incomes',(req,res)=>{
    res.render('pages/incomes/index') 
})

app.get('/expenses',(req,res)=>{
    res.render('pages/expenses/index') 
})

app.listen(port, ()=>{
    console.log(`listen at ${port}`) 
})