import {assoc, ifElse, identity, compose, map, propEq} from 'ramda';

export const IdIs = (IdNumber) => propEq('id', IdNumber);

export const updateWithValueIfIdMatch = (ItemID, newValue, property) => ifElse(
    IdIs(ItemID),
    assoc(property, newValue),
    identity
);

export const updateAllWithValueIfIdMatch = compose(
    map,
    updateWithValueIfIdMatch
);

export const updatePropertyValueWhereIdMatch = (ItemID, newValue, property) => (
    {foundItems: updateAllWithValueIfIdMatch(ItemID, newValue, property)}
);