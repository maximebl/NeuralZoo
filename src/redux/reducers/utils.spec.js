import {getFilePathOrPlaceholder, updateAllWithValueIfIdMatch, updateWithValueIfIdMatch} from "./utils";

describe('getFilePathOrPlaceholder', () => {
    it('should return a placeholder text if the input file name is empty', () => {
        const myPlaceholder = 'TEST PLACEHOLDER';
        const myFile = '';
        let actual = getFilePathOrPlaceholder(myFile, myPlaceholder);

        getFilePathOrPlaceholder(myFile, myPlaceholder);
        expect(actual).toEqual(myPlaceholder);
    });

    it('should return a placeholder text if the input file name is undefined', () => {
        const myPlaceholder = 'TEST PLACEHOLDER';
        const myFile = undefined;
        let actual = getFilePathOrPlaceholder(myFile, myPlaceholder);

        getFilePathOrPlaceholder(myFile, myPlaceholder);
        expect(actual).toEqual(myPlaceholder);
    });

    it('should return the file name if the file name is not empty or undefined', () => {
        const myPlaceholder = 'TEST PLACEHOLDER';
        const myFilePath = 'my\\test\\file.jpg';
        const myFile = 'file.jpg';
        const actual = getFilePathOrPlaceholder(myFilePath, myPlaceholder);

        getFilePathOrPlaceholder(myFile, myPlaceholder);
        expect(actual).toEqual(myFile);
    });
});

describe('updateWithValueIfIdMatch', () => {
    it('should return a new object with updated property values where the id match', () => {
        const newValue = 'myNewValue';
        const myObject = {'id':1, 'a': 321};

        const actual = updateWithValueIfIdMatch(1, newValue, 'a')(myObject);
        const expected = {id:1, a: newValue};

        expect(actual).toEqual(expected)
    });
});

describe('updateAllWithValueIfIdMatch', () => {
    it('should only return a new object with every properties updated where the id match', () => {
        const newValue = 'myNewValue';
        const myObjects = [{'id': 2, 'a': 321}, {'id':1, 'a': 321}];

        const expected = [{'id': 2, 'a': 321}, {'id': 1, 'a': newValue}];
        const actual = updateAllWithValueIfIdMatch(1, newValue, 'a')(myObjects);

        expect(actual).toEqual(expected);
    });
});
