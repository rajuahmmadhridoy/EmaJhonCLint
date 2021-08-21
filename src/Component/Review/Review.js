import React from "react";
import { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItems from "../Reviewitems/ReviewItems";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Cart from "../Cart/Cart";
import happyImg from "../../images/giphy.gif";
import styles from './Review.module.scss'
 

const Review = () => {
  const [cart, setCart] = useState([]);
 const [proceed, setProceed] = useState(false)
 const history = useHistory();
  useEffect(() => {
    const savedCart = getDatabaseCart();
    let productKeys = Object.keys(savedCart);
    let cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  const handleRemoveItem = (key) => {
    const productRemove = cart.filter((pd) => pd.key !== key);
    setCart(productRemove);
    removeFromDatabaseCart(key);
  };
  // const handleProceedCheckOut = () =>{
  //   setCart([])
  //   setProceed(true)
  //   processOrder()
  // }
  const handleProceedCheckOut = () =>{
    history.push('/shipment')
  }
  document.title = "Review"
  return (
    <div>
      <Container>
        <Row>
          <Col md={9}>
            <h1 className={styles.selectItems}>Selected items :{cart.length}</h1>
            {proceed && <img src={happyImg} alt="" />}
            {cart.map((pd) => (
              <ReviewItems
                handleRemoveItem={handleRemoveItem}
                product={pd}
              ></ReviewItems>
            ))}
          </Col>
          <Col md={3}>
            <Cart cart={cart}>
                <button onClick={handleProceedCheckOut} className="singleProductBtn reviewBtn">Proceed Orderd</button>
            </Cart>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Review;
