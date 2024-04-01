import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const NetSales = () => {
  const [financialData, setFinancialData] = useState([]);
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
    const fetchFinancialData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/financialdata?email=${email}`
        );
        const data = await response.json();
        setFinancialData(data);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    if (email) {
      fetchFinancialData();
    }
  }, [email]);

  const incomeData = financialData.map((data) =>
    data.income.reduce(
      (acc, curr) => {
        const date = new Date(Date.parse(curr.date)); // Parsing date string
        return {
          amount: acc.amount + curr.amount,
          date: date.toLocaleDateString(),
        };
      },
      { amount: 0 }
    )
  );

  const expensesData = financialData.map((data) =>
    data.expenses.reduce(
      (acc, curr) => {
        const date = new Date(Date.parse(curr.date)); // Parsing date string
        return {
          amount: acc.amount + curr.amount,
          date: date.toLocaleDateString(),
        };
      },
      { amount: 0 }
    )
  );

  const investmentsData = financialData.map((data) =>
    data.investments.reduce((acc, curr) => acc + curr.amount, 0)
  );

  const series = [
    {
      name: "Income",
      data: incomeData.map((item) => item.amount),
    },
    {
      name: "Expenses",
      data: expensesData.map((item) => item.amount),
    },
    {
      name: "Investments",
      data: investmentsData,
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      categories: incomeData.map((item) => item.date), // Using dates from income data
    },
    yaxis: {
      title: {
        text: "Amount",
      },
    },
    tooltip: {
      x: {
        formatter: function (val) {
          return "Date: " + val;
        },
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default NetSales;
