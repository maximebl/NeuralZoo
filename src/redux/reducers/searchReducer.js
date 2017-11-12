import {assoc} from 'ramda';

const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';
const SET_USER_SEARCHING = 'SET_USER_SEARCHING';
const UPDATE_FILE_INPUT_LABEL = 'UPDATE_FILE_INPUT_LABEL';

export const showSearchResults = (val) => ({type: SHOW_SEARCH_RESULTS, payload: val});
export const setUserIsSearching = (val) => ({type: SET_USER_SEARCHING, payload: val});
export const updateFileInputLabel = (val) => ({type: UPDATE_FILE_INPUT_LABEL, payload: val});

const initialState = {
    foundItems: [],
    isSearching: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SEARCH_RESULTS:
            return assoc('foundItems', action.payload, state);

        case SET_USER_SEARCHING:
            return assoc('isSearching', action.payload, state);

        case UPDATE_FILE_INPUT_LABEL:
            return assoc('inputLabel', action.payload, state);

        default:
            return state
    }
}