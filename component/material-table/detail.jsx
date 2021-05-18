import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { apiConfig } from '../../config/api';
import MaterialTable from 'material-table';
import { Avatar, Button, Icon } from "@material-ui/core";
import { useLoader } from '../loader'

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    image: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        float: 'right'
    },
}));

const Index = (props) => {
    const classes = useStyles();
    const loader = useLoader();
    const { url, id, columns, actionButtons } = props
    const [data, setState] = useState([]);

    const getData = async (id) => {
        loader({ open: true })
        await apiConfig.get(`${url}/${id}`).then((response) => {
            if (response.status === 200) {
                const { data } = response
                setState(data);
            }
            loader({ open: false })
        }).catch(() => {
            loader({ open: false })
        })
    }

    useEffect(() => {
        if (id && id !== 'new') {
            getData(id)
        }
    }, [id])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">

                <TableBody>

                    {actionButtons && actionButtons.map(actionButton => {
                        let showBtn = true
                        if (actionButton.where) {
                            if (data[actionButton.where.field] != actionButton.where.value) {
                                showBtn = false
                            }
                        }
                        return (
                            <TableRow>
                                <TableCell colSpan={2}>
                                    {showBtn && <Button onClick={actionButton.action} color="primary" autoFocus>{actionButton.text}</Button>}
                                </TableCell>
                            </TableRow>
                        )
                    })}

                    {columns && columns.map(column => {
                        if (column.type == 'list') {
                            if (data[column.field]) {
                                return (
                                    <TableRow>
                                        <TableCell colSpan={2}>
                                            <MaterialTable
                                                style={{ width: '100%' }}
                                                title={column.title}
                                                columns={column.columns}
                                                data={data[column.field]}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        } else {
                            return (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {column.title}
                                    </TableCell>

                                    <TableCell align="right">
                                        {column.field != 'image' && data[column.field]}

                                        {column.field == 'image' && <Avatar variant="square" src={data[column.field]} className={classes.image} ><Icon fontSize="large" >wallpaper</Icon></Avatar>}

                                    </TableCell>
                                </TableRow>
                            )
                        }
                    })}


                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Index;