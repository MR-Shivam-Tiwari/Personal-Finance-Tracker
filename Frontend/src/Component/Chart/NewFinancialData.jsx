// NewFinancialData Component
import React, { useState } from "react";

function NewFinancialData({ isOpen, onClose }) {
  const [modalOpen, setModalOpen] = useState(isOpen);
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeDate, setIncomeDate] = useState("");
  const [expensesAmount, setExpensesAmount] = useState("");
  const [expensesCategory, setExpensesCategory] = useState("");
  const [expensesDate, setExpensesDate] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investmentDate, setInvestmentDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://personal-finance-backend-nine.vercel.app/api/financialdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          income: [{ amount: incomeAmount, date: incomeDate }],
          expenses: [
            {
              amount: expensesAmount,
              category: expensesCategory,
              date: expensesDate,
            },
          ],
          investments: [{ amount: investmentAmount, date: investmentDate }],
        }),
      });

      if (response.ok) {
        // Data successfully saved
        console.log("Financial data saved successfully");
        onClose(); // Close the modal
        alert("Financial data saved successfully")
        window.location.reload();
      } else {
        // Error occurred while saving data
        console.error("Error saving financial data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving financial data:", error.message);
    }
  };

  const toggleDatepicker = () => {
    setIsDatepickerOpen((prevState) => !prevState);
  };
  // Function to handle closing the modal
  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center ">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div className="relative w-[65%]  bg-white rounded-lg p-5">
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <form onSubmit={handleSubmit}>
                <div className="">
                  <div
                    className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-3xl"
                    data-v0-t="card"
                  >
                    <div className="flex flex-col space-y-1.5 p-4">
                      <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                        Financial Data
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Enter your financial information.
                      </p>
                    </div>
                    <div className="px-6 space-y-3">
                      <div>
                        <h3 className="text-lg leading-6 font-semibold">
                          Income
                        </h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="income-amount"
                          >
                            Amount
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="income-amount"
                            placeholder="Amount"
                            value={incomeAmount}
                            onChange={(e) => setIncomeAmount(e.target.value)}
                          />
                        </div>
                        <div className="space-y-3">
                          <div
                            className="text-sm mb-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="income-amount"
                          >
                            Date
                          </div>
                          <input
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2  text-left font-normal"
                            type="date"
                            value={incomeDate}
                            onChange={(e) => setIncomeDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg leading-6 font-semibold">
                          Expenses
                        </h3>
                      </div>

                      <div className="grid md:grid-cols-3 gap-5">
                        <div className="space-y-2">
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="income-amount"
                          >
                            Amount
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="income-amount"
                            placeholder="Amount"
                            value={expensesAmount}
                            onChange={(e) => setExpensesAmount(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="expenses-category"
                          >
                            Category
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="expenses-category"
                            placeholder="Category"
                            value={expensesCategory}
                            onChange={(e) =>
                              setExpensesCategory(e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-3">
                          <div
                            className="text-sm mb-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="income-amount"
                          >
                            Date
                          </div>
                          <input
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2  text-left font-normal"
                            type="date"
                            value={expensesDate}
                            onChange={(e) => setExpensesDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg leading-6 font-semibold">
                          Investment
                        </h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="income-amount"
                          >
                            Amount
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="income-amount"
                            placeholder="Amount"
                            value={investmentAmount}
                            onChange={(e) =>
                              setInvestmentAmount(e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-3">
                          <div
                            className="text-sm  mt-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="income-amount"
                          >
                            Date
                          </div>
                          <input
                            className="inline-flex  items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2  text-left font-normal"
                            type="date"
                            value={investmentDate}
                            onChange={(e) => setInvestmentDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center p-6">
                      <button
                        className="inline-flex bg-black text-white w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewFinancialData;
