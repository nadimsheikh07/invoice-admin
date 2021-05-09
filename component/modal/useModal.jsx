import { useContext } from 'react';
import ModalContext from './ModalContext';

const useModal = () => {
    const confirm = useContext(ModalContext);
    return confirm;
};

export default useModal;