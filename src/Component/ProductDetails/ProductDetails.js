import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {key} = useParams();
    const product = fakeData.find(pd => pd.key === key);
    console.log(product)
    return (
        <div>
          <Product showAddToCart={false} showMore={false} pd={product}></Product>
        </div>
    );
};

export default ProductDetails;