import React from 'react';
import {withStyles} from 'material-ui';
import Chip from 'material-ui/Chip';
import Input, {InputLabel} from 'material-ui/Input';
import {compose} from 'recompose';
import {connect} from "react-redux";
import {displayUploadedImage, showModelResults, updateFileInputLabel} from "../redux/reducers/actions";
import store from '../redux/store';
import {PLACEHOLDER_TRY} from "../utils/constants";
import {getFilePathOrPlaceholder} from "../redux/reducers/utils";
import {maybe} from 'folktale';

const styles = theme => ({
    hideInputButton: {
        display: 'none',
    }
});

const BaseFileInput = (props) => {
    const {classes, id, label, endpoint} = props;
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
                onChange={(e) => onChangeHandler(id, endpoint, e)}
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

const onChangeHandler = (id, endpoint) => {
    let fileElement = document.getElementById(id);
    const file = fileElement.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => store.dispatch(displayUploadedImage({'imageURL': e.target.result, 'id': id}));

    let formData = new FormData();
    formData.append("image", file);

    postModelResult(formData, endpoint, id);
    let newLabel = getFilePathOrPlaceholder(fileElement.value, PLACEHOLDER_TRY);
    return store.dispatch(updateFileInputLabel({'newLabel': newLabel, 'id': id}));
};

const handleRequestDelete = (itemToDeleteId, e) => {
    e.preventDefault();
    store.dispatch(updateFileInputLabel({'newLabel': PLACEHOLDER_TRY, 'id': itemToDeleteId}))
};

const postModelResult = (formData, endpoint, id) => {
    fetch(`http://localhost:4000${endpoint}`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
        },
        body: formData
    }).then((response) => response.json()
        .then((data) => store.dispatch(showModelResults({'result': data, 'id': id})))
    )
};

