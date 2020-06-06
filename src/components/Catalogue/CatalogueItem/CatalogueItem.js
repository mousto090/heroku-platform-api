import clsx from "clsx";
import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./CatalogueItem.module.scss";

const CatalogueItem = ({item}) => {
    const { title, size, imageUrl, url } = item;
    const cls=clsx(classes.catalogueItem, size && classes.large);
    const history = useHistory();
    
    return (
        <div className={cls} onClick={()=> history.push(url)}>
            <div className={classes.backgroundImage} style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className={classes.content}>
                <h1 className={classes.title}>{title.toUpperCase()}</h1>
                <span className={classes.subtitle}>SHOP NOW</span>
            </div>
        </div>
    )
}


export default CatalogueItem;