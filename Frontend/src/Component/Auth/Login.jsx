import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: data.email,
        password: data.password,
      });
  
      console.log("Server Response", response.data);
  
      // Assuming your server sends user ID in the response
      const userId = response.data.userId;
  
      // Save email and user ID in localStorage
      localStorage.setItem("UserData", JSON.stringify({ email: data.email, userId }));
  
      alert("Login Successfully");
      navigate("/");
  
    } catch (error) {
      console.error("Error submitting form:", error.message);
      // Display a more user-friendly error message
      // You can customize this based on your server's response
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred while logging in. Please try again.");
      }
    }
  };
  

  return (
    <div className=" flex items-center justify-center ">
      <div className="py-5    px-4 justify-center space-y-2 md:space-y-2">
        <div className="flex flex-col rounded-lg border border-gray-200 bg-white w-[350px]  shadow-lg overflow-hidden dark:border-gray-800">
          <div className="grid w-full  items-stretch px-6 py-3">
            <div className="grid max-w-sm w-full gap-2 mx-auto">
              <h1
                className=" font-bold tracking-tighter  "
                style={{ fontSize: "30px" }}
              >
                Login
              </h1>
              <div className="mb-4">
                <p className="text-sm leading-none text-gray-500  mt-1">
                  Sign in to your account
                </p>
              </div>
            </div>
          </div>
          <form
            className="flex flex-col w-full px-6 gap-4"
            onSubmit={submitForm}
          >
            <div className="flex flex-col gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="email"
              >
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="john@example.com"
                type="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
                  for="password"
                >
                  Password
                </label>
              </div>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                type="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>
            <button
              className="inline-flex items-center whitespace-nowrap mb-8 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 h-10 w-full justify-center text-white"
              style={{ background: "black" }}
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <a
            className="inline-flex h-9 items-center rounded-md border  bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="/signup"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
