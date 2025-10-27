const express = require('express')
const path = require('path')

const app = express() 
const port = 3000 

//setting template engine
app.set('views', './views')
app.set('view engine', 'pug')

//setting static files public
app.use(express.static('public'))

//setting static files chart 
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/chart.js/dist')));

const renderDashboard = (req, res) => {
    // dữ liệu giả lập
    const history = [
        { type: 'income', amount: 50000, date: '2023-10-01' },
        { type: 'expense', amount: 12000, date: '2023-10-02' },
        { type: 'income', amount: 75000, date: '2023-10-05' },
        { type: 'expense', amount: 30000, date: '2023-10-06' },
        { type: 'income', amount: 20000, date: '2023-10-10' },
        { type: 'expense', amount: 15000, date: '2023-10-11' },
    ];

    // tách dữ liệu
    const incomes = history.filter(item => item.type === 'income');
    const expenses = history.filter(item => item.type === 'expense');

    res.render('pages/dashboard/index', {
        // truyền dữ liệu vào file PUG
        incomesData: JSON.stringify(incomes),
        expensesData: JSON.stringify(expenses)
    });
}

app.get('/',renderDashboard)

app.get('/incomes',(req,res)=>{
    res.render('pages/incomes/index') 
})

app.get('/expenses',(req,res)=>{
    res.render('pages/expenses/index') 
})

app.listen(port, ()=>{
    console.log(`listen at ${port}`) 
})