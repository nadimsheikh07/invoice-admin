import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation(["common", "commissions"])
    const title = t('commissions:title')
    let columns = []


    columns.push({
        title: t('commissions:commission'),
        field: "commission"
    })
    columns.push({
        title: t('commissions:amount'),
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
                url='/commissions'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={true}
                addData={false}
                editData={false}
                deleteData={false}
            />
        </AdminLayout>
    )
}



export default Index
