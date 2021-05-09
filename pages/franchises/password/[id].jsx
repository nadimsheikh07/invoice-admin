import React from 'react'
import FormLayout from '../../../component/layout/formLayout'
import AdminLayout from '../../../component/layout'
import Form from '../../../component/formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const { t } = useTranslation(["common", "franchises"])
    const formTitle = t('franchises:update_password')
    const submitTitle = t('franchises:update_password')    
    const router = useRouter()
    const { id } = router.query
    const acitionUrl = 'auth/update_password'

    const form = [
        {
            label: t('franchises:password'),
            name: "password",
            type: "password",
            required: true,
            fullWidth: true,
            icon: "lock",
            validation: "required"
        },
        {
            label: t('franchises:password_confirmation'),
            name: "password_confirmation",
            type: "password",
            required: true,
            fullWidth: true,
            icon: "lock",
            validation: "required"
        }
    ]

    return (
        <AdminLayout>

        <FormLayout title={formTitle} goBack="/franchises">
            <Form form={form} actionUrl={acitionUrl} id={id} submitTitle={submitTitle} redirect="/franchises" />
        </FormLayout>
        </AdminLayout>
    )
}

export default Index