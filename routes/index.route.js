const controller = require('../controllers/controller')
const User = require("../models/User");

module.exports = (app) =>{
    app.get('/', (req, res) => {
        res.render('pages/home/index'); 
    });

    app.get('/dashboard',controller.renderDashboard)

    app.get('/incomes',(req,res)=>{
        res.render('pages/incomes/index') 
    })

    app.get('/expenses',(req,res)=>{
        res.render('pages/expenses/index') 
    })

    app.get('/login',(req,res)=>{
        res.render('pages/auth/login')
    })

    app.get('/register',(req,res)=>{
        res.render('pages/auth/register')
    })

    app.post('/register', controller.register)
}