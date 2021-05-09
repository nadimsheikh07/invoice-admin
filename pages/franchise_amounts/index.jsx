import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation(["common", "franchise_amounts"])
    const title = t('franchise_amounts:title')
    let columns = []


    columns.push({
        title: t('franchise_amounts:franchise_code'),
        field: "franchise_code"
    })
    columns.push({
        title: t('franchise_amounts:video_uploader'),
        field: "video_uploader"
    })
    columns.push({
        title: t('franchise_amounts:total_video_upload'),
        field: "total_video_upload"
    })
    columns.push({
        title: t('franchise_amounts:amount'),
        field: "amount"
    })    
    columns.push({
        title: t('franchise_amounts:date'),
        field: "date"
    })    
    columns.push({
        title: t('common:updated'),
        field: "updated_at"
    })

    return (
        <AdminLayout>
            <MaterialDataTable
                title={title}
                url='/franchise_amounts'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                exportExcel={true}
                importData={true}
                addData={checkPermission('franchise_amounts.store')}
                editData={checkPermission('franchise_amounts.update')}
                deleteData={checkPermission('franchise_amounts.destroy')}
            />
        </AdminLayout>
    )
}



export default Index
