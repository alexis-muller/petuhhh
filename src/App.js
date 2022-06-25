// export default App;

import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Posts, Login, Register, Profile } from "./Components";
import React, { useState, useEffect } from "react";
import { getUser } from "./api";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const handleUser = async () => {
    if (token) {
      const userObject = await getUser(token);
      setUser(userObject);
    } else {
      setUser({});
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    handleUser();
  }, [token]);

  return (
    <>
      {/* <h1 className="title">Petuh's List</h1> */}
      <div className="App">
        <nav className="welcome">
          {/* {Object.keys(user).length > 0 && (
            <h2 className="welcomeUser">Welcome, {user.username}</h2>
          )} */}

          {Object.keys(user).length > 0 ? (
            <button className="logout" onClick={logout} variant="contained">
              Log Out
            </button>
          ) : null}

          <div className="headerLinks">
            <Link to="/" className="headerColor">
              Home
            </Link>
            <Link to="/login" className="headerColor">
              Login
            </Link>
            <Link to="/register" className="headerColor">
              Register
            </Link>
            <Link to="/profile" className="headerColor">
              Profile
            </Link>
          </div>
          {/* <div className="reg">
            {Object.keys(user).length > 0 ? null : (
              <Link className="regLink" to={`/register`}>
                Don't have an account? Sign up
              </Link>
            )}
          </div> */}
        </nav>
        <Routes>
          <Route path="/" element={<Posts token={token} />} />
          <Route
            path="/login/"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route
            path="/register"
            element={<Register token={token} setToken={setToken} />}
          />
          <Route
            path="/profile"
            element={<Profile token={token} user={user} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
