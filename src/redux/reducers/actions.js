import {
    DISPLAY_UPLOADED_IMAGE, SET_USER_SEARCHING, SHOW_MODEL_RESULT, SHOW_SEARCH_RESULTS,
    UPDATE_FILE_INPUT_LABEL
} from "../../utils/constants";

export const showSearchResults = (val) => ({type: SHOW_SEARCH_RESULTS, payload: val});
export const setUserIsSearching = (val) => ({type: SET_USER_SEARCHING, payload: val});
export const updateFileInputLabel = (val) => ({type: UPDATE_FILE_INPUT_LABEL, payload: val});
export const displayUploadedImage = (val) => ({type: DISPLAY_UPLOADED_IMAGE, payload: val});
export const showModelResults = (val) => ({type: SHOW_MODEL_RESULT, payload: val});