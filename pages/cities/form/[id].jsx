import React from 'react'
import FormLayout from '../../../component/layout/formLayout'
import AdminLayout from '../../../component/layout'
import Form from '../../../component/formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const { t } = useTranslation(["common", "cities"])
    const formTitle = t('cities:form_title')
    const submitTitle = t('save')
    const router = useRouter()
    const { id } = router.query
    const acitionUrl = 'cities'
    const redirectUrl = '/cities'
    
    const form = [
        {
            label: t('cities:state'),
            name: "state_id",
            type: "autocomplete",
            url: "/states",
            getOptionLabel: 'name',
            getOptionValue: 'id',
            fullWidth: true,
            icon: "",
            validation: "required"
        },
        {
            label: t('cities:name'),
            name: "name",
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
