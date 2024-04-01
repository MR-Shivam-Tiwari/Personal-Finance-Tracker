import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function Investment() {
  const [investmentData, setInvestmentData] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Retrieve UserData from local storage
    const userDataString = localStorage.getItem("UserData");

    // Parse the UserData string to extract email
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userEmail = userData.email;
      setEmail(userEmail);
      console.log("Email retrieved from local storage:", userEmail);
    }
  }, []);

  useEffect(() => {
    const fetchInvestmentData = async () => {
      try {
        const response = await fetch(`https://personal-finance-backend-nine.vercel.app/api/financialdata/investment-growth?email=${email}`);
        const data = await response.json();
        setInvestmentData(data.investmentGrowthByDate);
      } catch (error) {
        console.error("Error fetching investment data:", error);
      }
    };

    fetchInvestmentData();
  }, [email]);

  // Check if investmentData exists before processing it
  const processedData = investmentData ? Object.entries(investmentData).map(([date, items]) => {
    // Sum up amounts for each date
    const amount = items.reduce((total, item) => total + item.amount, 0);
    
    // Get the type for each date
    const type = items.length > 0 ? items[0].type : null;

    return { date, amount, type };
  }) : [];

  const dates = processedData.map(data => data.date);
  const amounts = processedData.map(data => data.amount);
  const types = processedData.map(data => data.type);

  const seriesData = processedData.map(data => ({ x: data.date, y: data.amount, type: data.type }));
  const series = [{ name: "Investments", data: seriesData }];
  
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
        format: "dd/MM/yy",
      },
      y: {
        formatter: function (value) {
          return `$${value.toFixed(2)}`;
        }
      },
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        const date = new Date(w.config.xaxis.categories[dataPointIndex]).toLocaleDateString();
        const amount = w.globals.series[seriesIndex][dataPointIndex];
        const type = w.config.series[seriesIndex].data[dataPointIndex].type;
        return `<div style="font-weight: bold; padding: 5px;">Date: ${date}</div><div style="padding: 5px;">Amount: <span style="color: green;">$${amount.toFixed(2)}</span></div><div style="padding: 5px;">Type: <span style="text-transform: uppercase;">${type}</span></div>`;
      }
      
      
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
