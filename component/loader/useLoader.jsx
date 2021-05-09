import { useContext } from 'react';
import LoaderContext from './LoaderContext';

const useLoader = () => {
    const loader = useContext(LoaderContext);
    return loader;
};

export default useLoader;