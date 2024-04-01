import React, { useEffect, useState } from "react";

function FinencialHistory() {
  const [financialHistory, setFinancialHistory] = useState({});
  const [financialCategory, setFinancialCategory] = useState([]);
  const [showHistoryTable, setShowHistoryTable] = useState(true);
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
    // Fetch financial data from API for financial history
    const fetchFinancialHistoryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/financialdata/financial-history?email=${email}`
        ); // Assuming API endpoint is available at '/financial-history'
        const data = await response.json();
        setFinancialHistory(data.financialHistory);
      } catch (error) {
        console.error("Error fetching financial history data:", error);
      }
    };

    fetchFinancialHistoryData();
  }, [email]); // Add email to the dependency array to trigger the effect when email changes

  useEffect(() => {
    // Fetch financial data from API for expenses category breakdown
    const fetchFinancialCategoryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/financialdata/expenses-category?email=${email}`
        ); // Assuming API endpoint
        const data = await response.json();
        setFinancialCategory(data.expensesBreakdown || []); // Using expensesBreakdown property from API, provide default empty array if it's undefined
      } catch (error) {
        console.error("Error fetching financial category data:", error);
      }
    };

    fetchFinancialCategoryData();
  }, [email]);

  const toggleTable = () => {
    setShowHistoryTable(!showHistoryTable);
  };
  return (
    <div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="w-full ">
            <div style={{ width: "100%", height: "100%" }}>
              <div className="flex flex-col w-full min-h-screen">
                <header className="flex items-center h-[60px] gap-4 px-6 border-b lg:gap-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                      Financial History
                    </h3>
                  </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-4">
                      <button
                        className={`inline-flex items-center justify-center  bg-white   rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-auto ${
                          showHistoryTable ? "bg-accent" : ""
                        }`}
                        onClick={toggleTable}
                        id="date"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:rr:"
                        data-state="closed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path>
                          <path d="M16 2v4"></path>
                          <path d="M8 2v4"></path>
                          <path d="M3 10h5"></path>
                          <path d="M17.5 17.5 16 16.25V14"></path>
                          <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
                        </svg>
                        All Time
                      </button>
                      <button
                        className={`inline-flex items-center justify-center bg-white whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-auto ${
                          !showHistoryTable ? "bg-accent" : ""
                        }`}
                        onClick={toggleTable}
                        id="category"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:rs:"
                        data-state="closed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                          <polyline points="2 17 12 22 22 17"></polyline>
                          <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                        Only Categories
                      </button>
                    </div>
                    {showHistoryTable ? (
                      <div
                        class="rounded-lg border border-gray shadow-lg overflow-y-auto "
                        style={{ height: "350px" }}
                      >
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead className="[&amp;_tr]:border-b">
                              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                  Date
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                  Type
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                  Category
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody className="[&amp;_tr:last-child]:border-0">
                              {financialHistory &&
                                Object.keys(financialHistory).map((date) =>
                                  financialHistory[date].map((entry, index) => (
                                    <tr
                                      key={index}
                                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    >
                                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                        {date}
                                      </td>
                                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                        {entry.type}
                                      </td>
                                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                        {entry.category}
                                      </td>
                                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-semibold">
                                        ${entry.amount.toFixed(2)}
                                      </td>
                                    </tr>
                                  ))
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div
                        class="rounded-lg border border-gray shadow-lg overflow-y-auto "
                        style={{ height: "350px" }}
                      >
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead className="[&amp;_tr]:border-b">
                              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                  Date
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                  Type
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                  Category
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody className="[&amp;_tr:last-child]:border-0">
                              {financialCategory.length > 0 ? (
                                financialCategory.map((entry, index) => (
                                  <tr
                                    key={index}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                  >
                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                      {entry?.date
                                        ? new Date(entry.date)
                                            .toISOString()
                                            .split("T")[0]
                                        : "-"}
                                    </td>
                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                      {entry?.type}
                                    </td>
                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                      {entry?.category}
                                    </td>
                                    <td className="p-4 align-middle text-right font-semibold [&amp;:has([role=checkbox])]:pr-0">
                                      ${entry?.amount.toFixed(2)}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="4" className="text-center p-4">
                                    Loading data...
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinencialHistory;
