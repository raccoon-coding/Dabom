// channel_chart.js
// channel.js

// 박스 숫자를 직접 수치로 관리
const statsBoxMax = {
    subscribers: 325000, // 12.5만명
    videos: 245,         // 245개
    views: 8500000,      // 850만회
    rating: 5            // 별점 최대 5점
};

const statsData = {
    subscribers: {
        label: "월별 구독자 증가",
        data: [12000, 1400, 1700, 21000, 100000, 3200, 3600, 4000, 4200, 4700, 4900, 125000],
        color: "#ff6b6b",
        unit: "명"
    },
    videos: {
        label: "월별 영상 업로드 수",
        data: [10, 12, 15, 13, 160, 20, 17, 19, 21, 23, 20, 245],
        color: "#ffa94d",
        unit: "개"
    },
    views: {
        label: "월별 조회수",
        data: [500000, 7000000, 800000, 900000, 1000000, 1200000, 1300000, 1500000, 1700000, 1800000, 1900000, 8100000],
        color: "#4dabf7",
        unit: "회"
    },
    rating: {
        label: "월별 평균 별점",
        data: [0, 3, 3.9, 4.5, 4.6, 4.7, 4.6, 4.7, 2.1, 4.7, 4.7, 4.6],
        color: "#fcc419",
        unit: "점"
    }
};
const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
let currentType = "subscribers";
let statsChart;

function renderChart(type) {
    const ctx = document.getElementById('statsChart').getContext('2d');
    if (statsChart) statsChart.destroy();

    // 박스 숫자를 max로
    let yMax = statsBoxMax[type];

    // Y축 단위(예: 12.5만 → 13만으로 라운딩), rating은 5점 고정
    if (type !== "rating") {
        // 10단위, 100단위, 10,000단위 등으로 올림(가독성용)
        const pow = Math.pow(10, yMax.toString().length - 1);
        yMax = Math.ceil(yMax / pow) * pow;
    }

    statsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: statsData[type].label,
                data: statsData[type].data,
                backgroundColor: statsData[type].color + '22',
                borderColor: statsData[type].color,
                borderWidth: 2,
                tension: 0.38,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: statsData[type].color,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.parsed.y.toLocaleString()} ${statsData[type].unit}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: yMax,
                    ticks: {
                        font: { family: "'Noto Sans KR', sans-serif", size: 14 },
                        callback: function (value) {
                            if (type === 'views' || type === 'subscribers') {
                                if (value >= 10000) return (value / 10000) + '만';
                                return value.toLocaleString();
                            }
                            return value;
                        }
                    },
                    grid: {
                        color: "#ccc2",
                        lineWidth: 1
                    }
                },
                x: {
                    ticks: {
                        font: { family: "'Noto Sans KR', sans-serif", size: 13 }
                    },
                    grid: {
                        color: "#ccc2",
                        lineWidth: 1
                    }
                }
            }
        }
    });
}

window.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById('statsChart')) {
        renderChart(currentType);

        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('click', function () {
                document.querySelectorAll('.stat-card').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                const type = this.getAttribute('data-type');
                currentType = type;
                renderChart(type);
            });
        });
        document.querySelectorAll('.channel-nav-item').forEach(tabBtn => {
            tabBtn.addEventListener('click', function () {
                const tab = this.getAttribute('data-tab');
                if (tab === 'about') {
                    setTimeout(() => {
                        renderChart(currentType);
                    }, 100);
                }
            });
        });
    }
});




