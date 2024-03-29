import React, { useState, useEffect } from "react";
import NetSales from "./Chart/NetSales";
import Expenses from "./Chart/Expenses";
import Investment from "./Chart/Investment";
import NewFinancialData from "./Chart/NewFinancialData";
import axios from "axios";
import FinencialHistory from "./Chart/FinencialHistory";
function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalInvestments, setTotalInvestments] = useState(0);

  useEffect(() => {
    // Fetch total income
    axios
      .get("https://personal-finance-backend-nine.vercel.app/api/financialdata/total-income")
      .then((response) => {
        setTotalIncome(response.data.totalIncome);
      })
      .catch((error) => {
        console.error("Error fetching total income:", error);
      });

    // Fetch total expenses
    axios
      .get("https://personal-finance-backend-nine.vercel.app/api/financialdata/total-expenses")
      .then((response) => {
        setTotalExpenses(response.data.totalExpenses);
      })
      .catch((error) => {
        console.error("Error fetching total expenses:", error);
      });

    // Fetch total investments
    axios
      .get("https://personal-finance-backend-nine.vercel.app/api/financialdata/total-investments")
      .then((response) => {
        setTotalInvestments(response.data.totalInvestments);
      })
      .catch((error) => {
        console.error("Error fetching total investments:", error);
      });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="">
      <div className="px-4 mb-3">
        <button
          onClick={openModal}
          className="  whitespace-nowrap text-white bg-black flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-2 md:ml-auto"
        >
          New Financial Data
        </button>
        <div>
          <NewFinancialData isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
      <div className="grid md:grid-cols-3 px-4 gap-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className=" p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                ${totalIncome}
              </h3>
              <p className="text-sm text-muted-foreground">Total Income</p>
            </div>
          </div>
        </div>
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="space-y-1.5 p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                ${totalExpenses}
              </h3>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
            </div>
          </div>
        </div>

        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="space-y-1.5 p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                ${totalInvestments}
              </h3>
              <p className="text-sm text-muted-foreground">Total Investment</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 p-4">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm grid-cols-2"
          data-v0-t="card"
        >
          <div className="space-y-1.5 p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                Financial data over time
              </h3>
              {/* <p className="text-sm text-muted-foreground">
                Net sales for the last 6 months
              </p> */}
            </div>
          </div>
          <div className=" flex items-center justify-center">
            <div className="w-full ">
              <div style={{ width: "100%", height: "100%" }}>
                <NetSales />
              </div>
            </div>
          </div>
        </div>
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm grid-cols-2"
          data-v0-t="card"
        >
          <div className="space-y-1.5 p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                Expenses
              </h3>
              <p className="text-sm text-muted-foreground">
                Expenses breakdown by category
              </p>
            </div>
          </div>
          <div className=" flex items-center justify-center">
            <div className="w-full ">
              <div
                className="flex justify-center"
                style={{ width: "100%", height: "100%" }}
              >
                <Expenses />
              </div>
            </div>
          </div>
        </div>
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm grid-cols-2"
          data-v0-t="card"
        >
          <div className="space-y-1.5 p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                Investment Growth
              </h3>
              <p className="text-sm text-muted-foreground">
                Investment growth for the last some years
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full ">
              <div style={{ width: "100%", height: "100%" }}>
                <Investment />
              </div>
            </div>
          </div>
        </div>
        <div>
          <FinencialHistory />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// const domContainer = document.querySelector('#app');
// ReactDOM.render(<ApexChart />, domContainer);
