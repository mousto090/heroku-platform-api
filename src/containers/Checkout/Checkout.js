import React from "react";
import classes from "./Checkout.module.scss";
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartTotalPrice } from "../../store/cart/selectors";
import { connect } from "react-redux";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import StripeButton from "../../components/Stripe/StripeButton/StripeButton";

const header = ["Product", "Description", "Quantity", "Price", "Remove"];
const headerRow = header.map(title => (
    <div className='headerBlock' key={title}>
        <span>{title}</span>
    </div>
))
const Checkout = ({ items, totalPrice }) => {
    if (!items.length) {
        return (<p>Your cart is empty</p>)
    }
    return (
        <div className={classes.checkoutContainer}>
            <div className={classes.checkoutHeader}>
                {headerRow}
            </div>
            {
                items.map(item => <CheckoutItem item={item} key={item.id} />)
            }
            <div className={classes.total}>
                TOTAL: €{totalPrice}
            </div>
            <div className={classes.cardInfo}>
                <div>*Use the following test credit card for payments*</div>
                <div><b>Card number : </b> 5200 8282 8282 8210 </div>
                <div><b>Exp</b>: Any future date </div>
                <div><b>CVC</b>: Any 3 digits</div>
            </div>
            <StripeButton price={totalPrice} />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    items: selectCartItems,
    totalPrice: selectCartTotalPrice
});

export default connect(mapStateToProps)(Checkout);