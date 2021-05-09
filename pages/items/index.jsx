import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation(["translation", "items"])
    const title = t('items:title')
    let columns = []

    columns.push({
        title: t('items:category'),        
        field:'category.name',
        render: (row) =>{
            return(
                <div>{row.category.name}</div>
            )
        }
    })

    columns.push({
        title: t('items:name'),
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
                url='/items'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('items.store')}
                editData={checkPermission('items.update')}
                deleteData={checkPermission('items.destroy')}
            />
        </AdminLayout>
    )
}



export default Index
