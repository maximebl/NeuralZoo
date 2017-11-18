import {assoc, ifElse, identity, compose, map, propEq} from 'ramda';

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
