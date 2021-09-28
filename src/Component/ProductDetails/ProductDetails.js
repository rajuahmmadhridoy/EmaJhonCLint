import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {key} = useParams();
    let [products,setProduct] = useState({});
    useEffect(()=>{
      fetch(`http://localhost:4000/product/${key}`)
      .then(res => res.json())
      .then(data => setProduct(data))
    },[key]);
console.log(products);
    return (
        <div>
          <Product showAddToCart={false} showMore={false} pd={products}></Product>
        </div>
    );
};

export default ProductDetails;