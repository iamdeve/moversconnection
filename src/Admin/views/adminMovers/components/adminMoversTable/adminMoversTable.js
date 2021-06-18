import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { AdminContext } from '../../../../context/AdminContext';
import MaterialTable from 'material-table';
import { Card, Button, Switch } from '@material-ui/core';

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

const MoversTable = (props) => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

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
                  title: 'Company Name',
                  field: 'companyName',
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'Email',
                  field: 'email',
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },

                {
                  title: 'Location',
                  field: 'city',
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                // {
                //   title: 'Approved',
                //   field: 'isApproved',
                //   cellStyle: {
                //     fontFamily: 'calibri'
                //   }
                // },
                // {
                //   title: 'Verified',
                //   field: 'isVerified',
                //   cellStyle: {
                //     fontFamily: 'calibri'
                //   }
                // },
                // {
                //   title: 'Status',
                //   field: 'status',
                //   cellStyle: {
                //     fontFamily: 'calibri'
                //   }
                // },
                {
                  title: 'Status',
                  render: (rowData) => (
                    <>
                      {rowData.isApproved ? (
                        <>
                          <Switch
                            checked={rowData.status}
                            onChange={() =>
                              context.handleChangeStatus(rowData._id)
                            }
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                          <span>
                            {rowData.status ? (
                              <span
                                style={{ fontSize: '18px', color: 'green' }}>
                                Live
                              </span>
                            ) : (
                              <span style={{ fontSize: '18px', color: 'gray' }}>
                                Disabled
                              </span>
                            )}
                          </span>
                        </>
                      ) : (
                        rowData.isVerified ? (
                        <Button
                          variant="contained"
                          onClick={() => context.approveMover(rowData._id)}>
                          Approve
                        </Button>
                        ) : (
                            <span style={{color: 'gray', fontSize:'12px', backgroundColor:'#eee', display:'inline-block', padding:'.3rem', borderRadius:'10px'}}>Verification Pending</span>
                        )
                        
                      )}
                    </>
                  ),
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                }
              ]}
              data={context.movers}
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
              // onRowClick={this.onRowClick}
              // actions={[
              //   (rowData) => ({
              //     icon: Edit,
              //     tooltip: 'Approve Mover',
              //     onClick: (event, rowData) => {
              //       context.approveMover(rowData._id);
              //     }
              //   })
              // ]}
              options={{
                actionsColumnIndex: -1,
                headerStyle: {
                  // backgroundColor: '#3f51b5',
                  background: '#3f51b5',
                  color: '#FFF',
                  span: {
                    backgroundColor: 'red'
                  }
                },
                // actionsColumnIndex: -1,
                // paging: false,
                rowStyle: (x) => {
                  if (x.tableData.id % 2) {
                    return { backgroundColor: '#f2f2f2' };
                  }
                }
              }}
              title=""
            />
          </Card>
        ) : (
          <Redirect to="/admin/Signin" />
        );
      }}
    </AdminContext.Consumer>
  );
};

MoversTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default MoversTable;
