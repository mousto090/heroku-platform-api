import React from "react";
import classes from "./CheckoutItem.module.scss";
import { removeItem, addItem, clearItem } from "../../store/cart/actions";
import { connect } from "react-redux";

const CheckoutItem = ({ item, onAddItem, onRemoveItem, onClearItem }) => {
    const { imageUrl, name, quantity, price } = item;
    return (
        <div className={classes.checkoutItem}>
            <div className={classes.imageContainer}>
                <img src={imageUrl} alt={name} />
            </div>
            <span className={classes.name}>{name}</span>

            <span className={classes.quantity}>
                <div className={classes.arrow} onClick={() => onRemoveItem(item)}> &#10094; </div>
                <span className={classes.value}>{quantity}</span>
                <div className={classes.arrow} onClick={() => onAddItem(item)}> &#10095; </div>
            </span>

            <span className={classes.price}>{price}</span>
            <div className={classes.removeButton} onClick={() => onClearItem(item)}>&#10005;</div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    onRemoveItem: item => dispatch(removeItem(item)),
    onAddItem: item => dispatch(addItem(item)),
    onClearItem: item => dispatch(clearItem(item)),
})
export default connect(null, mapDispatchToProps)(CheckoutItem);