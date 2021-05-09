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
    const { t } = useTranslation(["translation", "users"])
    const formTitle = t('forgot_password_form')
    const submitTitle = t('send')

    useEffect(() => {
        if (token) {
            router.push('/admin')
        }
    }, [token])

    const setTokenData = (data) => {
        if (data.accessToken) {
            setToken(data.accessToken)
            setPermission(data.permissions)
            location.replace('/admin')
        }
    }

    const form = [
        {
            label: t('email'),
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
                {t('back_to_login')}
            </Link>
        </FormLayout>
    )
}

export default Index