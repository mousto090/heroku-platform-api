import React from "react";
import CatalogueItems from "../../components/Catalogue/CatalogueItems/CatalogueItems";
import classes from "./Home.module.scss";

const Home = ()=> {
    return (
        <div className={classes.home}>
            <CatalogueItems/>
        </div>
    );
}


export default Home;