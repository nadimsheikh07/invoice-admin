import React from "react";
import FormLayout from "../../../component/layout/formLayout";
import AdminLayout from "../../../component/layout";
import Form from "../../../component/formik";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation(["common", "users"])
  const formTitle = t("users:form_title");
  const submitTitle = t("save");
  const router = useRouter();
  const { id } = router.query;
  const acitionUrl = "users";
  const redirectUrl = "/users";

  const form = [];

  form.push({
    label: t("users:role"),
    name: "role_id",
    type: "autocomplete",
    url: "/roles",
    getOptionLabel: "name",
    getOptionValue: "id",
    fullWidth: true,
    icon: "",
    validation: "required",
  });

  form.push({
    label: t("users:name"),
    name: "name",
    type: "text",
    required: true,
    fullWidth: true,
    icon: "person",
    validation: "required",
  });

  form.push({
    label: t("users:email"),
    name: "email",
    type: "email",
    required: true,
    fullWidth: true,
    icon: "mail",
    validation: "required|email",
  });

  form.push({
    label: t("users:password"),
    name: "password",
    type: "password",
    required: true,
    fullWidth: true,
    icon: "lock",
    validation: id == "new" ? "required" : "",
    disabled: id != "new" ? true : false,
  });

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
