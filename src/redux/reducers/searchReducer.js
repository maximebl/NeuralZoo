import {evolve, assoc, ifElse, identity, compose, map, propEq} from 'ramda';

const IdIs = (IdNumber) => propEq('id', IdNumber);

const updateWithValueIfIdMatch = (ItemID, newValue, property) => ifElse(
    IdIs(ItemID),
    assoc(property, newValue),
    identity
);

const updateItemsWith = compose(
    map,
    updateWithValueIfIdMatch
);

const updatePropertyValueWhereIdMatch = (ItemID, newValue, property) => ({foundItems: updateItemsWith(ItemID, newValue, property)});

const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';
const SET_USER_SEARCHING = 'SET_USER_SEARCHING';
const UPDATE_FILE_INPUT_LABEL = 'UPDATE_FILE_INPUT_LABEL';
const ADD_RESULT = 'ADD_RESULT';
const ADD_INPUT = 'ADD_INPUT';

export const showSearchResults = (val) => ({type: SHOW_SEARCH_RESULTS, payload: val});
export const setUserIsSearching = (val) => ({type: SET_USER_SEARCHING, payload: val});
export const updateFileInputLabel = (val) => ({type: UPDATE_FILE_INPUT_LABEL, payload: val});
export const addResult = (val) => ({type: ADD_RESULT, payload: val});
export const addInput = (val) => ({type: ADD_INPUT, payload: val});

const initialState = {
    foundItems: [],
    isSearching: false,
    resultCards: [],
    fileInputs: []
};

export default (state = initialState, {payload, type}) => {
    switch (type) {
        case SHOW_SEARCH_RESULTS:
            return assoc('foundItems', payload, state);

        case SET_USER_SEARCHING:
            return assoc('isSearching', payload, state);

        case UPDATE_FILE_INPUT_LABEL:
            debugger;
            return evolve(updatePropertyValueWhereIdMatch(payload.id, payload.newLabel, 'inputLabel'), state);

        case ADD_RESULT:
            return assoc('resultCards', payload, state);

        case ADD_INPUT:
            return assoc('fileInputs', payload, state);

        default:
            return state
    }
}