import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced] = useState(false)
    const history = useHistory()
    const handlePlaceOrder = () => {
        history.push('/shipment');
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
                        <button onClick={handlePlaceOrder} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;