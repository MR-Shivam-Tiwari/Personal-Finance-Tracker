import {
  Avatar,
  Badge,
  Button,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Tooltip } from "@mui/material";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
    window.location.reload();
  };
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

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className=" bg-blue-100 dark:bg-gray-50">
      <nav className="flex items-center h-14 px-4 border-b border-gray-600  border-gray-200/40 justify-between  lg:px-6">
        <div className="flex items-center gap-4 text-lg font-semibold md:gap-4 lg:gap-10">
          <a
            className="flex items-center space-x-2 text-1xl font-bold tracking-wider"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              />
            </svg>
          </a>
          <div
            className={`lg:flex max-sm:hidden space-x-4 text-black ${
              menuOpen ? "hidden" : "lg:flex"
            }`}
          >
            <a
              class="flex items-center space-x-2 text-gray hover:text-gray-500 dark:text-gray-700 dark:hover:text-gray-950"
              href="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                // class="w-6 h-6"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Home</span>
            </a>
            {user && (
              <a
                class="flex items-center space-x-2 text-gray hover:text-gray-500 dark:text-gray-700 dark:hover:text-gray-950"
                href="/profile"
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
                  class="w-4 h-4 aspect-square"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Profile</span>
              </a>
            )}
            {user && (
              <a
                class="flex items-center space-x-2 text-gray hover:text-gray-500 dark:text-gray-700 dark:hover:text-gray-950"
                href="/dashboard"
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
                  class="w-4 h-4 aspect-square"
                >
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                </svg>
                <span>Analytics</span>
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-8">
          {user ? (
            <>
              <div>
                <Tooltip title="Notification">
                  <IconButton>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      class="bi bi-bell"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                    </svg>
                  </IconButton>
                </Tooltip>
              </div>

              {/* <div
                className="cursor-pointer"
                onClick={() => navigate("./profile")}
              >
                <Avatar alt="User" src={userProfile.avtar} />
              </div> */}

              <button
                onClick={handleLogout}
                className="max-sm:hidden text-xs font-medium  text-white h-9 rounded-md px-3"
                style={{ background: "black" }}
              >
                Logout
              </button>
              <button
                className="lg:hidden text-2xl text-black"
                onClick={toggleMenu}
              >
                ☰
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  className="max-sm:hidden text-xs font-medium text-white h-9 rounded-md px-3"
                  style={{ background: "black" }}
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className="max-sm:hidden font-medium text-xs text-white h-9 rounded-md px-3"
                  style={{ background: "black" }}
                >
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
      {menuOpen && (
        <div className="lg:hidden bg-gray-50  p-4">
          <Link to="/">
            <div className="flex items-center text-sm font-medium">Home</div>
          </Link>
          {user && (
            <Link to="/dashboard">
              <div className="flex items-center text-sm font-medium">
                Analytics
              </div>
            </Link>
          )}
          {user && (
            <Link to="/profile">
              <div className="flex items-center text-sm font-medium">
                Profile
              </div>
            </Link>
          )}
          <button
            onClick={handleLogout}
            className=" text-xs font-medium mt-3 w-full  text-white h-9 rounded-md px-3"
            style={{ background: "black" }}
          >
            Logout
          </button>

          <div className="gap-4 flex justify-between mt-2">
            {user ? (
              // Render user name if user is logged in
              <span className="text-xs font-medium">{user.username}</span>
            ) : (
              <>
                <Link to="/login">
                  <button
                    className="text-xs font-medium text-white h-9 rounded-md px-3"
                    style={{ background: "black" }}
                  >
                    Login
                  </button>
                </Link>
                {/* Hidden on small screens, visible on larger screens */}
                <Link to="/signup">
                  <button
                    className="font-medium text-xs text-white h-9 rounded-md px-3"
                    style={{ background: "black" }}
                  >
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
