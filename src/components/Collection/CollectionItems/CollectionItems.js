import React from "react";
import classes from "./CollectionItems.module.scss";
import CollectionItem from "../CollectionItem/CollectionItem";

const CollectionItems = ({ title, items }) => {
    return (
        <div className={classes.collectionItems}>
            <h1 className={classes.title}>{title.toUpperCase()}</h1>
            <div className={classes.items}>
                {
                    items.map(item => (<CollectionItem key={item.id} item={item} />))
                }
            </div>
        </div>
    );
}

export default CollectionItems;