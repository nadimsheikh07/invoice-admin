import React from "react";
import FormLayout from "../../../component/layout/formLayout";
import AdminLayout from "../../../component/layout";
import Form from "../../../component/formik";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation(["companies"]);
  const formTitle = t("companies:form_title");
  const submitTitle = t("save");
  const router = useRouter();
  const { id } = router.query;
  const acitionUrl = "companies";
  const redirectUrl = "/companies";

  const form = [
    {
      label: t("companies:name"),
      name: "name",
      type: "text",
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("companies:contact"),
      name: "contact",
      type: "text",
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("companies:email"),
      name: "email",
      type: "text",
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("companies:pancard"),
      name: "pancard",
      type: "text",
      required: false,
      fullWidth: true,
      icon: "",
      validation: "",
    },
    {
      label: t("companies:gstin"),
      name: "gstin",
      type: "text",
      required: false,
      fullWidth: true,
      icon: "",
      validation: "",
    },
    {
      label: t("companies:address"),
      name: "address",
      type: "text",
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("companies:bank_name"),
      name: "bank_name",
      type: "text",
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("companies:account_number"),
      name: "account_number",
      type: "text",
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("companies:account_type"),
      name: "account_type",
      type: "text",
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("companies:swift_code"),
      name: "swift_code",
      type: "text",
      required: false,
      fullWidth: true,
      icon: "",
      validation: "",
    },
    {
      label: t("companies:ifsc_code"),
      name: "ifsc_code",
      type: "text",
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("companies:bank_address"),
      name: "bank_address",
      type: "text",
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
    },
    {
      label: t("companies:sign_image"),
      name: "sign_image",
      type: "file",
      url: "upload/image",
      inputAdornmentPosition: "end",
      required: true,
      fullWidth: true,
      icon: "upload",
      accept: "image/*",
      validation: "required",
    },
    {
      label: t("companies:status"),
      name: "status",
      type: "checkbox",
      required: true,
      fullWidth: true,
      icon: "",
      validation: "required",
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
