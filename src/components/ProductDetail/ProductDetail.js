import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productkey} = useParams();
    const product = fakeData.find(item => item.key === productkey)
    return (
        <div>
           <h3> {productkey} Details</h3>
           <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;