import React from 'react'
import FormLayout from '../../component/layout/formLayout'
import AdminLayout from '../../component/layout'
import Form from '../../component/formik';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const { t } = useTranslation(["common", "settings"])
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
        },        
        {
            label: t('settings:distributor_role'),
            name: "distributor_role",
            type: "autocomplete",
            url: "/roles",
            getOptionLabel: 'name',
            getOptionValue: 'id',
            fullWidth: true,
            icon: "",
            validation: "required"
        },        
        {
            label: t('settings:promotor_role'),
            name: "promotor_role",
            type: "autocomplete",
            url: "/roles",
            getOptionLabel: 'name',
            getOptionValue: 'id',
            fullWidth: true,
            icon: "",
            validation: "required"
        },        
        {
            label: t('settings:franchise_role'),
            name: "franchise_role",
            type: "autocomplete",
            url: "/roles",
            getOptionLabel: 'name',
            getOptionValue: 'id',
            fullWidth: true,
            icon: "",
            validation: "required"
        },        
        {
            label: t('settings:distributor_commission'),
            name: "distributor_commission",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },        
        {
            label: t('settings:level_1_commission'),
            name: "level_1_commission",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },        
        {
            label: t('settings:level_2_commission'),
            name: "level_2_commission",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },        
        {
            label: t('settings:level_3_commission'),
            name: "level_3_commission",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },        
        {
            label: t('settings:level_4_commission'),
            name: "level_4_commission",
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
                <Form form={form} actionUrl={acitionUrl} id="update" submitTitle={submitTitle} />
            </FormLayout>
        </AdminLayout>
    )
}



export default Index
