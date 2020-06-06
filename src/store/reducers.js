import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import cartReducer from "./cart/reducer";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import shopReducer from "./shop/reducer";
import catalogueReducer from "./catalogue/reducer";


const rootReducers = combineReducers({
    userReducer,
    cartReducer,
    shopReducer,
    catalogueReducer,
})

//configure redux persit to persit only needed reducers
const persistConfig = {
    key: 'root',
    throttle: 1000, 
    //persist only these keys(not persisting user as is alwas fetched from firebase)
    whitelist: ['cartReducer'],
    storage: localStorage
}

const reducers = persistReducer(persistConfig, rootReducers);

export default reducers;
// export default reducers;