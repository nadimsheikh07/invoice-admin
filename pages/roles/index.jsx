import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation([ "roles"])
    const title = t('roles:title')

    let columns = []

    columns.push({
        title: t('roles:name'),
        field: "name"
    })
    columns.push({
        title: t('updated'),
        field: "updated_at"
    })

    return (
        <AdminLayout>
            <MaterialDataTable
                title={title}
                url='/roles'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('roles.store')}
                editData={checkPermission('roles.update')}
                deleteData={checkPermission('roles.destroy')}
            />
        </AdminLayout>
    )
}



export default Index
