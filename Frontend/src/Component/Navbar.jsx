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
    <div className=" lg:px-10">
      <nav className="flex items-center h-14 px-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-950 border-gray-200/40 dark:border-gray-800/40 justify-between lg:h-20 lg:px-6">
        <div className="flex items-center gap-4 text-lg font-semibold md:gap-4 lg:gap-10">
          <a className="flex items-center justify-center" href="/">
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
              className="h-6 w-6"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
            </svg>
            <span className="sr-only">Acme Inc</span>
          </a>

          <div
            className={`lg:flex max-sm:hidden space-x-4 text-black ${
              menuOpen ? "hidden" : "lg:flex"
            }`}
          >
            <Link to="/home">
              <div className="flex items-center text-sm font-medium">Home</div>
            </Link>
            {user && (
              <Link to="/dashboard">
                <div className="flex items-center text-sm font-medium">
                  Dashboard
                </div>
              </Link>
            )}
            <Link to="/contact">
              <div className="flex items-center text-sm font-medium">
                Contact
              </div>
            </Link>
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

              <div
                className="cursor-pointer"
                onClick={() => navigate("./profile")}
              >
                {/* Render user name */}
                <Avatar alt="User" src={userProfile.avtar} />
              </div>

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
              <Link to="/">
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
        <div className="lg:hidden bg-gray-50 dark:bg-gray-950 p-4">
          <Link to="/home">
            <div className="flex items-center text-sm font-medium">Home</div>
          </Link>
          {user && (
            <Link to="/dashboard">
              <div className="flex items-center text-sm font-medium">
                Dashboard
              </div>
            </Link>
          )}
          <Link to="/contact">
            <div className="flex items-center text-sm font-medium">Contact</div>
          </Link>

          <div className="gap-4 flex justify-between mt-2">
            {user ? (
              // Render user name if user is logged in
              <span className="text-xs font-medium">{user.username}</span>
            ) : (
              <>
                <Link to="/">
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
