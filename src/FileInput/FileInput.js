import React from 'react';
import {withStyles} from 'material-ui';
import Chip from 'material-ui/Chip';
import Input, { InputLabel } from 'material-ui/Input';
import {compose, withHandlers} from 'recompose';
import {always, ifElse, curry} from 'ramda';
import {connect} from "react-redux";
import {updateFileInputLabel} from "../redux/reducers/actions";
import store from '../redux/store';
import {notNilOrEmptyString, splitPath} from "../utils/generic";

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
        {updateFileInputLabel}
    ),
    withHandlers({onChangeHandler: props => () => onChangeHandler}),
    withStyles(styles)
);

export const FileInput = StyledFileInput(BaseFileInput);

const getFilePathOrPlaceholder = (fileName, placeholder) => ifElse(
    always(notNilOrEmptyString(fileName)),
    always(splitPath(fileName)),
    always(placeholder)
);

const onChangeHandler = (id) => {
    let fileName = document.getElementById(id);
    let newLabel = getFilePathOrPlaceholder(fileName.value)(PLACEHOLDER);
    return store.dispatch(updateFileInputLabel({'newLabel': newLabel, 'id':id}));
};


const handleRequestDelete = (itemToDeleteId, e) => {
    e.preventDefault();
    store.dispatch(updateFileInputLabel({'newLabel': PLACEHOLDER, 'id':itemToDeleteId}))
};
