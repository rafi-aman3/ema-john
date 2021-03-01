import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {    
    const firstTen = fakeData.slice(0,10);
    const [products, setproducts] = useState(firstTen);
    const [cart, setCart] = useState([]);
    const handleAddProduct = (product) => {
        console.log("Product Added to the Cart", product);
        const newCart = [...cart, product];
        setCart(newCart);
        console.log(newCart);
    }



    return (
        <div className="shop-container">
            <div className="product-container">
            {
                products.map(item => <Product product={item} handleAddProduct={handleAddProduct} ></Product>)
            }
           
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;