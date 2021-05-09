import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation(["common", "promotors"])
    const title = t('promotors:title')

    let columns = []
        
    columns.push({
        title: t('promotors:name'),
        field: "name"
    })
    columns.push({
        title: t('promotors:email'),
        field: "email"
    })
    columns.push({
        title: t('updated'),
        field: "updated_at"
    })

    return (
        <AdminLayout>
            <MaterialDataTable
                title={title}
                url='/promotors'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('promotors.store')}
                editData={checkPermission('promotors.update')}
                deleteData={checkPermission('promotors.destroy')}
                editPass={checkPermission('promotors.update')}
            />
        </AdminLayout>
    )
}



export default Index