import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setorderPlaced] = useState(false)
    const handlePlaceOrder = () => {
        console.log("Order Placed");
        setCart([]);
        setorderPlaced(true);
        processOrder();

    }
    const handleRemoveProduct = (productKey) => {
        console.log("Remove CLicked", productKey);
        const newCart = cart.filter(item => item.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }

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

    let img;
    if(orderPlaced) {
        img = <img src={happyImage} alt=""/>
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(item => <ReviewItem key={item.key} handleRemoveProduct={handleRemoveProduct} product={item}></ReviewItem>)
                }
                {img}
          
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                        <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;