import React, { useState } from 'react';

import classes from './CollectionItem.module.scss';
import Button from '../../../UI/Button/Button';
import clsx from 'clsx';
import { addItem } from '../../../store/cart/actions';
import { connect } from 'react-redux';

const CollectionItem = ({ item, onAddItem }) => {
    const { name, price, imageUrl } = item;

    const [hidden, setHidden] = useState(true);
    //add/remove cart button on collection item hover
    const handleCartButton = () => setHidden(!hidden);

    return (
        <div className={classes.collectionItem} onMouseEnter={handleCartButton} onMouseLeave={handleCartButton}>
            <div className={classes.image} style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className={classes.footer}>
                <span className={classes.name}>{name}</span>
                <span className={classes.price}>€{price}</span>
            </div>
            {!hidden && (
                <Button className={clsx(classes.addToCartBtn, 'inverted')} onClick={() => onAddItem(item)}>
                    Add to cart
                </Button>
            )}
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    onAddItem: item => dispatch(addItem(item))
})
export default connect(null, mapDispatchToProps)(CollectionItem);