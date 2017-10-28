import {createStore, combineReducers} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';
import searchReducer from "./reducers/searchReducer";

const reducer = combineReducers({
    searchReducer : searchReducer
});

export default createStore(
    reducer
    // composeWithDevTools(applyMiddleware(thunk))
);