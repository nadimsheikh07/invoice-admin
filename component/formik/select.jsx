import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

const TextBox = (props) => {
    const { name, label, value, required, options, fullWidth, helperText } = props

    return (
        <FormControl
            key={`key${name}`}
            error={helperText ? true : false}
            fullWidth={fullWidth}
            style={!fullWidth ? { width: "50%", paddingLeft: 5, paddingRight: 5 } : {}}
        >
            <InputLabel>{label}</InputLabel>


            <Select
                name={name}
                required={required}
                value={value}
                onChange={e => props.onChange(e)}
                inputProps={{
                    name: name,
                }}
            >
                {options && options.map(option => {
                    return (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>)
                })}
            </Select>

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}

export default TextBox;