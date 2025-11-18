const Transaction = require('../models/Transaction');

// [GET] /incomes
module.exports.incomes = (req, res) => {
    res.render('pages/incomes/index');
}

// [POST] /incomes/add 
module.exports.addIncome = async (req, res) => {
    try {
        await Transaction.create({
            userId: res.locals.user.id,
            type: 'income',
            amount: parseInt(req.body.amount),
            category: req.body.category,
            description: req.body.description
        });

        req.flash('success', 'Đã thêm khoản thu mới!');
        res.redirect('/incomes');
    } catch (error) {
        console.log("Lỗi thêm thu nhập:", error);
        req.flash('error', 'Lỗi hệ thống, vui lòng thử lại!');
        res.redirect('/incomes');
    }
}

// [GET] /expenses
module.exports.expenses = (req, res) => {
    res.render('pages/expenses/index');
}

// [POST] /expenses/add
module.exports.addExpense = async (req, res) => {
    try {
        await Transaction.create({
            userId: res.locals.user.id,
            type: 'expense',
            amount: parseInt(req.body.amount),
            category: req.body.category,
            description: req.body.description
        });

        req.flash('success', 'Đã thêm khoản chi mới!');
        res.redirect('/expenses');
    } catch (error) {
        console.log("Lỗi thêm chi tiêu:", error);
        req.flash('error', 'Lỗi hệ thống, vui lòng thử lại!');
        res.redirect('/expenses');
    }
}