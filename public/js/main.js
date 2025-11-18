document.addEventListener('DOMContentLoaded', () => {
    const ctxLine = document.getElementById('lineChart');
    if (ctxLine) {
        const formatLabelDate = (dateString) => {
             const date = new Date(dateString);
             return date.toLocaleDateString('vi-VN');
        };
        const formattedLabels = chartLabels.map(formatLabelDate);
        
        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: formattedLabels,
                datasets: [
                    {
                        label: 'Thu nhập',
                        data: chartIncomeData,
                        backgroundColor: 'rgba(32, 201, 151, 0.15)',
                        borderColor: '#20c997',
                        tension: 0.4, fill: true
                    },
                    {
                        label: 'Chi tiêu',
                        data: chartExpenseData,
                        backgroundColor: 'rgba(220, 53, 69, 0.15)',
                        borderColor: '#dc3545',
                        tension: 0.4, fill: true
                    }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
        });
    }

    const ctxIncome = document.getElementById('incomePieChart');
    if (ctxIncome) {
        new Chart(ctxIncome, {
            type: 'doughnut',
            data: {
                labels: incomeLabels,
                datasets: [{
                    data: incomeData,
                    backgroundColor: ['#20c997', '#28a745', '#198754', '#a3cfbb', '#d1e7dd'], // Tông màu xanh lá
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: '#adb5bd' } } }
            }
        });
    }

    const ctxExpense = document.getElementById('expensePieChart');
    if (ctxExpense) {
        new Chart(ctxExpense, {
            type: 'doughnut',
            data: {
                labels: expenseLabels,
                datasets: [{
                    data: expenseData,
                    backgroundColor: ['#dc3545', '#fd7e14', '#ffc107', '#e0a800', '#c69500'], 
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: '#adb5bd' } } }
            }
        });
    }
});

// Code xử lý Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time")) || 3000;
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
        setTimeout(() => {
            showAlert.parentElement.remove();
        }, 500);
    }, time);

    if (closeAlert) {
        closeAlert.addEventListener("click", () => {
            showAlert.classList.add("alert-hidden");
            setTimeout(() => {
                showAlert.parentElement.remove();
            }, 500);
        });
    }
}