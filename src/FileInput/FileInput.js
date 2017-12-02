import React from 'react';
import {withStyles} from 'material-ui';
import Chip from 'material-ui/Chip';
import Input, { InputLabel } from 'material-ui/Input';
import {compose} from 'recompose';
import {always, ifElse} from 'ramda';
import {connect} from "react-redux";
import {updateFileInputLabel} from "../redux/reducers/actions";
import store from '../redux/store';
import {notNilOrEmptyString, splitPath} from "../utils/generic";
import {PLACEHOLDER_TRY} from "../utils/constants";

const styles = theme => ({
    hideInputButton: {
        display: 'none',
    }
});

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
    withStyles(styles)
);

export const FileInput = StyledFileInput(BaseFileInput);

const getFilePathOrPlaceholder = (fileName, placeholder) => ifElse(
    notNilOrEmptyString,
    splitPath,
    always(placeholder)
)(fileName);

const onChangeHandler = (id) => {
    let fileName = document.getElementById(id);
    let newLabel = getFilePathOrPlaceholder(fileName.value, PLACEHOLDER_TRY);
    debugger;

    const file = fileName.files[0];
    let formData = new FormData();
    formData.append("image", file);
    upload(formData);
    return store.dispatch(updateFileInputLabel({'newLabel': newLabel, 'id':id}));
};


const handleRequestDelete = (itemToDeleteId, e) => {
    e.preventDefault();
    store.dispatch(updateFileInputLabel({'newLabel': PLACEHOLDER_TRY, 'id':itemToDeleteId}))
};

const upload = (formData) => {
    fetch('http://localhost:4000/imagenet/resnet18/classify', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
            "Content-Type": "image/jpeg",
            "Accept": "application/json",
            "Accept-Encoding":"gzip, deflate, br",
            'Origin': 'http://localhost:4000',
            "Accept-Language":"en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7"
        },
        body: formData
    }).then(
        response => {
            debugger;
            return JSON.stringify(response)
        }
    ).then(
        success => {
            debugger;
            return console.log(success)
        }
).catch(
        error => {
            debugger;
            return console.log(error)
        }
);
};

