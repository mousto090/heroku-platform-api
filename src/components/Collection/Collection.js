import React from "react";
import classes from "./Collection.module.scss";
import { connect } from "react-redux";
import { selectCollection } from "../../store/shop/selectors";
import CollectionItem from "./CollectionItem/CollectionItem";

/**
 * Show the matched SHOP collection when navigating to /show/collectionPath
 */
const Collection = ({ collection, match }) => {

    if (!collection) {
        const { params: { collectionPath } } = match;
        return <h3>The Collection was not found : {collectionPath} </h3>;
    }
    const {title, items } = collection;
    return (
        <div className={classes.collection}>
            <h2 className={classes.title}>{title}</h2>
            <div className={classes.items}>
                {items.map(item => ( <CollectionItem key={item.id} item={item} /> ))}
            </div>
        </div>
    );
}



const mapStateToProps = (state, ownProps) => {
    const { match: { params: { collectionPath } } } = ownProps;
    return {
        collection: selectCollection(collectionPath)(state)
    }
}

export default connect(mapStateToProps)(Collection);