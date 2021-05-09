import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const MuiCheckBox = (props) => {
    const { name, label, value, required, fullWidth, helperText, disabled } = props
    return (
        <FormControl
            key={`key${name}`}
            error={helperText ? true : false}
            fullWidth={fullWidth}
        >
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    checked={value ? true : false}
                    disabled={disabled}
                    name={name}
                    control={<Checkbox color="primary" required={required} />}
                    label={label}
                    labelPlacement="end"
                    onChange={e => props.onChange(e)}
                />
            </FormGroup>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )


}

export default MuiCheckBox;