import React from "react";
import { SECTIONS } from "../../../data/cataloguesData";
import CatalogueItem from "../CatalogueItem/CatalogueItem";
import classes from "./Menu.module.scss";

const Menu = () => {
    return (
        <div className={classes.menu}>
            {SECTIONS.map(({ id, size, imageUrl, title }) =>
                <CatalogueItem key={id} size={size} imageUrl={imageUrl} title={title} />)
            }
        </div>
    );
}


export default Menu;