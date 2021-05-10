import React, { useEffect, useState } from 'react';
import FormLayout from '../component/layout/formLayout';
import { useRouter } from 'next/router';
import FullPageLoader from '../component/fullPageLoader';
import { getToken } from '../config/_helpers';
import { configConstants } from '../config/_constants';
const Index = () => {
    const [token] = useState(getToken())
    const router = useRouter()

    useEffect(() => {
        if (token) {            
            router.push(`/dashboard`)
        } else {
            router.push(`/login`)
        }
    }, [])

    return (
        <FormLayout title={configConstants.APP_NAME} marginTop={200} margin={10}>
            <FullPageLoader text="Loading..." />
        </FormLayout>
    )
}

export default Index