
document.addEventListener('DOMContentLoaded', () => {

    const dateFormat = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('vi-VN');
    }

    // Lấy phần tử canvas
    const ctx = document.getElementById('myChart');

    // Chỉ chạy code vẽ biểu đồ nếu tìm thấy thẻ canvas
    if (ctx) {
        // Lấy thẻ canvas để vẽ
        const chartContext = ctx.getContext('2d');

        // Cấu hình biểu đồ
        const chartData = {
            labels: incomes.map(inc => dateFormat(inc.date)),
            datasets: [
                {
                    label: 'Thu nhập',
                    data: incomes.map(income => income.amount),
                    backgroundColor: 'rgba(32, 201, 151, 0.2)',
                    borderColor: '#20c997',
                    tension: 0.2,
                    fill: true,
                },
                {
                    label: 'Chi tiêu',
                    data: expenses.map(expense => expense.amount),
                    backgroundColor: 'rgba(220, 53, 69, 0.2)',
                    borderColor: '#dc3545',
                    tension: 0.2,
                    fill: true,
                }
            ]
        };

        // Tạo biểu đồ mới
        const myChart = new Chart(chartContext, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
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