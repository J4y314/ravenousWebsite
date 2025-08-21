import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

function Navigation() {
  // user from redux store
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();


  // Dispatches a logout and removes the userdata from localStorage to log in the user out.
  const logoutHandler = () => {
    dispatch(logout());
    // localStorage.removeItem("user"); //Old. Used for when backend wasn't functional.
  }


  return (
    <div>
      <nav className="flex justify-end">
        <ul className="flex list-none m-0 p-0 absolute top-3 right-5">
          {(user && user.email) ? (
            <>
              <li className="ml-4">
                <button className="bg-transparent border-none cursor-pointer w-fit min-w-20 px-2 py-2 rounded-md shadow-[0_0_20px_-20px] bg-white transition-all duration-200 ease-in-out outline-none font-bold hover:bg-gray-200 hover:shadow-[0_0_20px_-18px] active:scale-95">
                  <Link to="/account">Account</Link>
                </button>
              </li>
              <li className="ml-4">
                <button className="bg-transparent border-none cursor-pointer w-fit min-w-20 px-2 py-2 rounded-md shadow-[0_0_20px_-20px] bg-white transition-all duration-200 ease-in-out outline-none font-bold hover:bg-gray-200 hover:shadow-[0_0_20px_-18px] active:scale-95"
                onClick={logoutHandler}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="ml-4">
                <button className="bg-transparent border-none cursor-pointer w-fit min-w-20 px-2 py-2 rounded-md shadow-[0_0_20px_-20px] bg-white transition-all duration-200 ease-in-out outline-none font-bold hover:bg-gray-200 hover:shadow-[0_0_20px_-18px] active:scale-95">
                  <Link to="/login">Log In</Link>
                </button>
              </li>
              <li className="ml-4">
                <button className="bg-transparent border-none cursor-pointer w-fit min-w-20 px-2 py-2 rounded-md shadow-[0_0_20px_-20px] bg-white transition-all duration-200 ease-in-out outline-none font-bold hover:bg-gray-200 hover:shadow-[0_0_20px_-18px] active:scale-95">
                  <Link to="/signup">Sign Up</Link>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;