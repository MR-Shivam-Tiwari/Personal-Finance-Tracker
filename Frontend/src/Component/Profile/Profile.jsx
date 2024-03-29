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
        <div
          className="space-y-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
          id="60xic6xhk1a"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white dark:bg-gray-950 py-12">
              <div className="container px-4">
                <div
                  className="grid md:grid-cols-3 md:gap-8 items-start max-w-6xl mx-auto space-y-6 text-center md:text-left"
                  id="10ucpofiwtv"
                >
                  <div className="flex flex-col gap-4 md:col-span-1"></div>
                  <div className="md:col-span-2 grid text-start gap-4 text-sm">
                    <div className="flex flex-col gap-2.5 items-center md:items-start">
                      {userProfile.avtar ? (
                        <Avatar
                          alt="User Avatar"
                          src={userProfile.avtar}
                          sx={{ width: 56, height: 56 }}
                        />
                      ) : (
                        <Avatar sx={{ width: 56, height: 56 }}>U</Avatar>
                      )}
                      <div className="flex flex-col gap-0.5 text-sm">
                        <h1 className="font-bold">
                          {userProfile.name || userProfile.username}
                        </h1>
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <h2 className="font-semibold">About</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {userProfile.bio}
                      </p>
                    </div>
                    <div className="grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold">Contact</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {userProfile.phone}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <dl className="grid gap-1.5">
                        <div>
                          <dt className="inline font-medium">Email</dt>
                          <dd className="inline ml-2 text-sm text-gray-500 dark:text-gray-400">
                            {userProfile.email}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6 p-4">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
          data-v0-t="card"
        >
          <div className="p-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-500"
                for="name"
              >
                Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-blue-500"
                id="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-500"
                for="phone"
              >
                Phone
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-blue-500"
                id="phone"
                placeholder="Enter Your Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-500"
                for="avtar"
              >
                Avtar Url
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-blue-500"
                id="avtar"
                placeholder="Enter Your Avtar Url"
                value={avtar}
                onChange={(e) => setAvtar(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-500"
                for="bio"
              >
                Bio
              </label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-blue-500"
                id="bio"
                placeholder="Enter your bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="flex items-center justify-center p-6">
            <button
              onClick={handleSave}
              className="w-full lg:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-blue-500 text-white"
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
