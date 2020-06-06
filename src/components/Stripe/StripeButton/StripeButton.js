import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_VjYLGnxQiSaT8dNuzKF0ffrr00TqVwvymP';

    const onToken = token => {
        console.log(token);
        alert('Payment Succesful!');
    }

    return (
        <StripeCheckout
            name="Clothing Ltd."
            currency="EUR"
            label='Pay Now'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is €${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeButton;