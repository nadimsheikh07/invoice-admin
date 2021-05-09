import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import { Icon, IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    halfRoot: {
        alignItems: "flex-end" // push the dialog to bottom
    },
    halfPaper: {
        // make the content full width
        margin: 0,
        maxWidth: "100%",
        width: "100%"
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));

const ModalDialog = ({ open, options, onCancel, onConfirm, onClose }) => {
    const classes = useStyles();
    const {
        title,
        description,
        confirmationText,
        cancellationText,
        dialogProps,
        confirmationButtonProps,
        cancellationButtonProps,
        fullScreen,
        halfScreen,
        fullWidth,
        showConfirm,
        showCancel,
        showClose
    } = options;

    return (
        <Dialog fullScreen={fullScreen} fullWidth={fullWidth} {...dialogProps} open={open} onClose={onClose} classes={halfScreen ? { container: classes.halfRoot, paper: classes.halfPaper } : {}}>
            {title && (
                <DialogTitle disableTypography className={classes.dialogTitle}>
                    <Typography variant="h5">{title}</Typography>
                    {showClose && <IconButton onClick={onCancel}>
                        <Icon>close</Icon>
                    </IconButton>}
                </DialogTitle>
            )}
            {description && (
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                {showCancel && <Button {...cancellationButtonProps} onClick={onCancel}>
                    {cancellationText}
                </Button>}
                {showConfirm && <Button color="primary" {...confirmationButtonProps} onClick={onConfirm}>
                    {confirmationText}
                </Button>}
            </DialogActions>
        </Dialog>
    );
};

export default ModalDialog;