import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation(["common", "franchises"])
    const title = t('franchises:title')

    let columns = []
        
    columns.push({
        title: t('franchises:name'),
        field: "name"
    })
    columns.push({
        title: t('franchises:email'),
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
                url='/franchises'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('franchises.store')}
                editData={checkPermission('franchises.update')}
                deleteData={checkPermission('franchises.destroy')}
                editPass={checkPermission('franchises.update')}
            />
        </AdminLayout>
    )
}



export default Index