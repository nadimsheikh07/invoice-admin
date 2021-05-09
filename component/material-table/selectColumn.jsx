import { Checkbox, FormControlLabel, FormGroup, List, ListItem } from '@material-ui/core'
import React from 'react'

const Index = (props) => {
    const [colSelected, setColSelected] = React.useState(props.selectedCols)
    const { columns, onSelectChange } = props


    const handleChange = (e) => {
        const index = colSelected.indexOf(e)
        if (index > -1) {
            setColSelected(oldArray => {
                let newData = oldArray.slice()
                newData.splice(index, 1)
                return newData
            })
        } else {
            setColSelected(oldArray => [...oldArray, e])
        }
    }

    React.useEffect(() => {        
        onSelectChange(colSelected)
    }, [colSelected])


    return (
        <List>
            {columns && columns.map((column) => {
                const index = colSelected.indexOf(column.field)
                return (
                    <ListItem key={`selectColumn${column.title}`}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={index > -1 ? true : false} onChange={() => handleChange(column.field)} name={column.field} />}
                                label={column.title}
                            />
                        </FormGroup>
                    </ListItem>
                )
            })}

        </List>
    )
}
export default Index