import React from 'react';
import FormLayout from '../component/layout/formLayout';
import AdminLayout from '../component/layout'
import { useTranslation } from 'react-i18next';
const Index = () => {
    const { t } = useTranslation("error")

    const formTitle = t("error:title")
    return (
        <AdminLayout>
            <FormLayout title={formTitle} marginTop={200} margin={10}>
                <p style={{ textAlign: 'center' }}>{t("error:permission_error")}</p>
            </FormLayout>
        </AdminLayout>
    )
}

export default Index