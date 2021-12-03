import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function Admin() {
  let [productName, setproductName] = useState("");
  let [productPrice, setproductPrice] = useState("");
  let [imageUrl, setimageUrl] = useState("");
  let [productDescription, setproductDescription] = useState("");
  let [products, setProducts] = useState({});
  let user, users;
  const history = useHistory();
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
    let data = localStorage.getItem("products");
    if (data) {
      products = JSON.parse(data);
    }
  }
  init();
  function clear() {
    setproductName("");
    setproductPrice("");
    setimageUrl("");
    setproductDescription("");
  }
  function done(event) {
    event.preventDefault();
    if (products[productName]) {
      //  let isUpdate = confirm("already have product do you want to update?");
      let isUpdate = true;
      if (!isUpdate) {
        clear();
        return;
      }
    }
    let product = {
      name: productName,
      price: productPrice,
      image: "https://www.w3schools.com/bootstrap4/img_avatar1.png",
      description: productDescription,
    };
    products[productName] = product;
    clear();
    console.log(products);
    setProducts(products);
    alert("Product added");
    localStorage.setItem("products", JSON.stringify(products));
  }
  function changeName(event) {
    setproductName(event.target.value);
  }
  function changePrice(event) {
    setproductPrice(event.target.value);
  }
  function changeImage(event) {
    setimageUrl(event.target.value);
  }
  function changeDescription(event) {
    setproductDescription(event.target.value);
  }
  function changeCartProduct(product) {
    for (let i in users) {
      if (users[i].cart[product.name]) {
        delete users[i].cart[product.name];
      }
    }
    localStorage.setItem("users", JSON.stringify(users));
  }
  function update(product) {
    if (productName) {
      alert("Do one task at a time");
      return;
    }
    setproductName(product.name);
    setproductPrice(product.price);
    setimageUrl(product.image);
    setproductDescription(product.description);
    delete products[product.name];
    changeCartProduct(product);
    setProducts(products);
    localStorage.setItem("products", JSON.stringify(products));
  }
  function remove(product) {
    delete products[product.name];
    changeCartProduct(product);
    setProducts(products);
    alert("Product removed");
    localStorage.setItem("products", JSON.stringify(products));
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
      <main className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="display-6">Edit Product</h1>
            <form onSubmit={done}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={changeName}
                  placeholder="Product Name"
                  value={productName}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image Url</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={changeImage}
                  placeholder="Image Url"
                  value={imageUrl}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <div className="input-group mb-3">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    onChange={changePrice}
                    className="form-control"
                    placeholder="Price"
                    value={productPrice}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={productDescription}
                  onChange={changeDescription}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success btn-small">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
      <section className="container-fluid mt-5">
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
                          update(product);
                        }}
                        style={{ width: "45%" }}
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                      <button
                        onClick={function () {
                          remove(product);
                        }}
                        style={{ width: "45%" }}
                        className="btn btn-danger"
                      >
                        Delete
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
