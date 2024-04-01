import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [avtar, setAvtar] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      // Retrieve email from localStorage
      const userDataString = localStorage.getItem("UserData");

      // Check if user data is present in localStorage
      if (!userDataString) {
        console.error("User data not found in localStorage");
        return;
      }

      // Parse user data from string to object
      const userData = JSON.parse(userDataString);

      // Extract email from user data
      const userEmail = userData.email;

      // Check if email is present
      if (!userEmail) {
        console.error("Email not found in user data");
        return;
      }

      // Make a GET request to fetch the user profile
      const response = await axios.get(
        `https://personal-finance-backend-nine.vercel.app/get-profile?email=${encodeURIComponent(
          userEmail
        )}`
      );

      // Update state with the fetched user profile
      setUserProfile(response.data); // Assuming response.data contains user profile data
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Handle errors and show error messages to the user
    }
  };

  const handleSave = async () => {
    try {
      const userDataString = localStorage.getItem("UserData");
      const userData = JSON.parse(userDataString);
      const email = userData.email;

      if (!email) {
        console.error("Email not found in localStorage");
        return;
      }

      const data = {
        email: email,
        name: name,
        bio: bio,
        phone: phone,
        avtar: avtar,
      };

      console.log("Data being sent:", data);

      // Make a POST request to update the user profile
      const response = await axios.post(
        "https://personal-finance-backend-nine.vercel.app/api/update-profile",
        data
      );

      console.log("Profile updated successfully:", response.data);
      alert("Profile updated successfully");
      // Fetch the updated user profile immediately after updating
      await fetchUserProfile();
      window.location.reload();
      // Handle any additional logic or UI changes upon successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle errors and show error messages to the user
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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

  const handleLogout = () => {
    // Clear user data from localStorage on logout
    localStorage.removeItem("UserData");
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      <div>
        <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="bg-gray-50/90 w-full py-6">
            <div className="container flex items-center justify-center gap-4 px-4 text-center md:px-6">
              <div className="space-y-2 text-gray-900 dark:text-gray-100">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Profile
                </h1>
              </div>
            </div>
          </div>
          <div className="">
            <div className="bg-white dark:bg-gray-950 py-12">
              <div className=" flex flex-col items-center justify-center gap-4 px-4 text-center md:gap-10 md:px-6">
                <div className="">
                  {userProfile.avtar ? (
                    <img
                      width="150"
                      height="150"
                      alt="Avatar"
                      src={userProfile.avtar}
                      className="rounded-full"
                      style={{
                        aspectRatio: "150/150",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Avatar
                      style={{
                        aspectRatio: "150/150",
                        objectFit: "cover",
                      }}
                    >
                      U
                    </Avatar>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                      {userProfile.name || userProfile.username}
                    </h1>
                  </div>

                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold">Contact</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userProfile.phone}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <dl className="grid gap-1.5">
                      <div>
                        <dt className="inline font-medium">Email</dt>
                        <dd className="inline ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {userProfile.email}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="text-start">
                    <dl className="grid gap-1.5">
                      <div>
                        <dt className="inline font-medium">About</dt>
                        <dd className="inline ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {userProfile.bio}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="flex items-center justify-center w-full space-x-4">
                  <a className="rounded-full border border-gray-200 border-gray-200 bg-white w-10 h-10 flex items-center justify-center shadow-sm hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-300">
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
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a className="rounded-full border border-gray-200 border-gray-200 bg-white w-10 h-10 flex items-center justify-center shadow-sm hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-300">
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
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                    <span className="sr-only">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6 p-4">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Edit Profile
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="avtar"
              placeholder="Enter Your Avtar Url"
              value={avtar}
              onChange={(e) => setAvtar(e.target.value)}
            />
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="phone"
              placeholder="Enter Your Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-blue-500"
              id="bio"
              placeholder="Enter your bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-between mt-6">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"></span>
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center border shadow-lg rounded-md text-sm text-black font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  h-10 px-4 py-2 bg-gray-300  hover:bg-gray-200"
            >
              Save
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <div className="text-blue-500">Are you sure you want to log out?</div>
          <div className=" flex gap-2">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium  h-10 px-4 py-2 text-white"
              style={{ background: "black" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
