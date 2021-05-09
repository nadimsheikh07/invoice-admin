import React from 'react'
import FormLayout from '../../../component/layout/formLayout'
import AdminLayout from '../../../component/layout'
import Form from '../../../component/formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


const Index = () => {
    const { t } = useTranslation(["common", "distributors"])
    const formTitle = t('distributors:form_title')
    const submitTitle = t('save')
    const router = useRouter()
    const { id } = router.query
    const acitionUrl = 'distributors'
    const redirectUrl = '/distributors'

    const form = []

    form.push({
        label: t('distributors:plan'),
        name: "plan_id",
        type: "autocomplete",
        url: "/plans",
        getOptionLabel: 'name',
        getOptionValue: 'id',
        fullWidth: true,
        icon: "",
        validation: "required"
    })

    form.push({
        label: t('distributors:country'),
        name: "country_id",
        type: "autocomplete",
        url: "/countries",
        getOptionLabel: 'name',
        getOptionValue: 'id',
        fullWidth: true,
        icon: "",
        validation: "required"
    })

    form.push({
        label: t('distributors:state'),
        name: "state_id",
        type: "autocomplete",
        url: "/states",
        getOptionLabel: 'name',
        getOptionValue: 'id',
        where: [{
            name: 'country_id',
            withField: true,
            value: ''
        }],
        fullWidth: true,
        icon: "",
        validation: "required"
    })

    form.push({
        label: t('distributors:city'),
        name: "city_id",
        type: "autocomplete",
        url: "/cities",
        getOptionLabel: 'name',
        getOptionValue: 'id',
        where: [{
            name: 'state_id',
            withField: true,
            value: ''
        }],
        fullWidth: true,
        icon: "",
        validation: "required"
    })

    form.push({
        label: t('distributors:name'),
        name: "name",
        type: "text",
        required: true,
        fullWidth: true,
        icon: "person",
        validation: "required"
    })


    form.push({
        label: t('distributors:email'),
        name: "email",
        type: "email",
        required: true,
        fullWidth: true,
        icon: "mail",
        validation: "required|email"
    })

    form.push({
        label: t('distributors:password'),
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