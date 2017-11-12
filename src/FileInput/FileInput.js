import React from 'react';
import {withStyles} from 'material-ui';
import Chip from 'material-ui/Chip';
import Input, { InputLabel } from 'material-ui/Input';
import {compose, withHandlers, lifecycle, withState} from 'recompose';
import {construct, both, isEmpty, always, ifElse, not, isNil, split, last} from 'ramda';
import {connect} from "react-redux";
import {updateFileInputLabel, addInput} from "../redux/reducers/searchReducer";
import store from '../redux/store';
import uuid from 'uuid/v1';

const styles = theme => ({
    hideInputButton: {
        display: 'none',
    }
});

const PLACEHOLDER = 'TRY';

const BaseFileInput = (props) => {
    const {classes, onChangeHandler, id, fileInput} = props;
    return (
        <div>
            <InputLabel htmlFor={id}>
                <Chip
                    type="file"
                    id="fileInput"
                    label={fileInput.label}
                    containerElement='label'
                    htmlFor={id}
                    onRequestDelete={(e) => handleRequestDelete(id, e)}>
                </Chip>
            </InputLabel>
            <Input
                className={classes.hideInputButton}
                id={id}
                type="file"
                onChange={onChangeHandler}
            />
        </div>)
};

function fileInput(label) {
    this.label = label;
}

const FileInputConstructor = construct(fileInput);

export const StyledFileInput = compose(
    connect((state) => ({
            inputLabel: state.searchReducer.inputLabel,
            fileInput: state.searchReducer.fileInputs
    }),
        {updateFileInputLabel, addInput}
    ),
    withHandlers({onChangeHandler: props => () => onChangeHandler()}),
    withStyles(styles),
    withState('id', 'updateId', undefined),
    lifecycle({
        componentWillMount: function() {
            this.props.updateId(uuid());
        },
        componentDidMount: function() {
            debugger;
            let fileName = document.getElementById(this.props.id);
            let label = getFilePathOrPlaceholder(fileName.value, PLACEHOLDER);

            const FileInput = FileInputConstructor(label);
            this.props.addInput(FileInput);
        }
    })
);

export const FileInput = StyledFileInput(BaseFileInput);

const setInputLabel = (currentId, updateSource) => {
    //TODO: FP this part
    if(currentId !== undefined && updateSource !== undefined) {
        let fileName = document.getElementById(currentId);
        if(fileName !== null) {
            return getFilePathOrPlaceholder(fileName.value, PLACEHOLDER);
        }
    }
};

// force rendering
const onChangeHandler = () => store.dispatch(updateFileInputLabel({'rand':Math.random()}));

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
    store.dispatch(updateFileInputLabel({'rand':Math.random(), 'deleteTarget':itemToDeleteId}))
};
