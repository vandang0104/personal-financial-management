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

// [POST] /register
module.exports.register = async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
}