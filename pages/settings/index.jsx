import React from 'react'
import FormLayout from '../../component/layout/formLayout'
import AdminLayout from '../../component/layout'
import Form from '../../component/formik';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const { t } = useTranslation([ "settings"])
    const formTitle = t('settings:form_title')
    const submitTitle = t('common:save')    
    const acitionUrl = 'settings'
    const redirectUrl = '/settings'
    

    
    const form = [
        {
            label: t('settings:name'),
            name: "name",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },        
        {
            label: t('settings:email'),
            name: "email",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },        
        {
            label: t('settings:contact'),
            name: "contact",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        }          
    ]

    return (
        <AdminLayout>
            <FormLayout title={formTitle}>
                <Form form={form} actionUrl={acitionUrl} id="update" submitTitle={submitTitle} />
            </FormLayout>
        </AdminLayout>
    )
}



export default Index
