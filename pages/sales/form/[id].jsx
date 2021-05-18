import React from "react";
import FormLayout from "../../../component/layout/formLayout";
import AdminLayout from "../../../component/layout";
import Form from "../../../component/formik";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation(["sales"]);
  const formTitle = t("sales:form_title");
  const submitTitle = t("save");
  const router = useRouter();
  const { id } = router.query;
  const acitionUrl = "sales";
  const redirectUrl = "/sales";

  const form = [
    {
      label: t("sales:company"),
      name: "company_id",
      type: "autocomplete",
      url: "/companies",
      getOptionLabel: "name",
      getOptionValue: "id",
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("sales:customer"),
      name: "customer_id",
      type: "autocomplete",
      url: "/customers",
      getOptionLabel: "name",
      getOptionValue: "id",
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("sales:total_tax"),
      name: "total_tax",
      type: "text",
      multiline: true,
      required: false,
      fullWidth: true,
      icon: "",
      validation: "",
    },
    {
      label: t("sales:total_discount"),
      name: "total_discount",
      type: "text",
      multiline: true,
      required: false,
      fullWidth: true,
      icon: "",
      validation: "",
    },    
    {
      label: t("sales:comments"),
      name: "comments",
      type: "text",
      multiline: true,
      required: false,
      fullWidth: true,
      icon: "",
      validation: "",
    },
    {
      label: t("sales:items"),
      name: "items",
      type: "dynamic",
      options: [
        {
          label: t("sales:item"),
          name: "item_id",
          type: "autocomplete",
          url: "/items",
          getOptionLabel: "name",
          getOptionValue: "id",
          fullWidth: true,
          icon: "",
          validation: "required",
        },
        {
          label: t("sales:quantity"),
          name: "quantity",
          type: "text",
          multiline: true,
          required: false,
          fullWidth: true,
          icon: "",
          validation: "",
        },
        {
          label: t("sales:price"),
          name: "price",
          type: "text",
          multiline: true,
          required: false,
          fullWidth: true,
          icon: "",
          validation: "",
        },
      ],
    },
  ];

  return (
    <AdminLayout>
      <FormLayout title={formTitle} goBack={redirectUrl}>
        <Form
          form={form}
          redirect={redirectUrl}
          actionUrl={acitionUrl}
          id={id}
          submitTitle={submitTitle}
        />
      </FormLayout>
    </AdminLayout>
  );
};

export default Index;
