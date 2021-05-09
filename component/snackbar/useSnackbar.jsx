import { useContext } from 'react';
import SnackbarContext from './SnackbarContext';

const useSnackbar = () => {
    const snack = useContext(SnackbarContext);
    return snack;
};

export default useSnackbar;