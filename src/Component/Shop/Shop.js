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
  console.log(fakeData);
  // const first10 = fakeData.slice(0,10);
  const [product, setProduct] = useState(fakeData.slice(0, 10));
  // const product = fakeData;
  // console.log(product);
  // const [product, setProduct] = useState([]);
  // useEffect(() => {
  //     fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  //     .then(res => res.json())
  //     .then(data => setProduct(data.categories))
  // },[])
  // console.log(product);
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
    console.log(savedCart);
    let productKeys = Object.keys(savedCart);
    let cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);
  document.title = "Shop";
  return (
    <Container>
      <Row className="shopContainer">
        <Col md={9} className="productContainer">
          {product.map((pd) => (
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
