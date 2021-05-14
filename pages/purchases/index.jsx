import React from "react";
import MaterialDataTable from "../../component/material-table";
import AdminLayout from "../../component/layout";
import { checkPermission } from "../../config/_helpers";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation(["purchases"]);
  const title = t("purchases:title");
  let columns = [];

  columns.push({
    title: t("purchases:customer"),
    field: "customer.name",
    render: (row) => {
      return <div>{row.customer.name}</div>;
    },
  });
  
  columns.push({
    title: t("purchases:company"),
    field: "company.name",
    render: (row) => {
      return <div>{row.company.name}</div>;
    },
  });

  columns.push({
    title: t("purchases:total_tax"),
    field: "total_tax",
  });
  
  columns.push({
    title: t("purchases:total_discount"),
    field: "total_discount",
  });

  columns.push({
    title: t("purchases:total"),
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
        url="/purchases"
        columns={columns}
        selection={false}
        refresh={true}
        dateFilter={false}
        addData={checkPermission("purchases.store")}
        editData={checkPermission("purchases.update")}
        deleteData={checkPermission("purchases.destroy")}
      />
    </AdminLayout>
  );
};

export default Index;
