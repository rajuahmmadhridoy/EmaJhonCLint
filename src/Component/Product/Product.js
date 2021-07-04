import React from 'react';
import './Product.css'

const Product = (props) => {
    console.log(props.pd,'product');
    // const name = props?.pd?.name;
    return (
        <div>
            {props.pd && <img src={props.pd.img} alt="" />}
            {props.pd && <h5>{props.pd.name}</h5>}
            {props.pd && <p>{props.pd.price}</p>}
            
        </div>
    );
};

export default Product;