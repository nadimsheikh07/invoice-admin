import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        color: '#fff',
        textAlign: 'center',
        padding: theme.spacing(2, 4, 3),
    },
    loaderText: {
        marginLeft: 10
    }
}));

const Index = ({ options }) => {
    const classes = useStyles();

    const {
        text,
        open
    } = options;

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <CircularProgress color="inherit" />
                    <p className={classes.loaderText}>{text}</p>
                </div>
            </Fade>
        </Modal>
    );
};

export default Index;