import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function Expenses() {
    const [chartData, setChartData] = useState({
        series: [], // Will be updated with fetched expense amounts
        options: {
          chart: {
            type: 'pie',
            width: 380,
          },
          labels: [], // Will be updated with fetched expense categories
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
    });

    useEffect(() => {
        const fetchExpensesData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/financialdata/expenses-breakdown");
                const data = await response.json();
                const categories = Object.keys(data.expensesBreakdown);
                const amounts = Object.values(data.expensesBreakdown);
                setChartData({
                    ...chartData,
                    series: amounts,
                    options: {
                        ...chartData.options,
                        labels: categories
                    }
                });
            } catch (error) {
                console.error("Error fetching expenses data:", error);
            }
        };

        fetchExpensesData();
    }, []);

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type={chartData.options.chart.type} width={chartData.options.chart.width} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default Expenses;
