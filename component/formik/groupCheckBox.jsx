import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { apiConfig } from '../../config/api';

const MuiGroupCheckBox = (props) => {
    const { name, label, value, url, required, fullWidth, helperText, disabled, getOptionLabel, getOptionValue, getChildOptionLabel, getChildOptionValue } = props

    const [options, setOptions] = React.useState([])

    React.useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        await apiConfig.get(url).then((response) => {
            if (response.status === 200) {
                setOptions(response.data)
            }
        })
    }

    const handleChange = (e) => {
        const index = value.indexOf(e)
        let selected = value || []
        if (index > -1) {
            selected.splice(index, 1)
        } else {
            selected.push(e)
        }
        props.onChange(selected)
    }

    const getLabel = (element) => {
        return element[getOptionLabel]
    }

    const getValue = (element) => {
        return element[getOptionValue]
    }

    const getChildLabel = (element) => {
        return element[getChildOptionLabel]
    }

    const getChildValue = (element) => {
        return element[getChildOptionValue]
    }

    const handleCheckAll = (e, selected) => {
        e.persist()
        const selectedItems = value

        if (e.target.checked) {
            if (selected.children) {
                selected.children.forEach((element) => {
                    const index = selectedItems.indexOf(getChildValue(element))
                    if (index >= 0) {
                        selectedItems.splice(index, 1)
                    }
                    selectedItems.push(getChildValue(element))
                })
            }
        } else {
            if (selected.children) {
                selected.children.forEach((element) => {
                    const index = selectedItems.indexOf(getChildValue(element))
                    if (index >= 0) {
                        selectedItems.splice(index, 1)
                    }
                })
            }
        }

        props.onChange(selectedItems)
    }

    return (
        <FormControl
            key={`key${name}`}
            error={helperText ? true : false}
            fullWidth={fullWidth}
        >

            <FormLabel style={{ marginBottom: 10 }} component='legend'>{label}</FormLabel>

            {options && options.map((option) => {

                const mainLabel = getLabel(option)
                let parentChecked = false

                const childrenIds = option && option.children && option.children.map((childrenOption) => childrenOption[getChildOptionValue])

                if (childrenIds) {
                    childrenIds.forEach((element) => {
                        if (value.includes(element)) {
                            parentChecked = true
                        }
                    })
                }

                return (
                    <Accordion key={`${options.name}Accordion${mainLabel}`}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={mainLabel}
                            id={getValue(option)}
                        >
                            <FormControlLabel
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={
                                    <Checkbox
                                        checked={parentChecked}
                                        onChange={(e) => handleCheckAll(e, option)}
                                    />
                                }
                                label={mainLabel}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <Grid container>
                                    {option.children && option.children.map((childrenOption) => {
                                        let checked = false
                                        const label = getChildLabel(childrenOption)
                                        if (value) {
                                            checked = value.includes(
                                                getChildValue(childrenOption)
                                            )
                                        }
                                        return (
                                            <Grid
                                                container
                                                item
                                                sm={12}
                                                md={6}
                                                lg={6}
                                                key={`${options.name}FormControlLabel${label}`}
                                            >
                                                <FormControlLabel
                                                    checked={checked}
                                                    disabled={disabled}
                                                    control={<Checkbox color="primary" required={required} />}
                                                    label={label}
                                                    labelPlacement="end"
                                                    onChange={() => handleChange(getChildValue(childrenOption))}
                                                />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>

                )
            })}

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )


}

export default MuiGroupCheckBox;