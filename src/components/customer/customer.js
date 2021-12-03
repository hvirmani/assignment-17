import React from "react";
import Modal from "./modal";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function Customer() {
  const [data, setData] = useState({});
  let user, users;
  const history = useHistory();

  const handleShow = (product) => {
    setData(product);
  };

  function logOut() {
    alert("Logged out");
    sessionStorage.setItem("user", "");
    history.push("/login");
  }
  let products = {};

  function init() {
    user = sessionStorage.getItem("user");
    users = localStorage.getItem("users");
    if (!user || !users) {
      alert("Login first");
      logOut();
    }
    users = JSON.parse(users);
    let arr = localStorage.getItem("products");
    if (arr) {
      products = JSON.parse(arr);
    }
  }
  init();

  const addCart = (product) => {
    if (!users[user].cart[product.name]) {
      alert("Added to cart");
    } else {
      alert("Already Added");
    }
    users[user].cart[product.name] = product;
    localStorage.setItem("users", JSON.stringify(users));
  };

  const showCart = () => {
    history.push("/cart");
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        className="px-2 px-md-5 py-3 mb-3"
        expand="md"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        <Navbar.Brand href="#home">Welcome {user}!!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className=" justify-content-end"
        >
          <Nav className="d-flex gap-2 gap-md-3">
            <button
              className="btn btn-primary"
              onClick={showCart}
              style={{ width: "100px" }}
            >
              Show Cart
            </button>
            <button
              className="btn btn-danger"
              onClick={logOut}
              style={{ width: "100px" }}
            >
              Log Out
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <section className="container-fluid mt-5">
        <Modal data={data} />

        <div className="row">
          {Object.keys(products).map((key) => {
            let product = products[key];
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-6 mb-5"
                key={product.name}
              >
                <div className="card">
                  <img
                    className="card-img-top"
                    src={product.image}
                    alt="Card image"
                  />
                  <div className="card-body">
                    <h1 className="card-title ">{product.name}</h1>
                    <h2 className="card-text">${product.price}</h2>
                    <div className="d-flex mt-4 flex-row justify-content-between">
                      <button
                        onClick={function () {
                          addCart(product);
                        }}
                        style={{ width: "45%" }}
                        className="btn btn-primary"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={function () {
                          handleShow(product);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                        style={{ width: "45%" }}
                        className="btn btn-danger"
                      >
                        Veiw Description
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
