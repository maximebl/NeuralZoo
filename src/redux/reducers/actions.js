export const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';
export const SET_USER_SEARCHING = 'SET_USER_SEARCHING';
export const UPDATE_FILE_INPUT_LABEL = 'UPDATE_FILE_INPUT_LABEL';

export const showSearchResults = (val) => ({type: SHOW_SEARCH_RESULTS, payload: val});
export const setUserIsSearching = (val) => ({type: SET_USER_SEARCHING, payload: val});
export const updateFileInputLabel = (val) => ({type: UPDATE_FILE_INPUT_LABEL, payload: val});