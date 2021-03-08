import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager'
import { Link } from 'react-router-dom';

const Shop = () => {
    const firstTen = fakeData.slice(0, 10);
    const [products, setproducts] = useState(firstTen);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart);
        const cartProducts = productkeys.map(key => {
            const product = fakeData.find(item => item.key === key)
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);


    const handleAddProduct = (product) => {
        const productKeyToBeAdded = product.key;
        const sameProduct = cart.find(item => item.key === product.key)
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(item => item.key !== productKeyToBeAdded)
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }



    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(item => <Product key={item.key} showAddToCart={true} product={item} handleAddProduct={handleAddProduct} ></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;