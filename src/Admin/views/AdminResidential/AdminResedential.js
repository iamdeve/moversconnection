import MaterialTable from 'material-table';
import React from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Fade,
  Modal,
  Backdrop,
  Button
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
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

import { AdminContext } from '../../context/AdminContext';
const styles = (theme) => ({
  MainLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#00000073',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9999999'
  }
});

function getDateTime(date, time) {
  let now = new Date(date);
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  if (month.toString().length === 1) {
    month = '0' + month;
  }
  if (day.toString().length === 1) {
    day = '0' + day;
  }
  if (hour.toString().length === 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length === 1) {
    minute = '0' + minute;
  }
  if (second.toString().length === 1) {
    second = '0' + second;
  }
  let dateTime;
  if (time) {
    dateTime = hour + ':' + minute;
  } else {
    dateTime = year + '/' + month + '/' + day;
  }

  return dateTime;
}
class AdminResedential extends React.Component {
  static contextType = AdminContext;

  constructor() {
    super();
    this.state = {
      open: false,
      rowData: '',

      showModal: false,
      Orders: [
        {
          id: '1',
          startDate: '22 Nov ',
          City: '381 D Wapda Town',
          Email: 'xyz@gmail.com',
          lastName: 'waishahid',
          fullName: 'waishahid',
          locationFrom: 'A',
          locationTo: 'B',
          date: '23 May 5:00 PM',
          PhoneNumber: 'JUST CBD',
          businessType: 'WaizXXYY',
          BusinessName: 'JUST XYZ',
          City: 'hye hy yah',
          postalCode: 'B G',
          website: 'Accepted',
          amount: '23899.13',
          paidby: 'Cash',
          action: (
            <Button
              style={{ fontFamily: 'calibri', backgroundColor: '#dddddd' }}
              onClick={this.handleOpenModal}>
              Details
            </Button>
          )
        },
        {
          id: '3',
          startDate: '29 Nov ',
          address: '383 D Wapda Town',
          Email: 'xyz@gmail.com',
          lastName: 'aizshahid',
          PhoneNumber: 'JUST CBD',
          businessType: 'WaizXXZ',
          BusinessName: 'CD AD AN',
          fullName: 'Godrek',
          locationFrom: 'FF',
          locationTo: 'BB',
          date: '11 June 5:00 PM',
          City: 'hyf hy yah',
          postalCode: 'B G',
          website: 'Accepted',
          amount: '28499.13',
          paidby: 'Cash',
          action: (
            <Button
              style={{ fontFamily: 'calibri', backgroundColor: '#dddddd' }}
              onClick={this.handleOpenModal}>
              Details
            </Button>
          )
        },
        {
          id: '4',
          startDate: '30 Nov ',
          address: '384 D Wapda Town',
          Email: 'xyz@gmail.com',
          lastName: 'waizsahid',
          PhoneNumber: 'JUST CBD',
          businessType: 'WaizXXE',
          BusinessName: 'CBD',
          fullName: 'Podrick',
          locationFrom: 'CC',
          locationTo: 'DD',
          date: '15 July 5:00 PM',
          City: 'hyg hy yah',
          postalCode: 'B G',
          website: 'Accepted',
          amount: '28929.13',
          paidby: 'Cash',
          action: (
            <Button
              style={{ fontFamily: 'calibri', backgroundColor: '#dddddd' }}
              onClick={this.handleOpenModal}>
              Details
            </Button>
          )
        },
        {
          id: '5',
          startDate: '22 Dec ',
          address: '385 D Wapda Town',
          Email: 'xyz@gmail.com',
          lastName: 'waizshhid',
          PhoneNumber: 'JUST CBD',
          businessType: 'WaizZZD',
          BusinessName: 'DD CC NN',
          fullName: 'Hodrick',
          locationFrom: 'JJ',
          locationTo: 'LL',
          date: '15 August 9:00 PM',
          City: 'hyh hy yah',
          postalCode: 'B G',
          website: 'Accepted',
          amount: '28991.13',
          paidby: 'Cash',
          action: (
            <Button
              style={{ fontFamily: 'calibri', backgroundColor: '#dddddd' }}
              onClick={this.handleOpenModal}>
              Details
            </Button>
          )
        },
        {
          id: '6',
          startDate: '23 Dec ',
          address: '386 D Wapda Town',
          Email: 'xyz@gmail.com',
          lastName: 'waizshahd',
          PhoneNumber: 'JUST CBD',
          businessType: 'WaizYYB',
          BusinessName: 'JUST BDA',
          fullName: 'Godrick',
          locationFrom: 'CC',
          locationTo: 'DD',
          date: '15 July 5:00 PM',
          City: 'hyi hy yah',
          postalCode: 'B G',
          website: 'Accepted',
          amount: '2899.113',
          paidby: 'Cash',
          action: (
            <Button
              style={{ fontFamily: 'calibri', backgroundColor: '#dddddd' }}
              onClick={this.handleOpenModal}>
              Details
            </Button>
          )
        },
        {
          id: '7',
          startDate: '24 Dec ',
          address: '387 D Wapda Town',
          Email: 'xyz@gmail.com',
          lastName: 'waizshahi',
          PhoneNumber: 'JUST CBD',
          businessType: 'WaizNNC',
          BusinessName: 'Name',
          fullName: 'Zodrick',
          locationFrom: 'CC',
          locationTo: 'DD',
          date: '15 July 5:00 PM',
          City: 'hyj hy yah',
          postalCode: 'B G',
          website: 'Accepted',
          amount: '28990.13',
          paidby: 'Cash',
          action: (
            <Button
              style={{ fontFamily: 'calibri', backgroundColor: '#dddddd' }}
              onClick={this.handleOpenModal}>
              Details
            </Button>
          )
        }
      ]
    };
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true
    });
    this.approveRequest();
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  onRowClick = (e, rowData) => {
    this.setState({ rowData: rowData });
  };

  componentDidMount = () => {
    if (!this.context.isAuthenticated) {
      this.props.history.push('/admin/Signin');
    }
    // this.getUserRequests();
    this.setState({
      Orders: this.context.reservations
    });
    // console.log(this.state.Orders);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={2}
        style={{
          padding: '3vh',
          backgroundColor: 'white',
          height: '90vh',
          margin: 0
        }}
        xs={12}>
        {this.context.loading ? (
          <div className={classes.MainLoader}>
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : null}
        <Grid item md={12} xs={12}>
          <Card>
            <MaterialTable
              columns={[
                {
                  title: 'Full Name',
                  field: 'customerId.name',

                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'Email',
                  field: 'customerId.email',

                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'Phone',
                  field: 'customerId.phone',

                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'From Location',
                  field: 'from',
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'To Location',
                  field: 'to',
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },

                {
                  title: 'Date',
                  // field: 'orderId.totalPrice',
                  render: (rowData) =>
                    rowData.reservationId && rowData.reservationId.date
                      ? getDateTime(rowData.reservationId.date)
                      : '',
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'Time',
                  // field: 'orderId.totalPrice',
                  render: (rowData) =>
                    rowData.reservationId && rowData.reservationId.time
                      ? getDateTime(rowData.reservationId.time, true)
                      : '',
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },

                {
                  title: 'Amount',
                  // field: 'orderId.totalPrice',
                  render: (rowData) =>
                    rowData.orderId && rowData.orderId.totalPrice
                      ? parseFloat(rowData.orderId.totalPrice).toFixed(2)
                      : '',
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                }
                // {
                //   title: 'Action', field: 'action',
                //   cellStyle: {
                //     fontFamily: 'calibri',
                //   },
                // },
              ]}
              data={this.context.reservations.filter(
                (r) => r.jobType === 'Residential'
              )}
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
              onRowClick={this.onRowClick}
              options={{
                headerStyle: {
                  // backgroundColor: '#dddddd',
                  background: '#3f51b5',
                  color: '#FFF',
                  actionsColumnIndex: -1,
                  paging: false
                },
                rowStyle: (x) => {
                  if (x.tableData.id % 2) {
                    return { backgroundColor: '#f2f2f2' };
                  }
                }
              }}
              title=""
            />
          </Card>
          <Modal
            aria-describedby="transition-modal-description"
            aria-labelledby="transition-modal-title"
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
            className="Modal"
            closeAfterTransition
            onClose={this.handleCloseModal}
            open={this.state.showModal}>
            <Fade in={this.state.showModal}>
              <div
                className="Paper"
                style={{
                  marginLeft: '10vh',
                  marginTop: '10vh',
                  marginRight: '10vh'
                }}>
                <Card>
                  <CardHeader
                    style={{ backgroundColor: '#dddddd' }}
                    title="User's Request Details"
                    variant="h1"
                  />
                  <Divider />
                  <CardContent>
                    <Grid container md={12} spacing={2} xs={12}>
                      <Grid item md={4} xs={4}>
                        <TextField
                          defaultValue={this.state.rowData.fullName}
                          id="search"
                          label="First Name"
                          style={{ width: '25ch' }}
                          type="search"
                        />
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <TextField
                          defaultValue={this.state.rowData.lastName}
                          id="lastName"
                          label="Last Name"
                          style={{ width: '25ch' }}
                          type="search"
                        />
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <TextField
                          defaultValue={this.state.rowData.PhoneNumber}
                          id="PhoneNumber"
                          label="Phone Number"
                          style={{ width: '25ch' }}
                          type="search"
                        />
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <TextField
                          defaultValue={this.state.rowData.Email}
                          id="Email"
                          label="Email"
                          style={{ width: '25ch' }}
                          type="search"
                        />
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <TextField
                          defaultValue={this.state.rowData.businessType}
                          id="Email"
                          label="Business Type"
                          style={{ width: '25ch' }}
                          type="search"
                        />
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <TextField
                          defaultValue={this.state.rowData.BusinessName}
                          id="Email"
                          label="Business Name"
                          style={{ width: '25ch' }}
                          type="search"
                        />
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <TextField
                          defaultValue={this.state.rowData.City}
                          id="Email"
                          label="City"
                          style={{ width: '25ch' }}
                          type="search"
                        />
                      </Grid>

                      <Grid item md={4} xs={4}>
                        <TextField
                          defaultValue={this.state.rowData.City}
                          id="Email"
                          label="City"
                          style={{ width: '25ch' }}
                          type="search"
                        />
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <TextField
                          defaultValue={this.state.rowData.postalCode}
                          id="Email"
                          label="Postal Code"
                          style={{ width: '25ch' }}
                          type="search"
                        />
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <TextField
                          defaultValue={this.state.rowData.website}
                          id="Email"
                          label="Website"
                          style={{ width: '25ch' }}
                          type="search"
                        />
                      </Grid>
                    </Grid>
                    <Grid container md={12} spacing={4} xs={12}>
                      <Grid item xs={6}>
                        <Button
                          style={{
                            fontFamily: 'calibri',
                            backgroundColor: '#dddddd',
                            marginLeft: '75vh'
                          }}
                          onClick={this.approveRequest}>
                          {' '}
                          Approve
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button
                          style={{
                            fontFamily: 'calibri',
                            backgroundColor: '#dddddd'
                          }}
                          onClick={this.rejectRequest}>
                          {' '}
                          Deny
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            </Fade>
          </Modal>
        </Grid>
        {/* )} */}
      </Grid>
    );
  }
}

export default withStyles(styles)(AdminResedential);
