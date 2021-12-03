import React from "react";
import Modal from "../customer/modal";
import { Navbar, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
export default function Cart() {
  const [data, setData] = useState({});
  let [products, setProducts] = useState({});
  let user, users;
  const history = useHistory();

  const send = (product) => {
    setData(product);
  };

  function logOut() {
    alert("Logged out");
    sessionStorage.setItem("user", "");
    history.push("/login");
  }
  function init() {
    user = sessionStorage.getItem("user");
    users = localStorage.getItem("users");
    if (!user || !users) {
      alert("Log in First");
      logOut();
    }
    users = JSON.parse(users);
  }

  init();

  useEffect(() => {
    setProducts(users[user].cart);
  }, []);

  function remove(product) {
    delete products[product.name];
    delete users[user].cart[product.name];
    setProducts(users[user].cart);
    alert("Product removed from cart");
    localStorage.setItem("users", JSON.stringify(users));
    // console.log(users);
  }
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
          <Nav>
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
        {Object.keys(products).length > 0 ? (
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
                      src="https://www.w3schools.com/bootstrap4/img_avatar1.png"
                      alt="Card image"
                    />
                    <div className="card-body">
                      <h1 className="card-title ">{product.name}</h1>
                      <h2 className="card-text">${product.price}</h2>
                      <div className="d-flex mt-4 flex-row justify-content-between">
                        <button
                          onClick={function () {
                            remove(product);
                          }}
                          style={{ width: "45%" }}
                          className="btn btn-primary"
                        >
                          Remove
                        </button>
                        <button
                          onClick={function () {
                            send(product);
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
        ) : (
          <center>
            <h1>Cart is Empty</h1>
          </center>
        )}
      </section>
    </>
  );
}
