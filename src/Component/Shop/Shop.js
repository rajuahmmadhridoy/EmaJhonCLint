import React from 'react';
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const product = fakeData;
    return (
        <div>
            <div className="shopContainer row">
                <div className="productContainer col-md-10">
                    {
                        product.map(pd => <Product pd={pd}></Product>)
                    }
                </div>
                <div className="cartContainer">
                    <h1>this is cart</h1>
                </div>
            </div>
        </div>
    );
};

export default Shop;