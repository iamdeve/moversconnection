import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { AdminContext } from './../../../context/AdminContext';
import MaterialTable from 'material-table';
import { Card, Button, Switch } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AdminItemsModel from './adminItemsModel';

import {
  Check,
  ChevronRight,
  SaveAlt,
  FilterList,
  FirstPage,
  LastPage,
  ChevronLeft,
  Search,
  Remove,
  ArrowDownward,
  AddBox,
  ViewColumn,
  Clear,
  Edit,
  Delete
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const ItemsTable = (props) => {
  const { className, users, ...rest } = props;
  const AdminContext1 = useContext(AdminContext);
  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [OpenEditModel, setOpenModel] = React.useState(false);
  const [CurrentEdit, setCurrentEdit] = React.useState(null);

  const handleSelectAll = (event) => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map((user) => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };
  const handleItemDelete = (rowData) => {
    AdminContext1.handleItemDelete2(rowData);
  };
  const handleEditItems = (rowData) => {
    setOpenModel(true);
    console.log('ali raza', rowData);
    setCurrentEdit(rowData);
  };
  const handleClose = () => {
    setOpenModel(false);
  };
  //   console.log(CurrentEdit)
  return (
    <AdminContext.Consumer>
      {(context) => {
        return context.isAuthenticated ? (
          <Card className={classes.root}>
            <MaterialTable
              columns={[
                {
                  title: 'Id',
                  field: '_id',
                  render: (rowData) => (
                    <span>
                      {/* {console.log(rowData.tableData.id)} */}
                      {rowData.tableData.id + 1}
                    </span>
                  ),
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'Item Name',
                  field: 'name',
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'Price',
                  // field: 'price',
                  render: (rowData) => (
                    <div>
                      {rowData.cost !== '' || rowData.cost !== undefined
                        ? rowData.cost
                        : null}
                      {rowData.sizing &&
                        rowData.sizing.length > 0 &&
                        rowData.sizing.map((size) => (
                          <div>
                            <span style={{ fontWeight: 'bold' }}>
                              {size.sizing}
                            </span>{' '}
                            : <span>{size.price}</span>
                          </div>
                        ))}
                    </div>
                  ),
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'Category',
                  field: 'categoryName',
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'Action',
                  render: (rowData) => (
                    <>
                      {rowData && (
                        <>
                          <Grid container direction="row">
                            <Grid item>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleEditItems(rowData)}>
                                Edit
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="contained"
                                style={{ marginLeft: '5px' }}
                                color="primary"
                                onClick={() => handleItemDelete(rowData._id)}>
                                Delete
                              </Button>
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </>
                  ),
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                }
              ]}
              data={context.AllItems}
              icons={{
                Check: Check,
                DetailPanel: ChevronRight,
                Export: SaveAlt,
                Filter: FilterList,
                FirstPage: FirstPage,
                LastPage: LastPage,
                NextPage: ChevronRight,
                PreviousPage: ChevronLeft,
                Search: Search,
                ThirdStateCheck: Remove,
                SortArrow: ArrowDownward,
                Add: AddBox,
                ViewColumn: ViewColumn,
                Clear: Clear,
                ResetSearch: Clear,
                Edit: Edit,
                Delete: Delete
              }}
              options={{
                actionsColumnIndex: -1,
                headerStyle: {
                  background: '#3f51b5',
                  color: '#FFF',
                  span: {
                    backgroundColor: 'red'
                  }
                },
                rowStyle: (x) => {
                  if (x.tableData.id % 2) {
                    return { backgroundColor: '#f2f2f2' };
                  }
                }
              }}
              title=""
            />
            {CurrentEdit && (
              <AdminItemsModel
                open={OpenEditModel}
                editData={CurrentEdit}
                handleClose={handleClose}
              />
            )}
          </Card>
        ) : (
          <Redirect to="/admin/Signin" />
        );
      }}
    </AdminContext.Consumer>
  );
};

ItemsTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default ItemsTable;
