import React from 'react';
import {withStyles} from 'material-ui';
import Chip from 'material-ui/Chip';
import Input, { InputLabel } from 'material-ui/Input';
import {compose, withHandlers} from 'recompose';
import {both, isEmpty, always, ifElse, not, isNil, split, last} from 'ramda';
import {connect} from "react-redux";
import {updateFileInputLabel, addInput} from "../redux/reducers/searchReducer";
import store from '../redux/store';

const styles = theme => ({
    hideInputButton: {
        display: 'none',
    }
});

const PLACEHOLDER = 'TRY';

const BaseFileInput = (props) => {
    const {classes, id, label} = props;
    return (
        <div>
            <InputLabel htmlFor={id}>
                <Chip
                    type="file"
                    id="fileInput"
                    label={label}
                    containerElement='label'
                    htmlFor={id}
                    onRequestDelete={(e) => handleRequestDelete(id, e)}>
                </Chip>
            </InputLabel>
            <Input
                className={classes.hideInputButton}
                id={id}
                type="file"
                onChange={(e) => onChangeHandler(id, e)}
            />
        </div>)
};

export const StyledFileInput = compose(
    connect((state) => ({
            inputLabel: state.searchReducer.inputLabel,
            fileInput: state.searchReducer.fileInputs
    }),
        {updateFileInputLabel, addInput}
    ),
    withHandlers({onChangeHandler: props => () => onChangeHandler}),
    withStyles(styles)
);

export const FileInput = StyledFileInput(BaseFileInput);

const setInputLabel = (currentId) => {
    //TODO: FP this part
    if(currentId !== undefined) {
        let fileName = document.getElementById(currentId);
        if(fileName !== null) {
            return getFilePathOrPlaceholder(fileName.value, PLACEHOLDER);
        }
    }
};

// force rendering
const onChangeHandler = (id) => {
    let fileName = document.getElementById(id);
    let newLabel = getFilePathOrPlaceholder(fileName.value, PLACEHOLDER);
    return store.dispatch(updateFileInputLabel({'newLabel':newLabel, 'id':id}));
};

const notEmptyValue = compose(
    not,
    isEmpty
);

const notNil = compose(
    not,
    isNil
);

const notNilOrEmptyString = both(
    notEmptyValue,
    notNil
);

const splitPath = compose(
    last,
    split("\\")
);


const getFilePathOrPlaceholder = (fileName, placeholder) =>
    ifElse(
        always(notNilOrEmptyString(fileName)),
        always(splitPath(fileName)),
        always(placeholder)
    )();

const handleRequestDelete = (itemToDeleteId, e) => {
    e.preventDefault();
    store.dispatch(updateFileInputLabel({'newLabel': PLACEHOLDER, 'id':itemToDeleteId}))
};
