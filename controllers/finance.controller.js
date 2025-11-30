const Transaction = require('../models/Transaction');

// [GET] /incomes
module.exports.incomes = async (req, res) => {
    try {
        const incomes = await Transaction.find({
            userId: res.locals.user.id,
            type: 'income'
        }).sort({ date: -1 });

        res.render('pages/incomes/index', {
            incomes: incomes
        });
    } catch (error) {
        console.log(error);
        res.redirect('/dashboard');
    }
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
module.exports.expenses = async (req, res) => {
    try {
        const expenses = await Transaction.find({
            userId: res.locals.user.id,
            type: 'expense'
        }).sort({ date: -1 });

        res.render('pages/expenses/index', {
            expenses: expenses
        });
    } catch (error) {
        console.log(error);
        res.redirect('/dashboard');
    }
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

// [GET] /incomes/delete/:id
module.exports.deleteIncome = async (req, res) => {
    try {
        const id = req.params.id;
        await Transaction.findOneAndDelete({
            _id: id,
            userId: res.locals.user.id 
        });

        req.flash('success', 'Đã xóa khoản thu thành công!');
        res.redirect('/incomes');
    } catch (error) {
        console.log(error);
        req.flash('error', 'Xóa thất bại!');
        res.redirect('/incomes');
    }
}

// [GET] /expenses/delete/:id
module.exports.deleteExpense = async (req, res) => {
    try {
        const id = req.params.id;
        await Transaction.findOneAndDelete({
            _id: id,
            userId: res.locals.user.id
        });

        req.flash('success', 'Đã xóa khoản chi thành công!');
        res.redirect('/expenses');
    } catch (error) {
        console.log(error);
        req.flash('error', 'Xóa thất bại!');
        res.redirect('/expenses');
    }
}