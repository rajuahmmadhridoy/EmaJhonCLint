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
