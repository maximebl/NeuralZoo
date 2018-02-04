import searchReducer from './searchReducer';

describe('searchReducer', () => {
   it('should return a reducer', () => {
        const state = {
            foundItems: [],
            isSearching: false,
            resultCards: [],
            fileInputs: []
        };
        const action = {payload: true, type: 'SET_USER_SEARCHING'};
        const actual = searchReducer(state, action);
        console.log(actual)
   })
});