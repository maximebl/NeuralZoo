import {evolve, assoc} from 'ramda';
import {updateAllWithValueIfIdMatch} from "./utils";
import {SET_USER_SEARCHING, SHOW_SEARCH_RESULTS, UPDATE_FILE_INPUT_LABEL} from "../../utils/constants";

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
            return evolve({foundItems: updateAllWithValueIfIdMatch(payload.id, payload.newLabel, 'inputLabel')}, state);
        default:
            return state
    }
}

