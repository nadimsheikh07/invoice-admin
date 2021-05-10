import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation([ "permissions"])
    const title = t('permissions:title')
    let columns = []

    columns.push({
        title: t('permissions:name'),
        field: "name"
    })
    columns.push({
        title: t('permissions:code'),
        field: "code"
    })
    columns.push({
        title: t('updated'),
        field: "updated_at"
    })

    return (
        <AdminLayout>
            <MaterialDataTable
                title={title}
                url='/permissions'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('permissions.store')}
                editData={checkPermission('permissions.update')}
                deleteData={checkPermission('permissions.destroy')}
            />
        </AdminLayout>
    )
}



export default Index
