import React from 'react';
import MaterialUIAdmin from './adminLayout'
import { useTranslation } from "react-i18next"
const Index = (props) => {
    const { t } = useTranslation()
    const { children } = props;

    return (
        <MaterialUIAdmin title={t('appTitle')} >
            {children}
        </MaterialUIAdmin>
    )
}

export default Index