import React, { useEffect, useState } from 'react';
import Form from '../component/formik';
import FormLayout from '../component/layout/formLayout';
import { useRouter } from 'next/router';
import { setToken, getToken, setPermission } from '../config/_helpers';
import Link from '../component/Link';
import { useTranslation } from 'react-i18next';

const Index = () => {
    const { t } = useTranslation("login")
    const formTitle = t('login:form_title')
    const submitTitle = t('login:submit_text')
    const [token] = useState(getToken())
    const router = useRouter()

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
            label: t('login:email'),
            name: "email",
            type: "email",
            required: true,
            fullWidth: true,
            icon: "mail",
            validation: "required|email"
        },
        {
            label: t('login:password'),
            name: "password",
            type: "password",
            required: true,
            fullWidth: true,
            icon: "lock",
            validation: "required"
        },
    ]

    return (
        <FormLayout title={formTitle} marginTop={200} margin={10}>
            <Form form={form} actionUrl="auth/signin" id="new" submitTitle={submitTitle} callBack={setTokenData} />
            
            <Link href="/forgot_password" variant="body2">
                {t('login:forgot_password')}
            </Link>

        </FormLayout>
    )
}

export default Index