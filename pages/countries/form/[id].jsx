import React from 'react'
import FormLayout from '../../../component/layout/formLayout'
import AdminLayout from '../../../component/layout'
import Form from '../../../component/formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const { t } = useTranslation(["common", "countries"])
    const formTitle = t('countries:form_title')
    const submitTitle = t('save')
    const router = useRouter()
    const { id } = router.query
    const acitionUrl = 'countries'
    const redirectUrl = '/countries'
    
    const form = [
        {
            label: t('countries:name'),
            name: "name",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },
        {
            label: t('countries:code'),
            name: "code",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },        
        {
            label: t('countries:phonecode'),
            name: "phonecode",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },        
    ]

    return (
        <AdminLayout>
            <FormLayout title={formTitle} goBack={redirectUrl}>
                <Form form={form} redirect={redirectUrl} actionUrl={acitionUrl} id={id} submitTitle={submitTitle} />
            </FormLayout>
        </AdminLayout>
    )
}


export default Index
