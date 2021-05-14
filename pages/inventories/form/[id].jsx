import React from "react";
import FormLayout from "../../../component/layout/formLayout";
import AdminLayout from "../../../component/layout";
import Form from "../../../component/formik";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation(["inventories"]);
  const formTitle = t("inventories:form_title");
  const submitTitle = t("save");
  const router = useRouter();
  const { id } = router.query;
  const acitionUrl = "inventories";
  const redirectUrl = "/inventories";

  const form = [
    {
      label: t("inventories:item"),
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
      label: t("inventories:type"),
      name: "type",
      type: "selectbox",
      options: [
        {
          value: "in",
          label: "In",
        },
        {
          value: "out",
          label: "Out",
        },
      ],
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("inventories:quantity"),
      name: "quantity",
      type: "text",
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("inventories:price"),
      name: "price",
      type: "text",
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("inventories:detail"),
      name: "detail",
      type: "text",
      multiline: true,
      required: false,
      fullWidth: true,
      icon: "",
      validation: "",
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
