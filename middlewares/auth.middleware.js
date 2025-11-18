const User = require('../models/User');

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash('error', 'Vui lòng đăng nhập!');
        res.redirect('/login');
        return;
    }

    const user = await User.findOne({ _id: req.cookies.token });

    if (!user) {
        req.flash('error', 'Tài khoản không hợp lệ!');
        res.redirect('/login');
        return;
    }
    res.locals.user = user;

    next(); 
}