import React from 'react';
import FormLayout from '../component/layout/formLayout';
import AdminLayout from '../component/layout'
const Index = () => {
    const formTitle = "Permission Error"
    return (
        <AdminLayout>
            <FormLayout title={formTitle} marginTop={200} margin={10}>
                <p style={{ textAlign: 'center' }}>You dont have permission to access this page</p>
            </FormLayout>
        </AdminLayout>
    )
}

export default Index