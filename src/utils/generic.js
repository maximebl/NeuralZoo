import {compose, both, isEmpty, not, isNil, split, last} from 'ramda';

export const notEmptyValue = compose(
    not,
    isEmpty
);

export const notNil = compose(
    not,
    isNil
);

export const notNilOrEmptyString = both(
    notEmptyValue,
    notNil
);

export const splitPath = compose(
    last,
    split("\\")
);