import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { apiConfig } from '../../config/api';
import ReactSelectMaterialUi from "react-select-material-ui";


const Index = (props) => {
    const { value, label, fullWidth, helperText, getOptionLabel, getOptionValue, url, onChange, formWhere } = props
    const [options, setOptions] = React.useState([])
    const [searchText, setSearchText] = React.useState("")

    React.useEffect(() => {
        getOptions()
    }, [])

    React.useEffect(() => {
        getOptions()
    }, [searchText])
    
    React.useEffect(() => {
        getOptions()
    }, [value])


    const getOptions = async () => {
        const query = {
            page: 1,
            pageSize: 10
        }

        if (searchText) {
            query.search = searchText
        }
        if (value) {
            query.selected = value
        }

        if (formWhere) {
            formWhere.forEach(element => {
                query[element.name] = element.value
            });
        }

        await apiConfig.get(url, { params: query })
            .then(
                result => {
                    if (result.status === 200) {
                        let selectOptions = []
                        if (result.data.data && result.data.data.length) {
                            result.data.data.forEach(element => {
                                selectOptions.push({
                                    label: element[getOptionLabel],
                                    value: element[getOptionValue],
                                })
                            });
                        }
                        setOptions(selectOptions)
                    }
                }
            );
    }


    return (
        <FormControl
            key={`key${label}`}
            error={helperText ? true : false}
            fullWidth={fullWidth}
            style={!fullWidth ? { width: "50%", paddingLeft: 5, paddingRight: 5 } : {}}
        >

            <ReactSelectMaterialUi
                label={label}
                value={Number(value)}
                options={options}
                onClick={()=>getOptions()}
                onChange={(e) => onChange(e)}
                onInput={(e) => setSearchText(e.target.value)}
                SelectProps={{
                    isClearable: true,
                }}
            />

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}

export default Index