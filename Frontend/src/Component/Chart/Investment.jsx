import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function Investment() {
  const [investmentData, setInvestmentData] = useState([]);

  useEffect(() => {
    const fetchInvestmentData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/financialdata/investment-growth");
        const data = await response.json();
        setInvestmentData(data.investmentGrowthByDate);
      } catch (error) {
        console.error("Error fetching investment data:", error);
      }
    };

    fetchInvestmentData();
  }, []);

  const dates = Object.keys(investmentData);
  const amounts = Object.values(investmentData);

  const series = [{ name: "Investments", data: amounts }];

  const options = {
    chart: {
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    xaxis: {
      type: "datetime",
      categories: dates,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
    </div>
  );
}

export default Investment;
