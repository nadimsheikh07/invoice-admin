import React from "react";
import Textbox from "./textbox";
import Autocomplete from "./autocomplete";
import SimpleReactValidator from "simple-react-validator";
import { useFormik } from "formik";
import {
  Card,
  CardContent,
  CardHeader,
  Icon,
  makeStyles,
  Table,
  TableRow,
  TableBody,
  TableCell,  
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
  cancel: {
    margin: theme.spacing(0, 2, 2),
  },
}));

const Index = (props) => {
  const { form, name, label, value } = props;
  const classes = useStyles();

  const addOption = () => {
    const value = formik.values[name];
    let formData = [];

    if (form) {
      form.forEach((element) => {
        formData[element.name] = "";
      });
    }

    value.push(Object.assign({}, formData));
    formik.setFieldValue([name], value);
  };

  const removeOption = (index) => {
    if (index > -1) {
      const value = formik.values[name];
      value.splice(index, 1);
      formik.setFieldValue([name], value);
    }
  };

  const simpleValidator = React.useRef(
    new SimpleReactValidator({
      element: (message) => message,
    })
  );

  const formik = useFormik({
    initialValues: {
      [name]: value,
    },
    validate: (values) => {
      const errors = {};
      // const { form } = props
      // if (form) {
      //     form.forEach(element => {
      //         const value = values[element.name] ? values[element.name] : ""
      //         const validation = element.validation ? element.validation : ""
      //         if (validation) {
      //             simpleValidator.current.showMessages()
      //             const fieldError = simpleValidator.current.message(element.name, value, validation)
      //             if (fieldError) {
      //                 errors[element.name] = fieldError
      //             }
      //         }
      //     });
      // }
      // simpleValidator.current.showMessages()
      return errors;
    },
    onSubmit: async (values) => {
      props.onChange(values[name]);
    },
  });

  React.useEffect(() => {
    formik.setValues({ [name]: value });
    formik.submitForm();
  }, [value]);

  return (
    <form className={classes.form} noValidate>
      <Card>
        <CardHeader
          titleTypographyProps={{ variant: "h6", align: "center" }}
          title={label}
          action={<Icon onClick={() => addOption()}>add_circle_outline</Icon>}
        />
        <CardContent>
          <Table>
            <TableBody>
              {formik.values &&
                formik.values[name] &&
                formik.values[name].map((option, index) => {
                  return (
                    <TableRow>
                      <TableCell>
                        {form &&
                          form.map((formData) => {
                            const value =
                              formik.values[name][index][formData.name];

                            switch (formData.type) {
                              case "autocomplete":
                                return (
                                  <Autocomplete
                                    required={formData.required}
                                    disabled={formData.disabled}
                                    fullWidth={formData.fullWidth}
                                    label={formData.label}
                                    url={formData.url}
                                    getOptionLabel={formData.getOptionLabel}
                                    getOptionValue={formData.getOptionValue}
                                    value={value}
                                    onChange={(e) => {
                                      let data = formik.values;
                                      data[name][index][formData.name] = e;
                                      formik.setValues(data);
                                      formik.handleSubmit();
                                    }}
                                  />
                                );

                              default:
                                return (
                                  <Textbox
                                    required={formData.required}
                                    multiline={formData.multiline}
                                    disabled={formData.disabled}
                                    fullWidth={formData.fullWidth}
                                    label={formData.label}
                                    type={formData.type}
                                    icon={formData.icon}
                                    value={value || ""}
                                    onChange={(e) => {
                                      let data = formik.values;
                                      data[name][index][formData.name] =
                                        e.target.value;
                                      formik.setValues(data);
                                      formik.handleSubmit();
                                    }}
                                  />
                                );
                            }
                          })}
                      </TableCell>

                      <TableCell>
                        <Icon onClick={() => removeOption(index)}>
                          remove_circle_outline
                        </Icon>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </form>
  );
};

export default Index;
