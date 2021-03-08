import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    return (
        <div className="review-item">
            <h4 className="product-name">{name}</h4>
            <h5>Quantity:{quantity}</h5>
            <p>${price}</p>
            
            <br/>
            <button onClick={() => props.handleRemoveProduct(key)} className="product-button">Remove</button>
        </div>
    );
};

export default ReviewItem;