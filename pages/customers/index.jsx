import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation([ "customers"])
    const title = t('customers:title')
    let columns = []

    columns.push({
        title: t('customers:name'),
        field: "name"
    })
    
    columns.push({
        title: t('customers:email'),
        field: "email"
    })

    columns.push({
        title: t('customers:contact'),
        field: "contact"
    })
     
    columns.push({
        title: t('common:updated'),
        field: "updated_at"
    })

    return (
        <AdminLayout>
            <MaterialDataTable
                title={title}
                url='/customers'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('customers.store')}
                editData={checkPermission('customers.update')}
                deleteData={checkPermission('customers.destroy')}
            />
        </AdminLayout>
    )
}



export default Index
