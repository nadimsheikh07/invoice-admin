import React from "react";
import MaterialDataTable from "../../component/material-table";
import AdminLayout from "../../component/layout";
import { checkPermission } from "../../config/_helpers";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation(["inventories"]);
  const title = t("inventories:title");
  let columns = [];

  columns.push({
    title: t("inventories:item"),
    field: "item.name",
    render: (row) => {
      return <div>{row.item.name}</div>;
    },
  });

  columns.push({
    title: t("inventories:type"),
    field: "type",
  });

  columns.push({
    title: t("inventories:quantity"),
    field: "quantity",
  });

  columns.push({
    title: t("inventories:price"),
    field: "price",
  });

  columns.push({
    title: t("common:updated"),
    field: "updated_at",
  });

  let customFreeActions = [];

  customFreeActions.push({
    icon: 'sync',    
    tooltip: t("common:update_inventory"),
    url: 'inventories/update_inventory',    
    methos: 'get',    
  });

  return (
    <AdminLayout>
      <MaterialDataTable
        title={title}
        url="/inventories"
        columns={columns}
        selection={false}
        refresh={true}
        dateFilter={false}
        customFreeActions={customFreeActions}
        addData={checkPermission("inventories.store")}
        editData={checkPermission("inventories.update")}
        deleteData={checkPermission("inventories.destroy")}
      />
    </AdminLayout>
  );
};

export default Index;
