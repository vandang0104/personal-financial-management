const User = require('../models/User')
const md5 = require('md5')

// [GET] /register
module.exports.register = (req, res) => {
    res.render('pages/auth/register')
}

// [POST] /register
module.exports.registerPost = async (req, res) => {
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

// [GET] /login
module.exports.login = (req,res)=>{
    res.render('pages/auth/login')
}

// [POST] /login
module.exports.loginPost = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Tìm user trong DB
        const user = await User.findOne({
            username: username,
        });

        if (!user) {
            req.flash('error', 'Sai tên tài khoản hoặc mật khẩu!');
            res.redirect("back"); 
            return;
        }

        if (md5(req.body.password) !== user.password) {
            req.flash('error', 'Sai tên tài khoản hoặc mật khẩu!');
            res.redirect("back");
            return;
        }

        // lưu cookies
        res.cookie("token", user.id, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 giờ
        });

        req.flash('success', 'Đăng nhập thành công!');
        res.redirect("/dashboard");

    } catch (error) {
        console.log("Lỗi đăng nhập:", error); 
        res.redirect('/login');
    }
}