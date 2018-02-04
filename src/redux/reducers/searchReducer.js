import {assoc, evolve} from 'ramda';
import {updateAllWithValueIfIdMatch} from "./utils";
import {
    DISPLAY_UPLOADED_IMAGE, SET_USER_SEARCHING, SHOW_MODEL_RESULT, SHOW_SEARCH_RESULTS,
    UPDATE_FILE_INPUT_LABEL
} from "../../utils/constants";

const initialState = {
    foundItems: [],
    isSearching: false,
    resultCards: [],
    fileInputs: [],
    uploadedImage: undefined
};

export default (state = initialState, {payload, type}) => {
    switch (type) {
        case DISPLAY_UPLOADED_IMAGE:
            return evolve({foundItems: updateAllWithValueIfIdMatch(payload.id, payload.imageURL, 'uploadedImage')}, state);

        case SHOW_SEARCH_RESULTS:
            return assoc('foundItems', payload, state);

        case SET_USER_SEARCHING:
            return assoc('isSearching', payload, state);

        case UPDATE_FILE_INPUT_LABEL:
            return evolve({foundItems: updateAllWithValueIfIdMatch(payload.id, payload.newLabel, 'inputLabel')}, state);

        case SHOW_MODEL_RESULT:
            return evolve({foundItems: updateAllWithValueIfIdMatch(payload.id, payload.result, 'result')}, state);

        default:
            return state
    }
}