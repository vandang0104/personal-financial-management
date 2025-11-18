const User = require('../models/User')
const md5 = require('md5')

module.exports.renderDashboard = (req, res) => {
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

// [GET] /register
module.exports.registerGet = (req, res) => {
    res.render('pages/auth/register')
}

// [POST] /register
module.exports.register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ 
            username: req.body.username 
        });

        if (existingUser) {
            req.flash('error','Tài khoản đã tồn tại')
            return res.redirect('/register'); 
        }

        req.body.password = md5(req.body.password) 

        await User.create(req.body);
        req.flash('success','Đăng kí thành công')
        res.redirect('/login');
    } catch (error) {
        req.flash('error','Lỗi khi đăng kí tài khoản')
        res.redirect('/register');
    }
}

// [POST] /login
module.exports.loginPost = async (req, res) => { 
    try {
        const User = await User.findOne({ 
            username: req.body.username 
        });

        if (User && User.password === req.body.password ) {

        }

        res.redirect('/login');
    } catch (error) {
        console.log("Lỗi đăng ký:", error);
        res.redirect('/login');
    }
}