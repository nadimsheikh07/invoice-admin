import React, { useEffect } from 'react';
import Form from '../component/formik';
import FormLayout from '../component/layout/formLayout';
import { useRouter } from 'next/router';
import { getToken, setToken, setPermission } from '../config/_helpers';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const router = useRouter()
    const { t } = useTranslation(["common", "users"])
    const formTitle = t('register_form')
    const submitTitle = t('register')

    useEffect(() => {
        if (getToken) {
            router.push('/admin')
        }
    }, [])

    const setTokenData = (data) => {
        if (data.accessToken) {
            setToken(data.accessToken)
            setPermission(data.permissions)
        }
    }
    const form = [
        {
            label: t('name'),
            name: "name",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "lock",
            validation: "required"
        },
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
        {
            label: t('password_confirmation'),
            name: "password_confirmation",
            type: "password",
            required: true,
            fullWidth: true,
            icon: "lock",
            validation: "required"
        },
    ]
    return (
        <FormLayout title={formTitle} marginTop={200} margin={10}>
            <Form form={form} actionUrl="auth/signup" id="new" submitTitle={submitTitle} redirect="/login" callBack={setTokenData} />
        </FormLayout>
    )
}



export default Index