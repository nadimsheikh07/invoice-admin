import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation(["common", "cities"])
    const title = t('cities:title')
    let columns = []

    columns.push({
        title: t('cities:state'),        
        field:'state.name',
        render: (row) =>{
            return(
                <div>{row.state.name}</div>
            )
        }
    })

    columns.push({
        title: t('cities:name'),
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
                url='/cities'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('cities.store')}
                editData={checkPermission('cities.update')}
                deleteData={checkPermission('cities.destroy')}
            />
        </AdminLayout>
    )
}



export default Index
