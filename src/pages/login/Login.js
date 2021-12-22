import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const { isFetching, error } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleClick}
        style={{ marginBottom: "20px", padding: 10, width: 100 }}
      >
        Login
      </button>
      {isFetching && <CircularProgress size="1rem" />}
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Incorrect Username Or Password.
        </span>
      )}
    </div>
  );
};

export default Login;
