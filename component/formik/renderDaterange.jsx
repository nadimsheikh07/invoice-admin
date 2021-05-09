import React from 'react';
import { DateRangePicker } from "materialui-daterange-picker";

const MuiDatePicker = (props) => {

    const handleChange = (value, name, index) => {
        props.handleChange(value, name, index)
    }

    const { open, name, value, index } = props

    return (
        <DateRangePicker
            key={`key${name}`}
            open={open}
            initialDateRange={value}
            onChange={range => handleChange(range, name, index)}
        />
    )

}
export default MuiDatePicker;