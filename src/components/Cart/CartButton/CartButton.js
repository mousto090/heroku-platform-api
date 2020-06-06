import React from "react";
import { ReactComponent as ShoppingBagIcon } from "../../../assets/shopping-bag.svg";
import classes from "./CartButton.module.scss";
import { selectCartItemsCount } from "../../../store/cart/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const CartButton = ({ dropdownToggleHandler, itemCount }) => {

    return (
        <div className={classes.cartIcon} onClick={dropdownToggleHandler}>
            <ShoppingBagIcon className={classes.shoppingIcon} />
            <span className={classes.itemCount}>{itemCount}</span>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

export default connect(mapStateToProps)(CartButton);