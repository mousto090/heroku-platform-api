import { firestore } from "./";
import SHOP_COLLECTIONS from "../data/shopData";

/**
 * Move ../data/shopData to firebase DB 
 */
export const moveShopCollectionsToFirebase = async() => {
    const collectionRef = firestore.collection('collections');
    const batch = firestore.batch();
    Object.values(SHOP_COLLECTIONS).forEach(({title, items}) => {
        const doc = collectionRef.doc();
        batch.set(doc, {title, items})
    })

    try {
        await batch.commit();
    } catch (error) {
        console.log('=====Error moving SHOP DATA === ' + error.message)
    }
}