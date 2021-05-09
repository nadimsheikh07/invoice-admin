import React, { useState, useCallback, Fragment } from 'react';
import LoaderContext from './LoaderContext';
import Loader from './Loader';

const DEFAULT_OPTIONS = {
    text: 'Loading...',
    open: false,
};

const buildOptions = (options) => {
    return {
        ...DEFAULT_OPTIONS,
        ...options,
    }
};

const LoaderProvider = ({ children }) => {
    const [options, setOptions] = useState({ ...DEFAULT_OPTIONS });

    const loader = useCallback((options = {}) => {
        return new Promise((resolve) => {
            resolve(setOptions(buildOptions(options)))
        });
    }, []);

    return (
        <Fragment>
            <LoaderContext.Provider value={loader}>
                {children}
            </LoaderContext.Provider>
            <Loader
                options={options}
            />
        </Fragment>
    );
};

export default LoaderProvider;