import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation(["common", "countries"])
    const title = t('countries:title')
    let columns = []


    columns.push({
        title: t('countries:name'),
        field: "name"
    })
    columns.push({
        title: t('countries:code'),
        field: "code"
    })
    columns.push({
        title: t('countries:phonecode'),
        field: "phonecode"
    })    
    columns.push({
        title: t('common:updated'),
        field: "updated_at"
    })

    return (
        <AdminLayout>
            <MaterialDataTable
                title={title}
                url='/countries'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('countries.store')}
                editData={checkPermission('countries.update')}
                deleteData={checkPermission('countries.destroy')}
            />
        </AdminLayout>
    )
}



export default Index
