import React, { useEffect, useState } from 'react';
import Form from '../component/formik';
import FormLayout from '../component/layout/formLayout';
import { useRouter } from 'next/router';
import { setToken, getToken, setPermission } from '../config/_helpers';
import Link from '../component/Link';
import { useTranslation } from 'react-i18next';

const Index = () => {
    const [token] = useState(getToken())
    const router = useRouter()
    const { t } = useTranslation("forgot_password")
    const formTitle = t('forgot_password:form_title')
    const submitTitle = t('forgot_password:submit_text')

    useEffect(() => {
        if (token) {
            router.push('/dashboard')
        }
    }, [token])

    const setTokenData = (data) => {
        if (data.accessToken) {
            setToken(data.accessToken)
            setPermission(data.permissions)
            location.replace('/dashboard')
        }
    }

    const form = [
        {
            label: t('forgot_password:email'),
            name: "email",
            type: "email",
            required: true,
            fullWidth: true,
            icon: "mail",
            validation: "required|email"
        },        
    ]

    return (
        <FormLayout title={formTitle} marginTop={200} margin={10}>
            <Form form={form} actionUrl="auth/forgot_password" id="new" submitTitle={submitTitle} callBack={setTokenData} />            
            <Link href="/login" variant="body2">
                {t('forgot_password:back_to_login')}
            </Link>
        </FormLayout>
    )
}

export default Index