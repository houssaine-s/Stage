import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import FlashReducer from "./Reducer/FlashReducer";
import thunk from "redux-thunk";

const Reducers = combineReducers({
    VenteReducer: FlashReducer,
})
const store = legacy_createStore(Reducers, applyMiddleware(thunk));

export default store;