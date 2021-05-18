import React, { createRef, useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";

import { apiConfig } from "../../config/api";
import moment from "moment";
import DateBox from "./datefilter";
import RenderDateRange from "../formik/renderDaterange";
import SelectColumn from "./selectColumn";
import { useRouter } from "next/router";
import { useModal } from "../modal";
import { useSnackbar } from "../snackbar";
import { useLoader } from "../loader";
import { Avatar, Icon, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const MaterialDataTable = (props) => {
  const { t } = useTranslation(["common", "datatable"]);
  const {
    columns,
    selection,
    refresh,
    dateFilter,
    dateFilterLabel,
    exportButton,
    exportExcel,
    isRowUpdate,
    customActions,
    autoRefresh,
  } = props;
  const classes = useStyles();
  const modal = useModal();
  const snackbar = useSnackbar();
  const loader = useLoader();
  const tableRef = createRef();
  const fileUploader = createRef();
  const router = useRouter();
  const [dateRange, setDateRange] = useState([]);
  const [selectedCols, setSelectedCols] = useState([]);

  useEffect(() => {
    if (autoRefresh) {
      setInterval(() => {
        refreshTable();
      }, autoRefresh);
    }
  }, []);

  useEffect(() => {
    if (dateRange) {
      refreshTable();
    }
  }, [dateRange]);

  const openDateRangeFilter = () => {
    modal({
      title: t("datatable:selectDateRange"),
      description: (
        <RenderDateRange
          open={true}
          handleChange={setDateRange}
          value={dateRange}
        />
      ),
      showConfirm: true,
      showCancel: true,
    });
  };

  const refreshTable = () => {
    if (tableRef.current) {
      tableRef.current.onQueryChange();
    }
  };

  const exportDataExcel = async () => {
    const { dateRange } = props;
    if (tableRef.current) {
      const { query } = tableRef.current.state;
      if (dateRange) {
        if (dateRange.startDate) {
          query.startDate = moment(dateRange.startDate).format("YYYY-MM-DD");
        }
        if (dateRange.endDate) {
          query.endDate = moment(dateRange.endDate).format("YYYY-MM-DD");
        }
      }

      loader({ open: true });
      await apiConfig
        .get(`export${props.url}`, query)
        .then((result) => {
          if (result.status === 200) {
            window.open(result.data.url);
          }
          loader({ open: false });
        })
        .catch(() => {
          loader({ open: false });
        });
    }
  };

  const deleteData = async (id) => {
    modal({
      title: t("datatable:confirmation"),
      description: t("datatable:body:editRow:deleteText"),
      showConfirm: true,
      showCancel: true,
    }).then(async () => {
      loader({ open: true });
      await apiConfig
        .delete(`${props.url}/${id}`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.message) {
              snackbar({
                message: response.data.message,
                severity: "success",
              });
            }
            loader({ open: false });
            refreshTable();
          }
        })
        .catch((error) => {
          const { response } = error;
          if (response.data.message) {
            snackbar({
              message: response.data.message,
              severity: "error",
            });
          }
          loader({ open: false });
        });
    });
  };

  const importFileData = async (event) => {
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    loader({ open: true });

    await apiConfig
      .post(`import${props.url}`, formData, config)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.message) {
            snackbar({
              message: response.data.message,
              severity: "success",
            });
          }
          refreshTable();

          loader({ open: false });
        }
      })
      .catch((error) => {
        const { response } = error;
        if (response.data.message) {
          snackbar({
            message: response.data.message,
            severity: "error",
          });
        }

        loader({ open: false });
      });
  };

  const actions = [];
  const options = {
    selection: selection,
    actionsColumnIndex: -1,
    search: true,
    sorting: true,
    filtering: true,
    exportButton: exportButton,
  };

  if (props.deleteAll) {
    actions.push({
      icon: "delete",
      tooltip: t("datatable:deleteAll"),
      onClick: (event, rowData) => {},
    });
  }

  if (props.addData) {
    actions.push({
      icon: "add",
      tooltip: t("datatable:body:addTooltip"),
      isFreeAction: true,
      onClick: () => {
        router.push({
          pathname: `${props.url}/form/[id]`,
          query: { id: "new" },
        });
      },
    });
  }

  if (exportExcel) {
    actions.push({
      icon: "download",
      tooltip: t("datatable:exportData"),
      isFreeAction: true,
      onClick: () => exportDataExcel(),
    });
  }

  if (props.importData) {
    actions.push({
      icon: "upload",
      tooltip: t("datatable:importData"),
      isFreeAction: true,
      onClick: () => {
        if (fileUploader.current) {
          fileUploader.current.click();
        }
      },
    });
  }

  if (refresh) {
    actions.push({
      icon: "refresh",
      tooltip: t("datatable:refresh"),
      isFreeAction: true,
      onClick: () => refreshTable(),
    });
  }

  if (dateFilter) {
    actions.push({
      icon: "date_range",
      tooltip: dateFilterLabel ? dateFilterLabel : t("datatable:dateRange"),
      isFreeAction: true,
      onClick: () => openDateRangeFilter(),
    });
  }

  if (props.deleteData) {
    actions.push({
      icon: "delete",
      tooltip: t("datatable:body:deleteTooltip"),
      position: "row",
      onClick: (event, rowData) => {
        deleteData(rowData.id);
      },
    });
  }

  if (props.editData) {
    actions.push({
      icon: "edit",
      tooltip: t("datatable:body:editTooltip"),
      position: "row",
      onClick: (event, rowData) => {
        router.push({
          pathname: `${props.url}/form/[id]`,
          query: { id: rowData.id },
        });
      },
    });
  }

  if (props.editPass) {
    actions.push({
      icon: "lock",
      tooltip: t("datatable:editPassword"),
      position: "row",
      onClick: (event, rowData) => {
        router.push({
          pathname: `${props.url}/password/[id]`,
          query: { id: rowData.id },
        });
      },
    });
  }

  if (props.viewData) {
    actions.push({
      icon: "visibility",
      tooltip: t("datatable:view"),
      position: "row",
      onClick: (event, rowData) => {
        router.push({
          pathname: `${props.url}/view/[id]`,
          query: { id: rowData.id },
        });
      },
    });
  }

  const finalColumns = [];
  if (columns) {
    columns.forEach((column) => {
      let hidden = false;
      if (
        selectedCols &&
        selectedCols.length &&
        !selectedCols.includes(column.field)
      ) {
        hidden = true;
      }

      switch (column.field) {
        case "expiry_date":
        case "end_date":
        case "start_date":
        case "created_at":
        case "updated_at":
          finalColumns.push({
            title: column.title,
            field: column.field,
            sorting: column.sorting,
            filtering: column.filtering,
            editable: column.editable,
            editComponent: column.editComponent,
            hidden: hidden,
            filterComponent: (props) => <DateBox {...props} />,
          });
          break;
        case "image":
          finalColumns.push({
            title: column.title,
            field: column.field,
            sorting: column.sorting,
            filtering: column.filtering,
            editable: column.editable,
            editComponent: column.editComponent,
            hidden: hidden,
            render: (row) => (
              <Avatar
                variant="square"
                src={row.image}
                className={classes.large}
              >
                <Icon fontSize="large">wallpaper</Icon>
              </Avatar>
            ),
          });
          break;
        default:
          finalColumns.push({
            title: column.title,
            field: column.field,
            lookup: column.lookup,
            render: column.render,
            sorting: column.sorting,
            filtering: column.filtering,
            editable: column.editable,
            editComponent: column.editComponent,
            hidden: hidden,
          });
          break;
      }
    });
  }

  // column selection
  actions.push({
    icon: "grading",
    tooltip: t("datatable:toolbar:showColumnsTitle"),
    isFreeAction: true,
    onClick: () => {
      modal({
        title: t("datatable:toolbar:showColumnsTitle"),
        description: (
          <SelectColumn
            columns={finalColumns}
            selectedCols={selectedCols}
            onSelectChange={setSelectedCols}
          />
        ),
        showConfirm: true,
        showCancel: true,
      });
    },
  });

  // custom action
  if (customActions) {
    customActions.forEach((element) => {
      actions.push({
        icon: element.icon,
        iconProps: element.iconProps,
        tooltip: element.tooltip,
        position: element.position,
        onClick: (event, rowData) => {
          customActionCall(rowData.id, element.data);
        },
      });
    });
  }

  const customActionCall = async (id, data) => {
    loader({ open: true });
    await apiConfig
      .put(`/orders/${id}`, data)
      .then((response) => {
        if (response.status == 200) {
          if (response.data.message) {
            snackbar({
              message: response.data.message,
              severity: "success",
            });
          }
          loader({ open: false });
          refreshTable();
        }
      })
      .catch((error) => {
        const { response } = error;
        loader({ open: false });
        if (response.data.message) {
          snackbar({
            message: response.data.message,
            severity: "error",
          });
        }
        refreshTable();
      });
  };

  // row editable
  let editable = {};

  if (isRowUpdate) {
    editable.onRowUpdate = (newData, oldData) =>
      new Promise((resolve, reject) => {
        loader({ open: true });
        apiConfig
          .put(`${props.url}/${newData.id}`, newData)
          .then((response) => {
            if (response.status == 200) {
              if (response.data.message) {
                snackbar({
                  message: response.data.message,
                  severity: "success",
                });
              }
              loader({ open: false });
              resolve(newData);
            } else {
              reject(oldData);
            }
          })
          .catch((error) => {
            const { response } = error;
            loader({ open: false });
            if (response.data.message) {
              snackbar({
                message: response.data.message,
                severity: "error",
              });
            }
            reject(oldData);
          });
      });
  }

  // date range filter
  let startDate,
    endDate = null;
  if (dateRange) {
    if (dateRange.startDate) {
      startDate = moment(dateRange.startDate).format("YYYY-MM-DD");
    }
    if (dateRange.endDate) {
      endDate = moment(dateRange.endDate).format("YYYY-MM-DD");
    }
  }

  return (
    <React.Fragment>
      <input
        type="file"
        id="file"
        ref={fileUploader}
        style={{ display: "none" }}
        onChange={(e) => {
          importFileData(e);
          e.target.value = null;
        }}
      />

      <MaterialTable
        tableRef={tableRef}
        title={props.title}
        data={(query) =>
          new Promise((resolve, reject) => {
            let filters = [];
            let filter = [];

            if (query) {
              if (query.filters) {
                query.filters.map((filter) => {
                  let value = filter.value;
                  if (Array.isArray(filter.value)) {
                    value = JSON.stringify(filter.value);
                  }
                  filters.push({
                    name: filter.column.field,
                    value: value,
                  });
                  return null;
                });
              }

              filter = {
                page: query.page + 1,
                pageSize: query.pageSize,
                search: query.search,
                orderBy: query.orderBy ? query.orderBy.field : null,
                orderDirection: query.orderDirection,
                filters: JSON.stringify(filters),
              };

              if (props.where) {
                props.where.forEach((element) => {
                  filter[element.name] = element.value;
                });
              }

              if (startDate) {
                filter.startDate = startDate;
              }
              if (endDate) {
                filter.endDate = endDate;
              }
            }
            apiConfig.get(`${props.url}`, { params: filter }).then((result) => {
              if (result.status === 200) {
                resolve({
                  data: result.data.data,
                  page: result.data.current_page - 1,
                  totalCount: result.data.total,
                });
              }
            });
          })
        }
        options={options}
        actions={actions}
        columns={finalColumns}
        editable={editable}
        localization={{
          body: {
            emptyDataSourceMessage: t("datatable:body:emptyDataSourceMessage"),
            addTooltip: t("datatable:body:addTooltip"),
            deleteTooltip: t("datatable:body:deleteTooltip"),
            editTooltip: t("datatable:body:editTooltip"),
            filterRow: {
              filterPlaceHolder: t(
                "datatable:body:filterRow:filterPlaceHolder"
              ),
              filterTooltip: t("datatable:body:filterRow:filterTooltip"),
            },
            editRow: {
              deleteText: t("datatable:body:editRow:deleteText"),
              cancelTooltip: t("datatable:body:editRow:cancelTooltip"),
              saveTooltip: t("datatable:body:editRow:saveTooltip"),
            },
          },
          grouping: {
            placeholder: t("datatable:grouping:placeholder"),
            groupedBy: t("datatable:grouping:groupedBy"),
          },
          header: {
            actions: t("datatable:header:actions"),
          },
          pagination: {
            labelDisplayedRows: t("datatable:pagination:labelDisplayedRows"),
            labelRowsPerPage: t("datatable:pagination:labelRowsPerPage"),
            firstAriaLabel: t("datatable:pagination:firstAriaLabel"),
            firstTooltip: t("datatable:pagination:firstTooltip"),
            previousAriaLabel: t("datatable:pagination:previousAriaLabel"),
            previousTooltip: t("datatable:pagination:previousTooltip"),
            nextAriaLabel: t("datatable:pagination:nextAriaLabel"),
            nextTooltip: t("datatable:pagination:nextTooltip"),
            lastAriaLabel: t("datatable:pagination:lastAriaLabel"),
            lastTooltip: t("datatable:pagination:lastTooltip"),
          },
          toolbar: {
            addRemoveColumns: t("datatable:toolbar:addRemoveColumns"),
            nRowsSelected: t("datatable:toolbar:nRowsSelected"),
            showColumnsTitle: t("datatable:toolbar:showColumnsTitle"),
            showColumnsAriaLabel: t("datatable:toolbar:showColumnsAriaLabel"),
            exportTitle: t("datatable:toolbar:exportTitle"),
            exportAriaLabel: t("datatable:toolbar:exportAriaLabel"),
            exportName: t("datatable:toolbar:exportName"),
            searchTooltip: t("datatable:toolbar:searchTooltip"),
            searchPlaceholder: t("datatable:toolbar:searchPlaceholder"),
          },
        }}
        components={{
          Toolbar: (props) => {
            // This will let you use your own Title while keeping the search
            const propsCopy = { ...props };
            // Hide default title
            propsCopy.showTitle = false;
            return (
              <Grid container direction="row">
                <Grid item xs={4}>
                  <h3 style={{ marginLeft: 20 }}>{props.title}</h3>
                </Grid>
                <Grid item xs={8}>
                  <MTableToolbar {...propsCopy} />
                </Grid>
              </Grid>
            );
          },
        }}
      />
    </React.Fragment>
  );
};

export default MaterialDataTable;
