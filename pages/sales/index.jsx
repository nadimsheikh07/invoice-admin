import React from "react";
import MaterialDataTable from "../../component/material-table";
import AdminLayout from "../../component/layout";
import { checkPermission } from "../../config/_helpers";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation(["sales"]);
  const title = t("sales:title");
  let columns = [];

  columns.push({
    title: t("sales:customer"),
    field: "customer.name",
    render: (row) => {
      return <div>{row.customer.name}</div>;
    },
  });

  columns.push({
    title: t("common:updated"),
    field: "updated_at",
  });

  return (
    <AdminLayout>
      <MaterialDataTable
        title={title}
        url="/sales"
        columns={columns}
        selection={false}
        refresh={true}
        dateFilter={false}
        addData={checkPermission("sales.store")}
        editData={checkPermission("sales.update")}
        deleteData={checkPermission("sales.destroy")}
      />
    </AdminLayout>
  );
};

export default Index;
