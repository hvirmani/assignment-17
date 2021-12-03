import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from "react-router-dom";
import React from "react";
import Login from "../login/login";
import Admin from "../admin/admin";
import Sign from "../sign/sign";
import Cart from "../cart/cart";
import Customer from "../customer/customer";
export default function Home() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/login"]}>
          <div
            style={{ minHeight: "90vh" }}
            className="container d-flex flex-column justify-content-center align-items-center gap-4"
          >
            <div className="d-flex flex-row gap-3">
              <NavLink className="btn" activeClassName="btn-primary" to="/sign">
                Sign Up
              </NavLink>
              <NavLink
                className="btn btn-primary"
                activeClassName="btn-primary"
                to="/login"
              >
                Log In
              </NavLink>
            </div>
            <Login />
          </div>
        </Route>
        <Route path="/sign">
          <div
            style={{ minHeight: "90vh" }}
            className="container d-flex flex-column justify-content-center align-items-center gap-4"
          >
            <div className="d-flex flex-row gap-3">
              <NavLink className="btn" activeClassName="btn-primary" to="/sign">
                Sign Up
              </NavLink>
              <NavLink
                className="btn"
                activeClassName="btn-primary"
                to="/login"
              >
                Log In
              </NavLink>
            </div>
            <Sign />
          </div>
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/customer">
          <Customer />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
}
