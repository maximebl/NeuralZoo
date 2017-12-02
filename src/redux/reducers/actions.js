import {SET_USER_SEARCHING, SHOW_SEARCH_RESULTS, UPDATE_FILE_INPUT_LABEL} from "../../utils/constants";

export const showSearchResults = (val) => ({type: SHOW_SEARCH_RESULTS, payload: val});
export const setUserIsSearching = (val) => ({type: SET_USER_SEARCHING, payload: val});
export const updateFileInputLabel = (val) => ({type: UPDATE_FILE_INPUT_LABEL, payload: val});