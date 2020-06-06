import React from "react";
import classes from "./CartDropdown.module.scss";
import Button from "../../../UI/Button/Button";
import { connect } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { selectCartItems } from "../../../store/cart/selectors";
import { createStructuredSelector } from "reselect";

const CartDropdown = ({ items, checkoutHandler }) => {

    return (
        <div className={classes.cartDropdown} >
            <div className={classes.cartItems}>
                {items.length ? items.map(item => <CartItem key={item.id} item={item} />)
                    : (<span className={classes.emptyCartMessage}>Your cart is empty</span>)
                }
            </div>
            <Button onClick={checkoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    items: selectCartItems
});

export default connect(mapStateToProps)(CartDropdown);