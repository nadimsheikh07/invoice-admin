import React from 'react'
import FormLayout from '../../../component/layout/formLayout'
import AdminLayout from '../../../component/layout'
import Form from '../../../component/formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const { t } = useTranslation([ "customers"])
    const formTitle = t('customers:form_title')
    const submitTitle = t('save')
    const router = useRouter()
    const { id } = router.query
    const acitionUrl = 'customers'
    const redirectUrl = '/customers'
    
    const form = [        
        {
            label: t('customers:name'),
            name: "name",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },                              
        {
            label: t('customers:email'),
            name: "email",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },                              
        {
            label: t('customers:contact'),
            name: "contact",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },                              
        {
            label: t('customers:pancard'),
            name: "pancard",
            type: "text",
            required: false,
            fullWidth: true,
            icon: "",
            validation: ""
        },                              
        {
            label: t('customers:gstin'),
            name: "gstin",
            type: "text",
            required: false,
            fullWidth: true,
            icon: "",
            validation: ""
        },                              
        {
            label: t('customers:address'),
            name: "address",
            type: "text",
            multiline: true,
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },                              
        {
            label: t('customers:status'),
            name: "status",
            type: "checkbox",
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
