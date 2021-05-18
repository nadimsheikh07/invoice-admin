import React from "react";
import FormLayout from "../../../component/layout/formLayout";
import AdminLayout from "../../../component/layout";
import Detail from "../../../component/material-table/detail";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation(["sales"]);
  const formTitle = t("sales:view_title");  
  const router = useRouter();
  const { id } = router.query;
  const acitionUrl = "sales";
  const redirectUrl = "/sales";

  const columns = [
    {
      title: t("sales:company"),      
      field: "company_name",
    },
    {
      title: t("sales:customer"),
      field: "customer_name",      
      
    },
    {
      title: t("sales:total_tax"),
      field: "total_tax",      
    },
    {
      title: t("sales:total_discount"),
      field: "total_discount",      
    },    
    {
      title: t("sales:total"),
      field: "total",      
    },    
    {
      title: t("sales:comments"),
      field: "comments",      
    },    
    {
      title: t("sales:items"),
      field: "items",      
      type:'list',
      columns:[
        {
          title: t("sales:item"),      
          field: "item_name",
        },
        {
          title: t("sales:quantity"),      
          field: "quantity",
        },
        {
          title: t("sales:price"),      
          field: "price",
        },
      ]
    },    
  ];


  const actionButtons=[{
    text: "Print Pdf",
    action:()=>{
      alert('call pdf')
    },
  }]

  return (
    <AdminLayout>
      <FormLayout title={formTitle} goBack={redirectUrl} md={8} lg={8} xl={8}>
        <Detail
          url={acitionUrl}
          id={id}
          columns={columns}
          actionButtons={actionButtons}
        />
      </FormLayout>
    </AdminLayout>
  );
};

export default Index;
