import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    // Check if user email exists in localStorage
    const userEmail = localStorage.getItem("UserData");
    if (userEmail) {
      // Set the userEmail state with the current user's email
      setUser(userEmail);
    } else {
      // No user logged in, clear the userEmail state
      setUser(null);
    }
  }, [localStorage.getItem("UserData")]);
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Personal Finance Tracker
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Take control of your finances. Track spending, set budgets, and
                reach your financial goals with our easy-to-use finance tracker.
              </p>
            </div>
            {!user && (
              <form className="flex flex-col gap-2 max-w-sm mx-auto">
                <input
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 dark:border-gray-800"
                  placeholder="Enter your email"
                  type="email"
                />
                <button
                  className="inline-flex bg-black  items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  type="submit"
                  onClick={ () => navigate("/login")}
                >
                  Login
                </button>
                <p className="text-xs text-gray-900 dark:text-gray-400">
                  Sign up to get notified when we launch.
                  <a className="underline underline-offset-2" href="#">
                    Terms &amp; Conditions
                  </a>
                </p>
              </form>
            )}
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container grid items-center gap-4 px-4 md:px-6 lg:gap-10">
            <img
              src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width="700"
              height="400"
              alt="img"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
            />
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Your Personal Finance Companion
              </h2>
              <p className="mx-auto text-base text-gray-500 md:max-w-[600px] md:text-lg lg:text-xl dark:text-gray-400">
                Our finance tracker makes managing your money simple. See all
                your accounts in one place, track your spending, and set budgets
                to reach your financial goals.
              </p>
            </div>
          </div>
        </section>
        <div className="bg-gray-50/10 py-12 lg:py-20">
          <div className="container grid gap-4 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Effortlessly track your finances
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our platform provides the tools you need to manage your money
                  with ease. See all your accounts in one place, track your
                  spending, and reach your financial goals.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm   ">
                <img
                  src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="img"
                  width="400"
                  height="225"
                  className="aspect-video object-cover w-full"
                />
              </div>
              <div className="flex items-center rounded-xl overflow-hidden border border-gray-200  bg-white shadow-sm  hover:shadow-md ">
                <img
                  src="https://img.freepik.com/free-photo/stock-market-exchange-economics-investment-graph_53876-21258.jpg?t=st=1711858776~exp=1711862376~hmac=e8da4f57b46b4e386b6e59b00c78311465cb1a8ef349d013403b075cdfdf2786&w=740"
                  width="400"
                  height="225"
                  alt="Img"
                  className="aspect-video object-cover w-full"
                />
              </div>
              <div className="flex items-center rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm  hover:shadow-md ">
                <img
                  src="https://img.freepik.com/free-photo/map-lying-wooden-table_53876-23515.jpg?t=st=1711858851~exp=1711862451~hmac=23e214baf27488f01e8e4bd712b585ed66a9a3ba47ece4b0b93fe3badbb4243f&w=900"
                  alt="Img"
                  width="400"
                  height="225"
                  className="aspect-video object-cover w-full"
                />
              </div>
              <div className="flex items-center rounded-xl overflow-hidden border  border-gray-200 bg-white shadow-sm transition-colors hover:shadow-md ">
                <img
                  src="https://img.freepik.com/free-photo/paper-analysis_1098-15678.jpg?t=st=1711858899~exp=1711862499~hmac=906496d045430948cbe1a81bc59fd001af90e8db22f1a6a1007f1221d14766d7&w=826"
                  alt="Img"
                  width="400"
                  height="225"
                  className="aspect-video object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center gap-4 px-4 md:px-6 lg:gap-10">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Features to Help You Save
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our finance tracker comes with powerful features to make
                managing your money easy.
              </p>
            </div>

            <div className="container grid items-start gap-4 px-4 text-center md:grid-cols-2 md:justify-center md:gap-8 md:px-6 lg:grid-cols-4 lg:gap-4">
              <div className="flex flex-col items-center gap-2">
                <img
                  src="https://img.freepik.com/free-photo/revenue-operations-concept_23-2150902411.jpg?t=st=1711858169~exp=1711861769~hmac=45000d7aab8e4221c3dc93814bacb207326ac236d909f24fae984eb57fd6bb6c&w=826"
                  width="400"
                  height="250"
                  alt="Features"
                  className="aspect-image object-cover rounded-lg"
                />
                <h3 className="text-xl font-bold">Invest Tracking</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Track your spending against your budget.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src="https://img.freepik.com/free-photo/view-messy-office-workspace-with-smartphone_23-2150282044.jpg?t=st=1711858215~exp=1711861815~hmac=dc1ac4fa3f5757d82d60bd0c3cf47db4f443f374a401ebcdfd9bfb767d430e8e&w=826"
                  width="400"
                  height="250"
                  alt="Features"
                  className="aspect-image object-cover rounded-lg"
                />
                <h3 className="text-xl font-bold">Expense Tracking</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically categorize your expenses and see where your
                  money is going.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src="https://img.freepik.com/free-photo/calculator-numbers-paper-closeup-finance-concept_169016-24473.jpg?t=st=1711858471~exp=1711862071~hmac=dd0b2d4be7c85ecae888757400eabe7054ea2d7234bd9effa88e2828f157580e&w=826"
                  width="400"
                  height="250"
                  alt="Features"
                  className="aspect-image object-cover rounded-lg"
                />
                <h3 className="text-xl font-bold">Transction History</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You Can check Your Transction History.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src="https://img.freepik.com/free-photo/front-view-businessman-with-coins_23-2148569071.jpg?t=st=1711858512~exp=1711862112~hmac=cab069d91d9bb8bcb54761d74530522f79d891a50114efe1cc7da01790811d2b&w=826"
                  width="400"
                  height="250"
                  alt="Features"
                  className="aspect-image object-cover rounded-lg"
                />
                <h3 className="text-xl font-bold">Total Income</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You Can check Your Total Income.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-2">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold  sm:text-4xl">
                    Insights at Your Fingertips
                  </h2>
                  <p className="max-w-[70%] mr-2 text-gray-500   dark:text-gray-400">
                    Gain a deeper understanding of your finances with our
                    detailed reports and charts.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1571677246347-5040036b95cc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width="550"
                  height="310"
                  alt="Insights at Your Fingertips"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-2">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Secure and Private
                  </h2>
                  <p className="max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    We take your security seriously. Your financial data is
                    encrypted and your privacy is our priority.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src="https://img.freepik.com/free-vector/data-protection-law-illustration-concept_114360-971.jpg?w=826&t=st=1711857091~exp=1711857691~hmac=562b269cf4aeaa81dd1e762005c28b13813bcdf657eb5375642873b84d5d84dd"
                  width="550"
                  height="310"
                  alt="Secure and Private"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Track your finances. Reach your goals.
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                The easy way to manage your money. Say goodbye to financial
                stress.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <a className="text-xs hover:underline underline-offset-4" href="/">
          <div className="grid text-center md:grid-cols-5 items-center gap-4">
            <a
              className="flex items-center justify-center text-sm text-center font-semibold tracking-wide text-gray-900 dark:text-gray-50"
              href="/"
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
                className="w-5 h-5"
              >
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path>
              </svg>
              Personal Finance Tracker
            </a>
            <div className="flex gap-2 text-sm items-center">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                  className="w-4 h-4"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                Facebook
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                  className="w-4 h-4"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                Twitter
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                  className="w-4 h-4"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                Instagram
              </button>
            </div>
          </div>
        </a>
      </footer>
    </div>
  );
}

export default Home;
