import React from "react";

function ContactUs() {
  return (
    <div className="lg:px-14">
      <div className="w-full py-12 md:py-14 lg:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">
                  Contact Us
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Have questions? We're here to help. Contact us using the form
                  below or the information to the right.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
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
                    className="w-6 h-6 flex-shrink-0"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div className="space-y-1.5">
                    <p className="font-semibold">Call us</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      +91 8726490079
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
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
                    className="w-6 h-6 flex-shrink-0"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <div className="space-y-1.5">
                    <p className="font-semibold">Email us</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                     shivamt2023@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
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
                    className="w-6 h-6 flex-shrink-0"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <div className="space-y-1.5">
                    <p className="font-semibold">Visit us</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      123 Lajpat Nagar, Delhi, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                    Contact Form
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="first-name"
                      >
                        First name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="first-name"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="last-name"
                      >
                        Last name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="last-name"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="email"
                    >
                      Email
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="phone"
                    >
                      Phone
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="phone"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="message"
                    >
                      Message
                    </label>
                    <textarea
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                      id="message"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <button className="inline-flex bg-black w-full text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Send message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
