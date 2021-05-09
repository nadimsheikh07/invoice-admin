import React from 'react';
import { Divider, ListItem, ListItemText } from '@material-ui/core';

const Index = (props) => {
    const { label } = props
    return (
        <React.Fragment>
            <ListItem>
                <ListItemText primary={label} />
            </ListItem>
            <Divider />
        </React.Fragment>
    )


}

export default Index;