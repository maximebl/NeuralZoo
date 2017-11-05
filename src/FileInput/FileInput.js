import React from 'react';
import {withStyles} from 'material-ui';
import Chip from 'material-ui/Chip';
import Input, { InputLabel } from 'material-ui/Input';
import {compose} from 'recompose';

const styles = theme => ({
    hideInputButton: {
        display: 'none',
    }
});

const BaseFileInput = (props) => {
    const {classes} = props;
    return (
        <div>

                <InputLabel htmlFor="name-simple">
                    <Chip
                        type="file"
                        label="TRY"
                        containerElement='label'
                        htmlFor="name-simple"
                        onRequestDelete={handleRequestDelete}>
                    </Chip>
                </InputLabel>
                <Input className={classes.hideInputButton} id="name-simple" type="file" />
        </div>
    )
};

export const StyledFileInput = compose(
    withStyles(styles)
);

export const FileInput = StyledFileInput(BaseFileInput);


function handleRequestDelete(e) {
    e.preventDefault();
    alert('You clicked the delete icon.');
}
