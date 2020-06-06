import React from "react";
import CollectionItems from "../CollectionItems/CollectionItems";
import { createStructuredSelector } from "reselect";
import { selectCollections, selectIsCollectionLoading } from "../../../store/shop/selectors";
import { connect } from "react-redux";
import { compose } from "redux";
import WithSpinner from "../../../hoc/WithSpinner/WithSpinner";

/**
 * Show all SHOP collections
 */
const CollectionOverview = ({ collections }) => {
    return (
        Object.values(collections).map(({ id, title, items }) => (
            //preview  only 4 items
            <CollectionItems key={id} title={title} items={items.slice(0, 4)} />
        ))
    );
}


const mapStateToProps = createStructuredSelector({
    collections: selectCollections,
    isLoading: selectIsCollectionLoading
})
// export default connect(mapStateToProps)(CollectionOverview);
export default compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview);