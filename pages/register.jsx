import React, { useEffect } from 'react';
import Form from '../component/formik';
import FormLayout from '../component/layout/formLayout';
import { useRouter } from 'next/router';
import { getToken, setToken, setPermission } from '../config/_helpers';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const router = useRouter()
    const { t } = useTranslation("register")
    const formTitle = t('register:form_title')
    const submitTitle = t('register:submit_text')

    useEffect(() => {
        if (getToken) {
            router.push('/dashboard')
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
            label: t('register:name'),
            name: "name",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "lock",
            validation: "required"
        },
        {
            label: t('register:email'),
            name: "email",
            type: "email",
            required: true,
            fullWidth: true,
            icon: "mail",
            validation: "required|email"
        },
        {
            label: t('register:password'),
            name: "password",
            type: "password",
            required: true,
            fullWidth: true,
            icon: "lock",
            validation: "required"
        },
        {
            label: t('register:password_confirmation'),
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