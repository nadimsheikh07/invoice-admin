import React from 'react'
import FormLayout from '../../../component/layout/formLayout'
import AdminLayout from '../../../component/layout'
import Form from '../../../component/formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const { t } = useTranslation(["common", "franchise_amounts"])
    const formTitle = t('franchise_amounts:form_title')
    const submitTitle = t('save')
    const router = useRouter()
    const { id } = router.query
    const acitionUrl = 'franchise_amounts'
    const redirectUrl = '/franchise_amounts'

    const form = [
        {
            label: t('franchise_amounts:franchise_code'),
            name: "franchise_code",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },
        {
            label: t('franchise_amounts:video_uploader'),
            name: "video_uploader",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },
        {
            label: t('franchise_amounts:total_video_upload'),
            name: "total_video_upload",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },
        {
            label: t('franchise_amounts:amount'),
            name: "amount",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },
        {
            label: t('franchise_amounts:date'),
            name: "date",
            type: "date",
            variant: 'inline',
            format: 'DD-MM-YYYY',
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
