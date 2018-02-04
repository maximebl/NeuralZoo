import {notNilOrEmptyString, splitPath, notEmptyValue} from "./generic";

describe('notNilOrEmptyString', () => {
    it('should return false if the input is an empty string', () => {
       const expected = false;
       const input = '';
       const actual = notNilOrEmptyString(input);
       expect(actual).toEqual(expected);
    });

    it('should return false if the input is undefined', () => {
       const expected = false;
       const input = undefined;
       const actual = notNilOrEmptyString(input);
       expect(actual).toEqual(expected);
    });

    it('should return true if the input is not undefined or an empty string', () => {
       const expected = true;
       const input = 'validString';
       const actual = notNilOrEmptyString(input);
       expect(actual).toEqual(expected);
    })
});

describe('splitPath', () => {
    it('should return only the name of the file', () => {
        const myFilePath = 'my\\file\\path\\test.jpg';
        const expected = 'test.jpg';
        const actual = splitPath(myFilePath);
        expect(actual).toEqual(expected);
    });
});

describe('notEmptyValue', () => {
    it('should return true if value is not empty', () => {
        const notEmpty = notEmptyValue('a');
        expect(notEmpty).toEqual(true);
    });

    it('should return false if value is empty', () => {
        const empty = notEmptyValue('');
        expect(empty).toEqual(false);
    });
});
