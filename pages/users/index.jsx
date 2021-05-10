import React from "react";
import MaterialDataTable from "../../component/material-table";
import AdminLayout from "../../component/layout";
import { checkPermission } from "../../config/_helpers";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation([ "users"]);
  const title = t("users:title");

  let columns = [];

  columns.push({
    title: t("users:role"),
    field: "role.name",
    render: (row) => {
      return <div>{row.role.name}</div>;
    },
  });
  columns.push({
    title: t("users:name"),
    field: "name",
  });
  columns.push({
    title: t("users:email"),
    field: "email",
  });
  columns.push({
    title: t("updated"),
    field: "updated_at",
  });

  return (
    <AdminLayout>
      <MaterialDataTable
        title={title}
        url="/users"
        columns={columns}
        selection={false}
        refresh={true}
        dateFilter={false}
        addData={checkPermission("users.store")}
        editData={checkPermission("users.update")}
        deleteData={checkPermission("users.destroy")}
        editPass={checkPermission("users.update")}
      />
    </AdminLayout>
  );
};

export default Index;
