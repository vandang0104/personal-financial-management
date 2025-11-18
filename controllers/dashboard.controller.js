const Transaction = require('../models/Transaction');

module.exports.index = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            userId: res.locals.user.id
        }).sort({
            date: 1
        }).lean();

        const incomeList = transactions.filter(t => t.type === 'income');
        const expenseList = transactions.filter(t => t.type === 'expense');

        const totalIncome = incomeList.reduce((sum, item) => sum + item.amount, 0);
        const totalExpense = expenseList.reduce((sum, item) => sum + item.amount, 0);
        const totalBalance = totalIncome - totalExpense;

        // Biểu đồ Đường 
        const uniqueDates = [...new Set(transactions.map(t => t.date.toISOString().split('T')[0]))].sort();

        const dataIncome = uniqueDates.map(date =>
            incomeList.filter(item => item.date.toISOString().split('T')[0] === date)
            .reduce((sum, item) => sum + item.amount, 0)
        );
        const dataExpense = uniqueDates.map(date =>
            expenseList.filter(item => item.date.toISOString().split('T')[0] === date)
            .reduce((sum, item) => sum + item.amount, 0)
        );

        //Biểu đồ tròn
        const getCategoryStats = (list) => {
            const stats = {};
            list.forEach(item => {
                if (!stats[item.category]) stats[item.category] = 0;
                stats[item.category] += item.amount;
            });
            return stats;
        };

        const expenseStats = getCategoryStats(expenseList);
        const expensePieLabels = Object.keys(expenseStats);
        const expensePieData = Object.values(expenseStats);

        const incomeStats = getCategoryStats(incomeList);
        const incomePieLabels = Object.keys(incomeStats);
        const incomePieData = Object.values(incomeStats);

        res.render('pages/dashboard/index', {
            totalBalance: totalBalance.toLocaleString('vi-VN'),
            totalIncome: totalIncome.toLocaleString('vi-VN'),
            totalExpense: totalExpense.toLocaleString('vi-VN'),

            // Dữ liệu biểu đồ đường
            labels: JSON.stringify(uniqueDates),
            dataIncome: JSON.stringify(dataIncome),
            dataExpense: JSON.stringify(dataExpense),

            // Dữ liệu biểu đồ tròn Chi tiêu
            expensePieLabels: JSON.stringify(expensePieLabels),
            expensePieData: JSON.stringify(expensePieData),

            // Dữ liệu biểu đồ tròn Thu nhập (MỚI)
            incomePieLabels: JSON.stringify(incomePieLabels),
            incomePieData: JSON.stringify(incomePieData)
        });

    } catch (error) {
        console.log(error);
        res.redirect('/login');
    }
}