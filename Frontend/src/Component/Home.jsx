import React from "react";
import homeImage from "./homeimg.png";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                Personal Finance Tracker
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Track your financial activities, including income, expenses, and
                investments, and gain insights with powerful analytics.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style={{width:"900px", height:"330px"}}
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Track Income
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Easily log your income from multiple sources and keep a record
                of your financial growth.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="p-4 grid gap-4">
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
                    className="mx-auto h-10 w-10"
                  >
                    <line x1="12" x2="12" y1="2" y2="22"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  <h3 className="text-xl font-bold">Add Income</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Record your earnings with a few clicks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Manage Expenses
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Keep your spending in check by categorizing and tracking your
                expenses.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="p-4 grid gap-4">
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
                    className="mx-auto h-10 w-10"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                    <path d="M3 6h18"></path>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <h3 className="text-xl font-bold">Add Expenses</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Log your spending and see where your money goes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Analyze Investments
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Monitor your portfolio and make informed decisions with in-depth
                investment analysis.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="p-4 grid gap-4">
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
                    className="mx-auto h-10 w-10"
                  >
                    <path d="M3 3v18h18"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                  </svg>
                  <h3 className="text-xl font-bold">Track Investments</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    View your assets and watch them grow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="w-full py-12 md:py-24 lg:py-32">
          <div class="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div class="space-y-3">
              <h2 class="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Experience the workflow.
              </h2>
              <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.rnatur
                perspiciatis quas id illo corporis magni ipsam.
              </p>
            </div>
            <div class="mx-auto w-full max-w-sm space-y-2">
              <form class="flex space-x-2">
                <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <button
                  class="inline-flex bg-black text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  type="submit"
                  onClick={() => navigate("./signup")}
                >
                  Sign Up
                </button>
              </form>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Sign up to get notified when we launch.
                <a class="underline underline-offset-2" href="#">
                  Terms &amp; Conditions
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Finance Tracker. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}

export default Home;
