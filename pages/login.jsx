import React, { useEffect, useState } from 'react';
import Form from '../component/formik';
import FormLayout from '../component/layout/formLayout';
import { useRouter } from 'next/router';
import { setToken, getToken, setPermission } from '../config/_helpers';
import Link from '../component/Link';
import { useTranslation } from 'react-i18next';

const Index = () => {
    const { t } = useTranslation(["common", "users"])
    const formTitle = t('login_form')
    const submitTitle = t('login')
    const [token] = useState(getToken())
    const router = useRouter()

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
        {
            label: t('password'),
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
                {t('forgot_password')}
            </Link>

        </FormLayout>
    )
}

export default Index