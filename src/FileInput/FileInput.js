import React from 'react';
import {withStyles} from 'material-ui';
import Chip from 'material-ui/Chip';
import Input, { InputLabel } from 'material-ui/Input';
import {compose, withHandlers} from 'recompose';
import {isEmpty, prop, and, always, ifElse, not, isNil, split, last} from 'ramda';
import {connect} from "react-redux";
import {updateFileInputLabel} from "../redux/reducers/searchReducer";
import store from '../redux/store';

const styles = theme => ({
    hideInputButton: {
        display: 'none',
    }
});

const BaseFileInput = (props) => {
    const {classes, inputLabel, onChangeHandler} = props;
    return (
        <div>
            <InputLabel htmlFor="name-simple">
                <Chip
                    type="file"
                    id="fileInput"
                    label={inputLabel}
                    containerElement='label'
                    htmlFor="name-simple"
                    onRequestDelete={handleRequestDelete}>
                </Chip>
            </InputLabel>
            <Input
                className={classes.hideInputButton}
                id="name-simple"
                type="file"
                onChange={onChangeHandler}
            />
        </div>)
};

export const StyledFileInput = compose(
    connect((state) => ({inputLabel: state.searchReducer.inputLabel}),
        {updateFileInputLabel}
    ),
    withHandlers({
        onChangeHandler: props => event => {
            onChangeHandler(event)
        }
    }),
    withStyles(styles)
);

export const FileInput = StyledFileInput(BaseFileInput);

const onChangeHandler = (event) => {
    let currentFilePath = getInputFilePathText();
    store.dispatch(updateFileInputLabel(currentFilePath));
};

const getInputFilePathText = () => {
    let fileName = document.getElementById("name-simple");

    //TODO curry out fileName
    const notEmptyString = compose(
        not,
        isEmpty,
        prop('value')
    );

    const notNilOrEmptyString = compose(
        and(notEmptyString(fileName)),
        not,
        isNil
    );

    const splitPath = compose(
        last,
        split("\\"),
        prop('value')
    );

    const pathElseTRY = (file) => ifElse(
        always(notNilOrEmptyString(file)),
        always(splitPath(file)),
        always('TRY')
    );
    return pathElseTRY(fileName)();
};

const handleRequestDelete = (e) => {
    e.preventDefault();
    store.dispatch(updateFileInputLabel('TRY'));
};
