import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

const TextBox = (props) => {
    const [showPassword, setShowPassword] = useState('')

    const { name, label, value, required, inputAdornmentPosition, fullWidth, helperText, disabled } = props

    return (
        <FormControl
            key={`key${name}`}
            error={helperText ? true : false}
            fullWidth={fullWidth}
            style={!fullWidth ? { width: "50%", paddingLeft: 5, paddingRight: 5 } : {}}
        >
            <TextField
                error={helperText ? true : false}
                name={name}
                label={label}
                type={showPassword ? 'text' : 'password'}
                required={required}
                value={value}
                disabled={disabled}
                onChange={e => props.onChange(e)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position={inputAdornmentPosition}>
                            <Icon onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'visibility' : 'visibility_off'}</Icon>
                        </InputAdornment>
                    )
                }}

            />

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}

export default TextBox;