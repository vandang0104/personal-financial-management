const controller = require('../controllers/controller')
const User = require("../models/User");
const createAccValidate = require('../validate/createAccount')

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

    app.post('/login',controller.loginPost)

    app.get('/register',controller.registerGet)

    app.post(
        '/register', 
        createAccValidate.register,
        controller.register
    )
}