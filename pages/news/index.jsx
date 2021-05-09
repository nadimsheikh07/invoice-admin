import React from 'react'
import MaterialDataTable from '../../component/material-table'
import AdminLayout from '../../component/layout'
import { checkPermission } from '../../config/_helpers'
import { useTranslation } from 'react-i18next'


const Index = () => {
    const { t } = useTranslation(["common", "news"])
    const title = t('news:title')

    let columns = []

    columns.push({
        title: t('news:title_text'),
        field: "title"
    })
    columns.push({
        title: t('news:image'),
        field: "image"
    })
    columns.push({
        title: t('updated'),
        field: "updated_at"
    })

    return (
        <AdminLayout>
            <MaterialDataTable
                title={title}
                url='/news'
                columns={columns}
                selection={false}
                refresh={true}
                dateFilter={false}
                addData={checkPermission('news.store')}
                editData={checkPermission('news.update')}
                deleteData={checkPermission('news.destroy')}
            />
        </AdminLayout>
    )
}



export default Index