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
      label: t("sales:customer"),
      name: "customer_id",
      type: "autocomplete",
      url: "/items",
      getOptionLabel: "name",
      getOptionValue: "id",
      fullWidth: true,
      icon: "",
      validation: "required",
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
