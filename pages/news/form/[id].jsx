import React from 'react'
import FormLayout from '../../../component/layout/formLayout'
import AdminLayout from '../../../component/layout'
import Form from '../../../component/formik';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter()
    const { id } = router.query
    const acitionUrl = 'news'
    const redirectUrl = '/news'
    const formTitle = 'News Form'
    const submitTitle = 'Save'

    const form = [
        {
            label: "Title",
            name: "title",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: "required"
        },        
        {
            label: "Details",
            name: "details",
            type: "text",
            multiline: true,
            required: true,
            fullWidth: true,
            icon: "",
            validation: ""
        },
        {
            label: "Image",
            name: "image",
            type: "file",
            required: true,
            fullWidth: true,
            icon: "upload",
            url: "/upload/image",
            accept: "image/*",
            validation: ""
        },
        {
            label: "Link",
            name: "link",
            type: "text",
            required: true,
            fullWidth: true,
            icon: "",
            validation: ""
        },              
    ]

    return (
        <AdminLayout>
            <FormLayout title={formTitle} goBack={redirectUrl} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form form={form} redirect={redirectUrl} actionUrl={acitionUrl} id={id} submitTitle={submitTitle} />
            </FormLayout>
        </AdminLayout>
    )
}

export default Index