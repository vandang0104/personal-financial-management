const homeController = require('../controllers/home.controller');
const dashboardController = require('../controllers/dashboard.controller');
const financeController = require('../controllers/finance.controller');
const authController = require('../controllers/auth.controller'); 
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../validate/register.validate');

module.exports = (app) => {

    // Trang chủ
    app.get('/', authMiddleware.requireGuest,homeController.index);

    // Khu vực Dashboard 
    app.get('/dashboard', authMiddleware.requireAuth, dashboardController.index);
    
    // Quản lý Thu nhập
    app.get('/incomes', authMiddleware.requireAuth, financeController.incomes);
    app.post('/incomes/add', authMiddleware.requireAuth, financeController.addIncome);

    // Quản lý Chi tiêu
    app.get('/expenses', authMiddleware.requireAuth, financeController.expenses);
    app.post('/expenses/add', authMiddleware.requireAuth, financeController.addExpense); 

    // Khu vực xác thực 
    app.get('/login', authMiddleware.requireGuest,authController.login);
    app.post('/login', authController.loginPost);

    app.get('/register', authMiddleware.requireGuest,authController.register);
    app.post('/register', validate.register, authController.registerPost);

    // Đăng xuất 
    app.get('/logout', authController.logout);
};