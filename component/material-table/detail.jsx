import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { apiConfig } from "../../config/api";
import MaterialTable from "material-table";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  CssBaseline,
  Grid,
  Icon,
  IconButton,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { useLoader } from "../loader";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  image: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    float: "right",
  },
}));

const Index = (props) => {
  const classes = useStyles();
  const loader = useLoader();
  const router = useRouter();
  const { url, id, columns, actionButtons } = props;
  const [data, setState] = useState([]);
  const { title, xs, sm, md, lg, xl, marginTop, goBack } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToBack = () => {
    router.push(props.goBack);
  };

  const getData = async (id) => {
    loader({ open: true });
    await apiConfig
      .get(`${url}/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          setState(data);
        }
        loader({ open: false });
      })
      .catch(() => {
        loader({ open: false });
      });
  };

  useEffect(() => {
    if (id && id !== "new") {
      getData(id);
    }
  }, [id]);

  return (
    <Container>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: marginTop }}
      >
        <CssBaseline />
        <Grid
          item
          xs={xs}
          sm={sm}
          md={md}
          lg={lg}
          xl={xl}
          component={Paper}
          elevation={6}
          square
        >
          <Card>
            <CardHeader
              titleTypographyProps={{ variant: "h5", align: "center" }}
              title={title}
              action={
                actionButtons && actionButtons.length ? (
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                ) : null
              }
              avatar={
                goBack && <Icon onClick={() => goToBack()}>arrow_back</Icon>
              }
            />
            <CardContent>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    {columns &&
                      columns.map((column) => {
                        if (column.type == "list") {
                          if (data[column.field]) {
                            return (
                              <TableRow>
                                <TableCell colSpan={2}>
                                  <MaterialTable
                                    style={{ width: "100%" }}
                                    title={column.title}
                                    columns={column.columns}
                                    data={data[column.field]}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          }
                        } else {
                          return (
                            <TableRow>
                              <TableCell component="th" scope="row">
                                {column.title}
                              </TableCell>

                              <TableCell align="right">
                                {column.field != "image" && data[column.field]}

                                {column.field == "image" && (
                                  <Avatar
                                    variant="square"
                                    src={data[column.field]}
                                    className={classes.image}
                                  >
                                    <Icon fontSize="large">wallpaper</Icon>
                                  </Avatar>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {actionButtons &&
          actionButtons.map((actionButton) => {
            let showBtn = true;
            if (actionButton.where) {
              if (data[actionButton.where.field] != actionButton.where.value) {
                showBtn = false;
              }
            }
            if (showBtn) {
              return (
                <MenuItem
                  onClick={() => {
                    actionButton.action(data);
                    handleClose();
                  }}
                >
                  {actionButton.text}
                </MenuItem>
              );
            }
          })}
      </Menu>
    </Container>
  );
};

export default Index;
