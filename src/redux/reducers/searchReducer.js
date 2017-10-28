const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';

export const showSearchResults = (val) => ({type: SHOW_SEARCH_RESULTS, payload: val});

export default (state = [], action) => {
    switch (action.type) {
        case SHOW_SEARCH_RESULTS:
            return [
                ...state,
                action.payload
            ];
        default:
            return state
    }
}