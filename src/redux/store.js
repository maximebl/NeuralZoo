import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import searchReducer from "./reducers/searchReducer";
import {combineEpics, createEpicMiddleware} from 'redux-observable';

const epics = combineEpics();

const epicMiddleware = createEpicMiddleware(epics);

const reducer = combineReducers({
    searchReducer : searchReducer
});

export default createStore(
    reducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
);