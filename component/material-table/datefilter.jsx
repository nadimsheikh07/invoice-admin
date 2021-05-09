import React from 'react';
import { useState } from "react";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { IconButton, InputAdornment, Icon } from "@material-ui/core";

const Index = (props) => {

    const [date, setDate] = useState(null);

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
                clearable
                variant="inline"
                format="DD-MM-YYYY"
                value={date}
                ampm
                autoOk
                allowKeyboardControl
                style={{ minWidth: 175 }}
                onChange={(event) => {
                    setDate(event);
                    props.onFilterChanged(props.columnDef.tableData.id, event);
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <Icon>event</Icon>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </MuiPickersUtilsProvider>
    );
}

export default Index