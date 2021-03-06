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
    title: t("sales:company"),
    field: "company.name",
    render: (row) => {
      return <div>{row.company.name}</div>;
    },
  });

  columns.push({
    title: t("sales:total_tax"),
    field: "total_tax",
  });
  
  columns.push({
    title: t("sales:total_discount"),
    field: "total_discount",
  });

  columns.push({
    title: t("sales:total"),
    field: "total",
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
        viewData={checkPermission("sales.show")}
        addData={checkPermission("sales.store")}
        editData={checkPermission("sales.update")}
        deleteData={checkPermission("sales.destroy")}
      />
    </AdminLayout>
  );
};

export default Index;
