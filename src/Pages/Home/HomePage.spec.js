import React from 'react';
import {displaySearchResults, formatFoundItems, processItems} from "./HomePage";
import {ITEMS_FOUND, NO_ITEMS_FOUND, ONE_ITEM_FOUND, SEARCH_HERE, UNKNOWN_TITLE} from "../../utils/constants";
import {generateIds} from "../../redux/reducers/utils";

describe('formatFoundItems', () => {
    it('should return the correct string when the user is not searching', () => {
        const expected = SEARCH_HERE;
        const actual = formatFoundItems(0, false);
        expect(actual).toEqual(expected);
    });

    it('should return the correct string when exactly one item is found', () => {
      const expected = ONE_ITEM_FOUND;
      const actual = formatFoundItems(1, true);
      expect(actual).toEqual(expected);
    });

    it('should return the correct string when multiple items are found', () => {
        const expected = '2' + ITEMS_FOUND;
        const actual = formatFoundItems(2, true);
        expect(actual).toEqual(expected);
    });

    it('should return the correct message if no items were found', () => {
        const expected = NO_ITEMS_FOUND;
        const actual = formatFoundItems(0, true);
        expect(actual).toEqual(expected);
    })
});

describe('generateIds', () => {
    it('should not mutate the original array', () => {
        const originalValues = [{'a':1}, {'b':2}, {'c':3}];
        const expectedValues = originalValues;
        generateIds(originalValues);
        expect(originalValues).toEqual(expectedValues);
    });

    it('should assign a unique ID to each element', () => {
        const originalValues = [{'a':1}, {'b':2}];
        const actualValues = generateIds(originalValues);
        expect(actualValues.getOrElse([])[0].id).toBeDefined();
        expect(actualValues.getOrElse([])[0].id).not.toEqual(actualValues.getOrElse([])[1].id)
    })
});

describe('processItems', () => {
    it('should generate a new list that includes each found title', () => {
        const foundItems = [{'a':1, 'title':'firstTitle'}, {'b':2,'title':'secondTitle'}];
        const newList = processItems(foundItems);
        expect(newList.getOrElse([])[0].title).toEqual('firstTitle');
        expect(newList.getOrElse([])[1].title).toEqual('secondTitle');
    });

    it(`should display "${UNKNOWN_TITLE}" if no title is found`, () => {
        const foundItems = [{'a':1}, {'b':2, 'title':'firstTitle'}];
        const found = processItems(foundItems);
        expect(found.getOrElse([])[0].title).toEqual(UNKNOWN_TITLE);
    });

    it('The length of the results array should not change', () => {
        const foundItems = [{'a':1, 'title':'firstTitle'}, {'b':2,'title':'secondTitle'}];
        const newList = processItems(foundItems);
        expect(newList.getOrElse([]).length).toEqual(2);
    });
});
