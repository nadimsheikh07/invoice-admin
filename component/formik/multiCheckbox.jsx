import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { apiConfig } from '../../config/api';
import { InputLabel } from '@material-ui/core';

const MuiCheckBox = (props) => {
    const { name, label, value, url, required, fullWidth, helperText, disabled, getOptionLabel, getOptionValue } = props

    const [options, setOptions] = React.useState([])
    const [selected, setSelected] = React.useState([])

    React.useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        await apiConfig.get(url).then((response) => {
            if (response.status === 200) {
                let options = []
                if (response.data) {
                    response.data.forEach(element => {
                        options.push({
                            label: element[getOptionLabel],
                            value: element[getOptionValue],
                        })
                    });
                }

                setOptions(options)
            }
        })
    }

    const handleChange = (e) => {
        const index = selected.indexOf(e)
        if (index > -1) {
            setSelected(oldArray => {
                let newData = oldArray.slice()
                newData.splice(index, 1)
                return newData
            })
        } else {
            setSelected(oldArray => [...oldArray, e])
        }
    }


    React.useEffect(() => {
        props.onChange(selected)
    }, [selected])

    return (
        <FormControl
            key={`key${name}`}
            error={helperText ? true : false}
            fullWidth={fullWidth}
        >

            <InputLabel>{label}</InputLabel>
            <br />
            <br />



            {options && options.map((option) => {
                let checked = false
                if (value && value.includes(option.value)) {
                    checked = true
                }
                return (
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            checked={checked}
                            disabled={disabled}
                            control={<Checkbox color="primary" required={required} />}
                            label={option.label}
                            labelPlacement="end"
                            onChange={() => handleChange(option.value)}
                        />
                    </FormGroup>
                )
            })}

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )


}

export default MuiCheckBox;