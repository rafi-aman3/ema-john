import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import './Product.css';

const Product = (props) => {
    const {img, name, seller,price, stock} = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div className="product-details">
                <h4 className="product-name">{name}</h4>
                <br/>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <br/>
                <p>Only {stock} left in stock </p>
                <button className="product-button" onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {" "}Add to Cart
                </button>

            </div>
        </div>
    );
};

export default Product;