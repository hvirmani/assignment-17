import { useState } from "react";
import { useHistory } from "react-router-dom";
import React from "react";

export default function Sign() {
  let users = localStorage.getItem("users");
  users = JSON.parse(users);
  users = users || {};
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let [isAdmin, setAdmin] = useState(false);

  function sign(event) {
    event.preventDefault();
    if (users[username]) {
      alert("User already exists");
    } else {
      users[username] = {
        username: username,
        password: password,
        isAdmin,
        cart: {},
      };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account added");
      history.push("/login");
    }
    setUsername("");
    setPassword("");
  }

  function changeUsername(event) {
    setUsername(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }
  function changeAdmin(event) {
    setAdmin(event.target.checked);
  }
  return (
    <form
      id="signUp"
      onSubmit={sign}
      className="col-12 col-md-8 d-flex flex-column mx-auto gap-2"
    >
      <input
        type="text"
        onChange={changeUsername}
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
      <label style={{ textAlign: "left" }}>
        <input
          type="checkbox"
          style={{ marginRight: "10px" }}
          onChange={changeAdmin}
        />
        I am a admin
      </label>
      <input
        type="submit"
        style={{ maxWidth: "200px" }}
        className="btn btn-primary mx-auto"
        value="Add Account"
      />
    </form>
  );
}
