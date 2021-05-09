import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation(["common", "distributors"])
    const title = t('distributors:title')

    let columns = []
    
    columns.push({
        title: t('distributors:plan'),     
        field:'plan.name',   
        render: (row) =>{
            return(
                <div>{row.plan && row.plan.name}</div>
            )
        }
    })
    columns.push({
        title: t('distributors:name'),
        field: "name"
    })
    columns.push({
        title: t('distributors:email'),
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
                url='/distributors'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('distributors.store')}
                editData={checkPermission('distributors.update')}
                deleteData={checkPermission('distributors.destroy')}
                editPass={checkPermission('distributors.update')}
            />
        </AdminLayout>
    )
}



export default Index