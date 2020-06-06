import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Collection from "../../components/Collection/Collection";
import CollectionOverview from "../../components/Collection/CollectionOverview/CollectionOverview";
import { shopActions } from "../../store/actions";

const Shop = ({ match, onFetchShopCollections}) => {
    
    useEffect(()=>{
        onFetchShopCollections();
    }, [onFetchShopCollections]);
    
    return (
        <Switch>
            <Route exact path={`${match.path}`} component={CollectionOverview} />
            <Route path={`${match.path}/:collectionPath`} component={Collection} />
        </Switch>
    );
}

const mapDispatchToProps = dispatch => ({
    onFetchShopCollections: () => dispatch(shopActions.fetchShopCollections()),
})
export default connect(null, mapDispatchToProps)(Shop);