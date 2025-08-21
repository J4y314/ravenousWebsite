import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { login, loader } from "../../store/slices/authSlice";
import AppLoader from "../../util/loaders/AppLoader";

function App() {
  // Initialize the dispatch function using useDispatch.
  const dispatch = useDispatch();
   // Retrieve the "loaded" state from the auth slice using useSelector.
  const loaded = useSelector((state) => state.auth.loaded);
 
  // Use useEffect to simulate loading user data.
  //   Check if the "loaded" state is false.
  //   If false, use setTimeout to simulate fetching data after 2 seconds.
  //   Dispatch the login action to simulate a user login.
  //   Dispatch the loader action to update the "loaded" state to true.
  //   Include dispatch and loaded as dependencies in the useEffect hook.
useEffect(() => {
  if (!loaded){
    setTimeout(() => {
      dispatch(login())
      dispatch(loader(true))
    }, 2000)
  }
}, [dispatch, loaded])

  // Before rendering the main UI, check if the "loaded" state is false.
  //   If false, return the AppLoader component to show a loading indicator.
  //   If true, render the application's main UI.
  if (!loaded) {
    return <AppLoader />
  }
  return (
    <div className="App">
      <header>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>Ravenous</h1>
        </Link>
        <Toaster />
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
