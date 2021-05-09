import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import FormHelperText from '@material-ui/core/FormHelperText';

const TextBox = (props) => {
    const { name, label, variant, type, icon, value, required, multiline, inputAdornmentPosition, fullWidth, helperText, disabled } = props

    return (
        <FormControl
            key={`key${name}`}
            error={helperText ? true : false}
            fullWidth={fullWidth}
            style={!fullWidth ? { width: "50%", paddingLeft: 5, paddingRight: 5 } : {}}
        >
            <TextField
                error={helperText ? true : false}
                variant={variant}
                name={name}
                label={label}
                type={type}
                multiline={multiline}
                required={required}
                disabled={disabled}
                value={value}
                onChange={e => props.onChange(e)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position={inputAdornmentPosition}>
                            <Icon >{icon}</Icon>
                        </InputAdornment>
                    )
                }}
            />

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}

export default TextBox;