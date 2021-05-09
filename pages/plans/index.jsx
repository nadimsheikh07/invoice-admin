import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation(["common", "plans"])
    const title = t('plans:title')
    let columns = []


    columns.push({
        title: t('plans:name'),
        field: "name"
    })
    columns.push({
        title: t('plans:duration'),
        field: "duration"
    })
    columns.push({
        title: t('plans:amount'),
        field: "amount"
    })    
    columns.push({
        title: t('common:updated'),
        field: "updated_at"
    })

    return (
        <AdminLayout>
            <MaterialDataTable
                title={title}
                url='/plans'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('plans.store')}
                editData={checkPermission('plans.update')}
                deleteData={checkPermission('plans.destroy')}
            />
        </AdminLayout>
    )
}



export default Index
