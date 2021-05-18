import React from "react";
import FormLayout from "../../../component/layout/formLayout";
import AdminLayout from "../../../component/layout";
import Detail from "../../../component/material-table/detail";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation(["purchases"]);
  const formTitle = t("purchases:view_title");  
  const router = useRouter();
  const { id } = router.query;
  const acitionUrl = "purchases";
  const redirectUrl = "/purchases";

  const columns = [
    {
      title: t("purchases:company"),      
      field: "company_name",
    },
    {
      title: t("purchases:customer"),
      field: "customer_name",      
      
    },
    {
      title: t("purchases:total_tax"),
      field: "total_tax",      
    },
    {
      title: t("purchases:total_discount"),
      field: "total_discount",      
    },    
    {
      title: t("purchases:total"),
      field: "total",      
    },    
    {
      title: t("purchases:comments"),
      field: "comments",      
    },    
    {
      title: t("purchases:items"),
      field: "items",      
      type:'list',
      columns:[
        {
          title: t("purchases:item"),      
          field: "item_name",
        },
        {
          title: t("purchases:quantity"),      
          field: "quantity",
        },
        {
          title: t("purchases:price"),      
          field: "price",
        },
      ]
    },    
  ];

  return (
    <AdminLayout>
      <FormLayout title={formTitle} goBack={redirectUrl} md={8} lg={8} xl={8}>
        <Detail
          url={acitionUrl}
          id={id}
          columns={columns}
        />
      </FormLayout>
    </AdminLayout>
  );
};

export default Index;
