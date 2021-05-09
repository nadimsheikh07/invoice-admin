import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation(["translation", "categories"])
    const title = t('categories:title')
    let columns = []

    columns.push({
        title: t('categories:name'),
        field: "name"
    })
     
    columns.push({
        title: t('common:updated'),
        field: "updated_at"
    })

    return (
        <AdminLayout>
            <MaterialDataTable
                title={title}
                url='/categories'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('categories.store')}
                editData={checkPermission('categories.update')}
                deleteData={checkPermission('categories.destroy')}
            />
        </AdminLayout>
    )
}



export default Index
