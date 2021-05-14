import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation([ "companies"])
    const title = t('companies:title')
    let columns = []

    columns.push({
        title: t('companies:name'),
        field: "name"
    })
    
    columns.push({
        title: t('companies:contact'),
        field: "contact"
    })
    columns.push({
        title: t('companies:email'),
        field: "email"
    })
     
    columns.push({
        title: t('common:updated'),
        field: "updated_at"
    })

    return (
        <AdminLayout>
            <MaterialDataTable
                title={title}
                url='/companies'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('companies.store')}
                editData={checkPermission('companies.update')}
                deleteData={checkPermission('companies.destroy')}
            />
        </AdminLayout>
    )
}



export default Index
