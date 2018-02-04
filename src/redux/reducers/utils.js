import {isNil, traverse, assoc, ifElse, identity, compose, map, propEq, always} from 'ramda';
import {notNilOrEmptyString, splitPath} from "../../utils/generic";
import {maybe} from 'folktale';
import uuid from 'uuid/v1';

export const IdDoesMatch = (IdNumber) => propEq('id', IdNumber);

export const updateWithValueIfIdMatch = (ItemID, newValue, property) => ifElse(
    IdDoesMatch(ItemID),
    assoc(property, newValue),
    identity
);

export const updateAllWithValueIfIdMatch = compose(
    map,
    updateWithValueIfIdMatch
);

export const getFilePathOrPlaceholder = (fileName, placeholder) => ifElse(
    notNilOrEmptyString,
    splitPath,
    always(placeholder)
)(fileName);

const safeIdGeneration = (item) => maybe.Just(assoc('id', uuid(), item));
export const generateIds = traverse(maybe.of, safeIdGeneration);
// export const safeGet = ifElse(isNil,
//    maybe.Nothing,
//    maybe.Just
// );



