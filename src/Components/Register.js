import React, { useState } from "react";
import { register } from "../api";

const Register = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newToken = await register(username, password);
    setToken(newToken);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {/* Login */}
      <input
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <br />
      {/* Password */}
      <input
        className="bottomInput"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <br />
      <button className="loginButton">submit</button>
    </form>
  );
};

export default Register;
