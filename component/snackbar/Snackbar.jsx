import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Index = ({ open, options, onClose }) => {
    const {
        message,
        severity,
        anchorOrigin,
        autoHideDuration
    } = options;

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <Snackbar
            anchorOrigin={anchorOrigin}
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={() => onClose()}
        >
            <Alert onClose={() => onClose()} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Index;