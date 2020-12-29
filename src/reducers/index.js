import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchReducer } from './searchReducer';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';
import { couponReducer } from './couponReducer';
import { CODReducer } from './CODReducer';


const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    search: searchReducer,
    drawer: drawerReducer,
    coupon: couponReducer,
    COD: CODReducer
});

export default rootReducer;