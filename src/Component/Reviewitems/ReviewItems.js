import React from 'react';
import styles from'./ReviewItems.module.scss'

const ReviewItems = (props) => {
    const {category,name,key,price,quantity} = props.product;
    return (
        <div className={styles.title}>
            <h3>name: {name}</h3>
            <h4>Category: {category}</h4>
            <h4>Price: {price}</h4>
            <h4>Quantity: {quantity}</h4>
            <button onClick={()=> props.handleRemoveItem(key)}  className="singleProductBtn">Remove</button>
        </div>
    );
};

export default ReviewItems;