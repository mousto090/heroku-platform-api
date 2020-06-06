import React from "react";
import classes from "./CartItem.module.scss";


const CartItem = ({ item }) => {
    const { name, quantity, price, imageUrl } = item;
    return (
        <div className={classes.cartItem}>
            <img src={imageUrl} alt={name} />
            <div className={classes.itemDetails}>
                <span className={classes.name}>{name}</span>
                <span className={classes.price}>
                    {quantity} x ${price}
                </span>
            </div>
        </div>
    )
}

export default CartItem;