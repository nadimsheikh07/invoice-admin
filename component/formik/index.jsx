import React, { useRef, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { makeStyles } from '@material-ui/core/styles';

import Textbox from './textbox';
import Passbox from './password';
import Autocomplete from './autocomplete';
import Checkbox from './checkbox';
import HtmlEditor from './htmlEditor';
import DateBox from './date';
import DateTimeBox from './datetime';
import TimeBox from './time';
import FileBox from './file';
import MultiCheckbox from './multiCheckbox';
import MultiGroupCheckbox from './groupCheckBox';
import DividerSection from './devider';
import RenderDynamicField from './renderDynamicField';
import SelectBox from './select';

import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { apiConfig } from '../../config/api';
import { useRouter } from 'next/router'
import { useLoader } from '../loader';
import { useSnackbar } from "../snackbar"

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
    cancel: {
        margin: theme.spacing(0, 2, 2),
    },
}));

const Index = (props) => {
    const router = useRouter()
    const snackbar = useSnackbar()
    const loader = useLoader()
    const classes = useStyles();
    const { form, id, actionUrl, submitTitle, redirect, callBack } = props

    const simpleValidator = useRef(new SimpleReactValidator({
        element: message => message,
    }))

    const initialValues = {}
    if (form) {
        form.forEach(element => {
            initialValues[element.name] = ""
        });
    }


    const formik = useFormik({
        initialValues: initialValues,
        validate: (values) => {
            const errors = {};
            const { form } = props

            if (form) {
                form.forEach(element => {
                    const value = values[element.name] ? values[element.name] : ""
                    const validation = element.validation ? element.validation : ""
                    if (validation) {
                        simpleValidator.current.showMessages()
                        const fieldError = simpleValidator.current.message(element.name, value, validation)
                        if (fieldError) {
                            errors[element.name] = fieldError
                        }
                    }
                });
            }
            simpleValidator.current.showMessages()
            return errors;
        },
        onSubmit: async (values, { setErrors }) => {
            let url, method

            if (id == 'new') {
                method = 'post'
                url = actionUrl
            } else {
                method = 'put'
                url = `${actionUrl}/${id}`
            }

            loader({ open: true })

            let data = {}

            if (values) {
                for (let [key, value] of Object.entries(values)) {
                    if (typeof value == 'object') {
                        data[key] = JSON.stringify(value)
                    } else {
                        data[key] = value
                    }
                }
            }

            await apiConfig.request({
                method: method,
                url: url,
                data: data
            }).then((response) => {
                if (response.status == 200) {
                    if (response.data.message) {
                        snackbar({
                            message: response.data.message,
                            severity: 'success'
                        })
                    }
                    loader({ open: false })
                    if (callBack) {
                        callBack(response.data)
                    }
                    if (redirect) {
                        router.push(redirect)
                    }
                }
            }).catch((error) => {
                const { response } = error
                loader({ open: false })
                if (response.data.message) {
                    snackbar({
                        message: response.data.message,
                        severity: 'error'
                    })
                }

                if (form) {
                    form.forEach(element => {
                        if (response.data.errors[element.name]) {
                            setErrors({ [element.name]: response.data.errors[element.name][0] })
                        }
                    });
                }
            })
        },
    });

    const getData = async (id) => {
        loader({ open: true })
        await apiConfig.get(`${actionUrl}/${id}`).then((response) => {
            if (response.status === 200) {
                loader({ open: false })
                const { data } = response
                if (form) {
                    form.forEach(element => {
                        formik.setFieldValue(element.name, data[element.name])
                    });
                }
            }
        }).catch((error) => {
            const { response } = error
            loader({ open: false })
            if (response.data.message) {
                snackbar({
                    message: response.data.message,
                    severity: 'error'
                })
            }
        })
    }

    useEffect(() => {
        if (id && id !== 'new') {
            getData(id)
        }
    }, [id])



    return (
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>

            {form && form.map(formData => {
                
                // add where condition for form
                let formWhere = []
                if (formData.where && formData.where.length) {
                    formData.where.forEach(where => {
                        if (where.withField) {
                            formWhere.push({
                                name: where.name,
                                value: formik.values[where.name],
                            })
                        } else {
                            formWhere.push({
                                name: where.name,
                                value: where.value,
                            })
                        }
                    });
                }

                switch (formData.type) {
                    case 'autocomplete':
                        return (
                            <Autocomplete
                                required={formData.required}
                                disabled={formData.disabled}
                                fullWidth={formData.fullWidth}
                                name={formData.name}
                                label={formData.label}
                                url={formData.url}
                                getOptionLabel={formData.getOptionLabel}
                                getOptionValue={formData.getOptionValue}
                                formWhere={formWhere}
                                value={formik.values[formData.name]}
                                onChange={(e) => formik.setFieldValue(formData.name, e)}
                                error={formik.touched[formData.name] && Boolean(formik.errors[formData.name])}
                                helperText={formik.touched[formData.name] && formik.errors[formData.name]}
                            />
                        )
                    case 'multicheckbox':
                        return (
                            <MultiCheckbox
                                required={formData.required}
                                disabled={formData.disabled}
                                fullWidth={formData.fullWidth}
                                name={formData.name}
                                label={formData.label}
                                url={formData.url}
                                getOptionLabel={formData.getOptionLabel}
                                getOptionValue={formData.getOptionValue}
                                value={formik.values[formData.name]}
                                onChange={(e) => formik.setFieldValue(formData.name, e)}
                                error={formik.touched[formData.name] && Boolean(formik.errors[formData.name])}
                                helperText={formik.touched[formData.name] && formik.errors[formData.name]}
                            />
                        )
                    case 'multigroupcheckbox':
                        return (
                            <MultiGroupCheckbox
                                required={formData.required}
                                disabled={formData.disabled}
                                fullWidth={formData.fullWidth}
                                name={formData.name}
                                label={formData.label}
                                url={formData.url}
                                getOptionLabel={formData.getOptionLabel}
                                getOptionValue={formData.getOptionValue}
                                getChildOptionLabel={formData.getChildOptionLabel}
                                getChildOptionValue={formData.getChildOptionValue}
                                value={formik.values[formData.name]}
                                onChange={(e) => formik.setFieldValue(formData.name, e)}
                                error={formik.touched[formData.name] && Boolean(formik.errors[formData.name])}
                                helperText={formik.touched[formData.name] && formik.errors[formData.name]}
                            />
                        )

                    case 'password':
                        return (
                            <Passbox
                                required={formData.required}
                                disabled={formData.disabled}
                                fullWidth={formData.fullWidth}
                                name={formData.name}
                                label={formData.label}
                                value={formik.values[formData.name]}
                                onChange={formik.handleChange}
                                error={formik.touched[formData.name] && Boolean(formik.errors[formData.name])}
                                helperText={formik.touched[formData.name] && formik.errors[formData.name]}
                            />
                        )
                    case 'html':
                        return (
                            <HtmlEditor
                                required={formData.required}
                                disabled={formData.disabled}
                                fullWidth={formData.fullWidth}
                                name={formData.name}
                                label={formData.label}
                                value={formik.values[formData.name]}
                                onChange={(e) => formik.setFieldValue(formData.name, e)}
                                error={formik.touched[formData.name] && Boolean(formik.errors[formData.name])}
                                helperText={formik.touched[formData.name] && formik.errors[formData.name]}
                            />
                        )

                    case 'checkbox':
                        return (
                            <Checkbox
                                required={formData.required}
                                disabled={formData.disabled}
                                fullWidth={formData.fullWidth}
                                name={formData.name}
                                label={formData.label}
                                value={formik.values[formData.name]}
                                onChange={formik.handleChange}
                                error={formik.touched[formData.name] && Boolean(formik.errors[formData.name])}
                                helperText={formik.touched[formData.name] && formik.errors[formData.name]}
                            />
                        )
                    case 'selectbox':
                        return (
                            <SelectBox
                                required={formData.required}
                                disabled={formData.disabled}
                                fullWidth={formData.fullWidth}
                                name={formData.name}
                                label={formData.label}
                                options={formData.options}
                                value={formik.values[formData.name]}
                                onChange={formik.handleChange}
                                error={formik.touched[formData.name] && Boolean(formik.errors[formData.name])}
                                helperText={formik.touched[formData.name] && formik.errors[formData.name]}
                            />
                        )
                    case 'date':
                        return (
                            <DateBox
                                required={formData.required}
                                disabled={formData.disabled}
                                fullWidth={formData.fullWidth}
                                disablePast={formData.disablePast}
                                minDate={formData.minDate}
                                variant={formData.variant}
                                format={formData.format}
                                name={formData.name}
                                label={formData.label}
                                value={formik.values[formData.name]}
                                onChange={(e) => formik.setFieldValue(formData.name, e)}
                                error={formik.touched[formData.name] && Boolean(formik.errors[formData.name])}
                                helperText={formik.touched[formData.name] && formik.errors[formData.name]}
                            />
                        )
                    case 'datetime':
                        return (
                            <DateTimeBox
                                required={formData.required}
                                disabled={formData.disabled}
                                fullWidth={formData.fullWidth}
                                disablePast={formData.disablePast}
                                minDate={formData.minDate}
                                variant={formData.variant}
                                format={formData.format}
                                name={formData.name}
                                label={formData.label}
                                value={formik.values[formData.name]}
                                onChange={(e) => formik.setFieldValue(formData.name, e)}
                                error={formik.touched[formData.name] && Boolean(formik.errors[formData.name])}
                                helperText={formik.touched[formData.name] && formik.errors[formData.name]}
                            />
                        )
                    case 'time':
                        return (
                            <TimeBox
                                required={formData.required}
                                disabled={formData.disabled}
                                fullWidth={formData.fullWidth}
                                variant={formData.variant}
                                format={formData.format}
                                name={formData.name}
                                label={formData.label}
                                value={formik.values[formData.name]}
                                onChange={(e) => formik.setFieldValue(formData.name, e)}
                                error={formik.touched[formData.name] && Boolean(formik.errors[formData.name])}
                                helperText={formik.touched[formData.name] && formik.errors[formData.name]}
                            />
                        )
                    case 'file':
                        return (
                            <FileBox
                                fullWidth={formData.fullWidth}
                                required={formData.required}
                                disabled={formData.disabled}
                                icon={formData.icon}
                                accept={formData.accept}
                                url={formData.url}
                                name={formData.name}
                                label={formData.label}
                                value={formik.values[formData.name]}
                                onChange={(e) => formik.setFieldValue(formData.name, e)}
                                error={formik.touched[formData.name] && Boolean(formik.errors[formData.name])}
                                helperText={formik.touched[formData.name] && formik.errors[formData.name]}
                            />
                        )
                    case 'divider':
                        return (
                            <DividerSection
                                label={formData.label}
                            />
                        )
                    case 'dynamic':
                        return (
                            <RenderDynamicField
                                onChange={(e) => formik.setFieldValue(formData.name, e)}
                                name={formData.name}
                                label={formData.label}
                                value={formik.values[formData.name]}
                                form={formData.options} />
                        )

                    default:
                        return (
                            <Textbox
                                required={formData.required}
                                multiline={formData.multiline}
                                disabled={formData.disabled}
                                fullWidth={formData.fullWidth}
                                name={formData.name}
                                label={formData.label}
                                type={formData.type}
                                icon={formData.icon}
                                value={formik.values[formData.name]}
                                onChange={formik.handleChange}
                                error={formik.touched[formData.name] && Boolean(formik.errors[formData.name])}
                                helperText={formik.touched[formData.name] && formik.errors[formData.name]}
                            />
                        )
                }

            })}




            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                {submitTitle}
            </Button>

        </form>
    )
}

export default Index;