import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, item) => total + item.price*item.quantity, 0);

    let shipping = 0;
    if (total > 35) {
        shipping = 0;

    } else if (total > 15) {
        shipping = 4.99;
    } else if (total > 0) {
        shipping = 12.00;
    }

    const tax = total * .10;
    const grandTotal = total + shipping + tax;

    return (
        <div>
            <h4> Order Summary </h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: ${total.toFixed(2)}</p>
            <p>Shipping Cost: ${shipping.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Total Price: ${grandTotal.toFixed(2)}</p>
            {
                props.children
            }
           

        </div>
    );
};

export default Cart;