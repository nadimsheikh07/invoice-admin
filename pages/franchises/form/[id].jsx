import React from 'react'
import FormLayout from '../../../component/layout/formLayout'
import AdminLayout from '../../../component/layout'
import Form from '../../../component/formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const { t } = useTranslation(["common", "franchises"])
    const formTitle = t('franchises:form_title')
    const submitTitle = t('save')
    const router = useRouter()
    const { id } = router.query
    const acitionUrl = 'franchises'
    const redirectUrl = '/franchises'    

    const form = []
    
    form.push({
        label: t('franchises:name'),
        name: "name",
        type: "text",
        required: true,
        fullWidth: true,
        icon: "person",
        validation: "required"
    })


    form.push({
        label: t('franchises:email'),
        name: "email",
        type: "email",
        required: true,
        fullWidth: true,
        icon: "mail",
        validation: "required|email"
    })

    form.push({
        label: t('franchises:password'),
        name: "password",
        type: "password",
        required: true,
        fullWidth: true,
        icon: "lock",
        validation: id == 'new' ? "required" : "",
        disabled: id != 'new' ? true : false
    })


    return (
        <AdminLayout>
            <FormLayout title={formTitle} goBack={redirectUrl}>
                <Form form={form} redirect={redirectUrl} actionUrl={acitionUrl} id={id} submitTitle={submitTitle} />
            </FormLayout>
        </AdminLayout>
    )
}


export default Index