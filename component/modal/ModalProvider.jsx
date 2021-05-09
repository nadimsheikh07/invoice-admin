import { useRouter } from 'next/router';
import React, { useState, useCallback, Fragment, useEffect } from 'react';
import ModalContext from './ModalContext';
import ModalDialog from './ModalDialog';

const DEFAULT_OPTIONS = {
    title: '',
    description: '',
    confirmationText: 'Ok',
    cancellationText: 'Cancel',
    dialogProps: {},
    confirmationButtonProps: {},
    cancellationButtonProps: {},
    halfScreen: false,
    fullScreen: false,
    fullWidth: true,
    showConfirm: false,
    showCancel: false,
    showClose: false
};

const buildOptions = (defaultOptions, options) => {
    const dialogProps = {
        ...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
        ...(options.dialogProps || {}),
    };
    const confirmationButtonProps = {
        ...(defaultOptions.confirmationButtonProps || DEFAULT_OPTIONS.confirmationButtonProps),
        ...(options.confirmationButtonProps || {}),
    };
    const cancellationButtonProps = {
        ...(defaultOptions.cancellationButtonProps || DEFAULT_OPTIONS.cancellationButtonProps),
        ...(options.cancellationButtonProps || {}),
    };

    return {
        ...DEFAULT_OPTIONS,
        ...defaultOptions,
        ...options,
        dialogProps,
        confirmationButtonProps,
        cancellationButtonProps,
    }
};

const ModalProvider = ({ children, defaultOptions = {} }) => {
    const [options, setOptions] = useState({ ...DEFAULT_OPTIONS, ...defaultOptions });
    const [resolveReject, setResolveReject] = useState([]);
    const [resolve, reject] = resolveReject;

    const router = useRouter();

    useEffect(() => {
        setResolveReject([]);
    }, [router.asPath]);

    const confirm = useCallback((options = {}) => {
        return new Promise((resolve, reject) => {
            setOptions(buildOptions(defaultOptions, options));
            setResolveReject([resolve, reject]);
        });
    }, []);

    const handleClose = useCallback(() => {
        setResolveReject([]);
    }, []);

    const handleCancel = useCallback(() => {
        reject();
        handleClose();
    }, [reject, handleClose]);

    const handleConfirm = useCallback(() => {
        resolve();
        handleClose();
    }, [resolve, handleClose]);

    return (
        <Fragment>
            <ModalContext.Provider value={confirm}>
                {children}
            </ModalContext.Provider>
            <ModalDialog
                open={resolveReject.length === 2}
                options={options}
                onClose={handleClose}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </Fragment>
    );
};

export default ModalProvider;