import React from 'react'
import FormLayout from '../../../component/layout/formLayout'
import AdminLayout from '../../../component/layout'
import Form from '../../../component/formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const { t } = useTranslation([ "items"])
    const formTitle = t('items:form_title')
    const submitTitle = t('save')
    const router = useRouter()
    const { id } = router.query
    const acitionUrl = 'items'
    const redirectUrl = '/items'
    
    const form = [
        {
            label: t('items:category'),
            name: "category_id",
            type: "autocomplete",
            url: "/categories",
            getOptionLabel: 'name',
            getOptionValue: 'id',
            fullWidth: true,
            icon: "",
            validation: "required"
        },
        {
            label: t('items:name'),
            name: "name",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },            
        {
            label: t('items:price'),
            name: "price",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },            
        {
            label: t('items:track_inventory'),
            name: "track_inventory",
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
