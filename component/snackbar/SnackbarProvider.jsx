import React, { useState, useCallback, Fragment } from 'react';
import SnackbarContext from './SnackbarContext';
import Snackbar from './Snackbar';

const DEFAULT_OPTIONS = {
    message: '',
    severity: '',
    autoHideDuration: 5000,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
    }
};

const buildOptions = (defaultAnchorOrigin, defaultAautoHideDuration, options) => {
    const anchorOrigin = {
        ...(defaultAnchorOrigin || DEFAULT_OPTIONS.anchorOrigin),
        ...(options.anchorOrigin || {}),
    };
    const autoHideDuration = (defaultAautoHideDuration || DEFAULT_OPTIONS.autoHideDuration) || (options.autoHideDuration)

    return {
        ...DEFAULT_OPTIONS,
        ...options,
        anchorOrigin,
        autoHideDuration
    }
};

const SnackbarProvider = ({ children, anchorOrigin, autoHideDuration }) => {
    const [options, setOptions] = useState({ ...DEFAULT_OPTIONS, ...anchorOrigin, ...autoHideDuration });
    const [open, setOpen] = useState(false);

    const snack = useCallback((options = {}) => {
        return new Promise((resolve) => {
            setOptions(buildOptions(anchorOrigin, autoHideDuration, options));
            resolve(setOpen(true))
        });
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);


    return (
        <Fragment>
            <SnackbarContext.Provider value={snack}>
                {children}
            </SnackbarContext.Provider>
            <Snackbar
                open={open}
                options={options}
                onClose={handleClose}
            />
        </Fragment>
    );
};

export default SnackbarProvider;