import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    longitude: null,
    latitude: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { longitude, latitude } = position.coords;
        setData((prevData) => ({ ...prevData, longitude, latitude }));
      } catch (error) {
        console.error("Error getting location:", error.message);
      }
    };

    if (navigator.geolocation) {
      fetchLocation();
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://personal-finance-backend-nine.vercel.app/api/register", {
        email: data.email,
        password: data.password,
        username: data.username,
        location: {
          type: "Point",
          coordinates: [data.longitude, data.latitude],
        },
      });

      console.log("Server Response", response.data);
      alert("Registration  Successfully")
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert(
        error.response?.data?.message ||
          "An error occurred while signing up. Please try again."
      );
    }
  };


  return (
    <div className="px-4 py-6 space-y-6 md:py-12 md:space-y-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to create an account
        </p>
      </div>
      <div className="mx-auto max-w-sm space-y-4">
        <form onSubmit={submitForm}>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="username"
              placeholder="YourUsername"
              type="text"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              placeholder="m@example.com"
              type="email"
              onChange={handleChange}
              value={data.email}
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              type="password"
              onChange={handleChange}
              value={data.password}
            />
          </div>
          <button
            className=" mt-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-white h-10 px-4 py-2 w-full"
            style={{ background: "black" }}
          >
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <p>Already have an account?</p>
          <a className="text-blue-600 underline" href="/">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
