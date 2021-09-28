import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import fakeData from "../../fakeData";
import { Link } from "react-router-dom";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.scss";
const Shop = () => {

const [products, setProduct] = useState([]);

useEffect(() => {
  fetch('http://localhost:4000/products')
  .then(res => res.json())
  .then(data => setProduct(data))
},[])

  const [cart, setCart] = useState([]);
  // console.log('this is cart',cart);
  const handleAddProduct = (product) => {
    product.quantity = 1;
    const newCart = [...cart, product];
    let sameProduct = newCart.filter((pd) => pd.key === product.key);
    let count = sameProduct.length;
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };           
  useEffect(() => {
    const savedCart = getDatabaseCart();
    let productKeys = Object.keys(savedCart);
    fetch('http://localhost:4000/productByKeys',{
      method:'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(productKeys),
    })
    .then(res => res.json())
    .then(data => setCart(data))
  }, []);
  document.title = "Shop";
  return (
    <Container>
      <Row className="shopContainer">
        <Col md={9} className="productContainer">
          {products.map((pd) => (
            <Product
              handleAddProduct={handleAddProduct}
              pd={pd}
              key={pd.key}
              showAddToCart={true}
              showMore={true}
            ></Product>
          ))}
        </Col>
        <Col md={3} className=" cartContainer">
          <Cart cart={cart}>
            <Link to="/review">
              <button className="singleProductBtn reviewBtn">Review Orderd</button>
            </Link>
          </Cart>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
