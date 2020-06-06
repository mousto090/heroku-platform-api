import React from "react";
import CatalogueItem from "../CatalogueItem/CatalogueItem";
import classes from "./CatalogueItems.module.scss";
import { createStructuredSelector } from "reselect";
import { selectCatalogues } from "../../../store/catalogue/selectors";
import { connect } from "react-redux";

const CatalogueItems = ({ catalogues }) => {
    return (
        <div className={classes.catalogueItems}>
            {
                catalogues.map((item) => ( <CatalogueItem key={item.id} item={item} /> ))
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    catalogues: selectCatalogues
})

export default connect(mapStateToProps)(CatalogueItems);