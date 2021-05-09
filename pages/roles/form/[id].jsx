import React from 'react'
import FormLayout from '../../../component/layout/formLayout'
import AdminLayout from '../../../component/layout'
import Form from '../../../component/formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const { t } = useTranslation(["common", "roles"])
    const formTitle = t('roles:form_title')
    const submitTitle = t('save')
    const router = useRouter()
    const { id } = router.query
    const acitionUrl = 'roles'
    const redirectUrl = '/roles'
    
    const form = [
        {
            label: t('roles:name'),
            name: "name",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },
        {
            label: t('roles:permissions'),
            name: "permissions",
            type: "multigroupcheckbox",
            url: "/permission_groups",
            getOptionLabel: "name",
            getOptionValue: "id",
            getChildOptionLabel: "name",
            getChildOptionValue: "id",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },
    ]

    return (
        <AdminLayout>
            <FormLayout title={formTitle} goBack={redirectUrl} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form form={form} redirect={redirectUrl} actionUrl={acitionUrl} id={id} submitTitle={submitTitle} />
            </FormLayout>
        </AdminLayout>
    )
}

export default Index
