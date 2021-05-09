import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'

const Index = () => {
    const { t } = useTranslation(["common", "states"])
    const title = t('states:title')
    let columns = []

    columns.push({
        title: t('states:country'),
        field:'country.name',        
        render: (row) =>{
            return(
                <div>{row.country.name}</div>
            )
        }
    })

    columns.push({
        title: t('states:name'),
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
                url='/states'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('states.store')}
                editData={checkPermission('states.update')}
                deleteData={checkPermission('states.destroy')}
            />
        </AdminLayout>
    )
}

export default Index
