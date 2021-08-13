import React from "react";
// import ShowCart from '../ShowCart/ShowCart'
import "./Cart.scss";

const Cart = (props) => {
  // console.log(props.pd.length);
  const cart = props.cart;
  // const totalPrice = cart.reduce((totalPrice, pro) => totalPrice + pro.price, 0)

  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    totalPrice = totalPrice + product.price * product.quantity;
    // debugger
  }

  let shiping = 0;
  if (totalPrice > 35) {
    shiping = 0;
  } else if (totalPrice > 15) {
    shiping = 4.5;
  }

  const tax = totalPrice / 10;
  const formatNumber = (num) => {
    const presion = num.toFixed(2);
    return Number(presion);
  };

  const grandTotal = (totalPrice + shiping + tax).toFixed(2);
  return (
    <div className="">
      <div className="cartHeader">
        <h1>This is cart: {cart.length}</h1>
        <p className="price">
          Price <span>: {formatNumber(totalPrice)}</span>
        </p>
        <p className="shiping">
          Shiping Cost<span>: {shiping}</span>
        </p>
        <p className="tax">
          Tax <span>: {formatNumber(tax)}</span>
        </p>
        <p className="total">
          Total <span>: {grandTotal}</span>
        </p>
        {
          props.children
        }
      </div>
    </div>
  );
};

export default Cart;
