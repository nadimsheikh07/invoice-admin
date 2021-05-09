import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import moment from 'moment';

const TextBox = (props) => {
    const { name, label, value, required, variant, format, fullWidth, helperText } = props

    const finalFormat = format ? format : 'h:m A'

    const onDataChange = (value) => {
        const dateValue = moment(value).format(`MM-DD-YYYY ${finalFormat}`)
        props.onChange(dateValue)
    }

    return (
        <FormControl
            key={`key${name}`}
            error={helperText ? true : false}
            fullWidth={fullWidth}>

            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardTimePicker
                    clearable
                    autoOk
                    variant={variant}
                    format={finalFormat}
                    margin="normal"
                    required={required}
                    label={label}
                    value={value ? value : new Date()}
                    name={name}
                    onChange={e => onDataChange(e)}
                />
            </MuiPickersUtilsProvider>



            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}

export default TextBox;