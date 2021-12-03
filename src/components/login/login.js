import { useState } from "react";
import { useHistory } from "react-router-dom";
import React from "react";

export default function Login() {
  let users = localStorage.getItem("users");
  users = JSON.parse(users);
  users = users || {};
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function log(event) {
    event.preventDefault();
    if (users[username] && password === users[username].password) {
      alert("logged in");
      sessionStorage.setItem("user", username);
      if (users[username].isAdmin) {
        history.push("/admin");
      } else {
        history.push("/customer");
      }
    } else {
      alert("Invalid username or password");
    }
    setUserName("");
    setPassword("");
  }

  function changeUserName(event) {
    setUserName(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }
  return (
    <form
      onSubmit={log}
      className="col-12 col-md-8 d-flex flex-column mx-auto gap-2"
    >
      <input
        type="text"
        onChange={changeUserName}
        value={username}
        className="form-control"
        placeholder="Username"
        required
      />
      <input
        type="password"
        onChange={changePassword}
        value={password}
        className="form-control"
        placeholder="Password"
        required
      />
      <input
        type="submit"
        className="btn btn-primary mx-auto"
        style={{ maxWidth: "200px" }}
        value="Log in"
      />
    </form>
  );
}
