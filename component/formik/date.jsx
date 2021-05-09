import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';

const TextBox = (props) => {
    const { name, label, value, required, variant, format, fullWidth, helperText, minDate, disablePast } = props

    const finalFormat = format ? format : 'MM-DD-YYYY'

    const onDataChange = (value) => {
        const dateValue = moment(value).format('YYYY-MM-DD')        
        props.onChange(dateValue)
    }

    return (
        <FormControl
            key={`key${name}`}
            error={helperText ? true : false}
            fullWidth={fullWidth}
            style={!fullWidth ? { width: "50%", paddingLeft: 5, paddingRight: 5 } : {}}
        >

            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    clearable
                    autoOk
                    variant={variant}
                    format={finalFormat}
                    margin="normal"
                    disablePast={disablePast}
                    required={required}
                    label={label}
                    value={value ? value : new Date()}
                    minDate={minDate}
                    name={name}
                    onChange={e => onDataChange(e)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    animateYearScrolling
                />
            </MuiPickersUtilsProvider>

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}

export default TextBox;