import MaterialTable from 'material-table';
import React from 'react';
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
import { withStyles } from '@material-ui/styles';
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
class Orders extends React.Component {
  static contextType = AdminContext;
  constructor() {
    super();
    this.state = {
      open: false,
      rowData: '',
      selectedRequest: {},
      selectedItems: [],
      showModal: false,
      Orders: []
    };
  }

  handleOpenModal = (rowData) => {
    this.setState({ showModal: true, selectedRequest: rowData });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  onRowClick = (e, rowData) => {
    let arr = [];
    Object.keys(
      rowData.orderId.items.reduce(function (p, c) {
        p[c.categoryName] = (p[c.categoryName] || 0) + 1;
        return p;
      }, {})
    ).forEach((cat) => {
      arr.push({
        title: cat,
        items: rowData.orderId.items.filter((item) => item.categoryName === cat)
      });
    });
    console.log(arr);
    this.setState({ rowData: rowData, selectedItems: arr });
  };
  componentDidMount = () => {
    if (!this.context.isAuthenticated) {
      this.props.history.push('/admin/Signin');
    }
    console.log(this.context.reservations);
    // this.setState({
    //   Orders: this.context.reservations
    // });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={2}
        xs={12}
        style={{
          padding: '3vh',
          backgroundColor: 'white',
          height: '100vh',
          margin: 0
        }}>
        {this.context.loader && this.context.reservations.length === 0 && (
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
        )}
        <Grid item xs={12} md={12}>
          <Card>
            {this.context.loading &&
            this.context.reservations &&
            this.context.reservations[0] &&
            this.context.reservations[0].from === undefined ? (
              'loading....'
            ) : (
              <MaterialTable
                title=""
                onRowClick={this.onRowClick}
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
                columns={[
                  {
                    title: 'ID',
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
                    title: 'Customer Name',
                    // field: 'customerId.name',
                    render: (rowData) => (
                      <span>
                        {rowData.jobType === 'Commercial'
                          ? rowData.commercialCustomerId.contactName
                          : rowData.customerId.name}
                      </span>
                    ),
                    cellStyle: {
                      fontFamily: 'calibri'
                    }
                  },
                  {
                    title: 'From Location',
                    field: 'reservationId.reservation.from',
                    render: (rowData, index, i) => <span>{rowData.reservationId ? rowData.reservationId.reservation.from : rowData.orderId.origin.from} </span>,
                    cellStyle: {
                      fontFamily: 'calibri'
                    }
                  },
                  {
                    title: 'To Location',
                    field: 'reservationId.reservation.to',
                    render: (rowData, index, i) => <span>{rowData.reservationId ? rowData.reservationId.reservation.to : rowData.orderId.destination.to} </span>,
                 
                    cellStyle: {
                      fontFamily: 'calibri'
                    }
                  },
                  {
                    title: 'Move Type',
                    field: 'jobType',
                    cellStyle: {
                      fontFamily: 'calibri'
                    }
                  },
                  {
                    title: 'Amount',
                    // field: 'reservation.amountPaid',
                    render: (rowData) => (
                      <span>
                        {rowData.orderId && rowData.orderId.totalPrice
                          ? parseFloat(rowData.orderId.totalPrice).toFixed(2)
                          : ''}{' '}
                      </span>
                    ),
                    cellStyle: {
                      fontFamily: 'calibri'
                    }
                  },
                  {
                    title: 'Status',
                    field: 'status',
                    cellStyle: {
                      fontFamily: 'calibri'
                    }
                  },
                  {
                    title: 'Movers',
                    field: 'moverId.companyName',
                    cellStyle: {
                      fontFamily: 'calibri'
                    }
                  },
                  {
                    title: 'Payment Id',
                    field: 'reservationId.paymentId',
                    cellStyle: {
                      fontFamily: 'calibri',
                      wordBreak: 'break-all'
                    }
                  },
                  {
                    title: 'Actions',
                    render: (rowData) => (
                      <>
                        {rowData.jobType === 'Residential' ? (
                          <Button
                            variant="contained"
                            onClick={() => this.handleOpenModal(rowData)}>
                            View
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => this.handleOpenModal(rowData)}>
                            View
                          </Button>
                        )}
                      </>
                    ),
                    cellStyle: {
                      fontFamily: 'calibri'
                    }
                  }
                ]}
                data={this.context.reservations}
                options={{
                  headerStyle: {
                    // backgroundColor: '#dddddd',
                    background: '#3f51b5',
                    // color: '#black'
                    color: '#FFF'
                  },
                  // actionsColumnIndex: -1,
                  tableLayout: 'fixed',
                  // paging: false,
                  // actionsColumnIndex: -1,
                  rowStyle: (x) => {
                    if (x.tableData.id % 2) {
                      return { backgroundColor: '#f2f2f2' };
                    }
                  }
                }}
                actions={
                  [
                    // rowData => ({
                    //   icon: Edit,
                    //   tooltip: 'Accept Job',
                    //   // eslint-disable-next-line no-restricted-globals
                    //   onClick: (event, rowData) => {
                    //     let newData = [];
                    //     this.state.Orders.map((order) => {
                    //       //console.log(order)
                    //       if (rowData.id == order.id) {
                    //         rowData.stats = 'assigned';
                    //       }
                    //       newData.push(order)
                    //       // console.log(rowData.id)
                    //       //if (order.name != value) newData.push(tableRow);
                    //     });
                    //     this.setState({ Orders: newData })
                    //     //setTableLanguages(newData);
                    //   },
                    // })
                  ]
                }
              />
            )}
          </Card>
        </Grid>

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
              <Card
                style={{
                  height: 'auto',
                  maxHeight: '45rem',
                  overflow: 'auto'
                }}>
                <CardHeader
                  style={{ backgroundColor: '#dddddd' }}
                  title="Request Details"
                  variant="h1"
                />
                <Divider />
                <CardContent>
                  {this.state.selectedRequest.jobType === 'Residential' ? (
                    <Grid container md={12} spacing={2} xs={12}>
                      <Grid item md={12} xs={12}>
                        <h4>Customer Information</h4>
                        <Grid container md={12} xs={12}>
                          <Grid item md={3} xs={3}>
                            <strong>Customer Name</strong>
                          </Grid>
                          <Grid item md={3} xs={3}>
                            {this.state.selectedRequest?.customerId?.name}
                          </Grid>
                        </Grid>

                        <Grid container md={12} xs={12}>
                          <Grid item md={3} xs={3}>
                            <strong>Customer Email</strong>
                          </Grid>
                          <Grid item md={3} xs={3}>
                            {this.state.selectedRequest?.customerId?.email}
                          </Grid>
                        </Grid>

                        <Grid container md={12} xs={12}>
                          <Grid item md={3} xs={3}>
                            <strong>Customer Phone</strong>
                          </Grid>
                          <Grid item md={3} xs={3}>
                            {this.state.selectedRequest?.customerId?.phone}
                          </Grid>
                        </Grid>
                        <Grid container md={12} xs={12}>
                          <Grid item md={3} xs={3}>
                            <strong>Customer Address</strong>
                          </Grid>
                          <Grid item md={3} xs={3}>
                            {this.state.selectedRequest?.customerId?.address}
                          </Grid>
                        </Grid>
                        <Grid container md={12} xs={12}>
                          <Grid item md={3} xs={3}>
                            <strong>Date & Time</strong>
                          </Grid>
                          <Grid item md={3} xs={3}>
                            {getDateTime(
                              this.state.selectedRequest?.reservationId?.date
                            )}{' '}
                            {getDateTime(
                              this.state.selectedRequest?.reservationId?.time,
                              true
                            )}
                          </Grid>
                        </Grid>
                        <Grid container md={12} xs={12}>
                          <Grid item md={3} xs={3}>
                            <strong>Total Amount</strong>
                          </Grid>
                          <Grid item md={3} xs={3}>
                            $
                            {this.state.selectedRequest?.reservationId?.reservation?.totalAmount.toFixed(
                              2
                            )}
                          </Grid>
                        </Grid>
                        <Grid container md={12} xs={12}>
                          <Grid item md={3} xs={3}>
                            <strong>Paid Amount</strong>
                          </Grid>
                          <Grid item md={3} xs={3}>
                            $
                            {
                              this.state.selectedRequest?.reservationId
                                ?.reservation?.amountPaid
                            }
                          </Grid>
                        </Grid>
                        <Grid container md={12} xs={12}>
                          <Grid item md={3} xs={3}>
                            <strong>Remaining Amount</strong>
                          </Grid>
                          <Grid item md={3} xs={3}>
                            $
                            {this.state.selectedRequest?.reservationId?.reservation?.remainingAmount.toFixed(
                              2
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <h4>Items Details</h4>
                      </Grid>
                      {this.state.selectedItems &&
                        this.state.selectedItems.length > 0 &&
                        this.state.selectedItems.map((item, id) => (
                          <Grid key={id} item md={4} xs={4}>
                            <h4>{item.title}</h4>
                            {item.items &&
                              item.items.map((itm) => (
                                <div>
                                  {itm.quantity} {itm.name}{' '}
                                  {console.log(
                                    itm.sizing.reduce(function (p, c) {
                                      p[c.sizing] = (p[c.sizing] || 0) + 1;
                                      return p;
                                    }, {})
                                  )}
                                  {Object.keys(
                                    itm.sizing.reduce(function (p, c) {
                                      p[c.sizing] = (p[c.sizing] || 0) + 1;
                                      return p;
                                    }, {})
                                  ).map((obj) => (
                                    <>
                                      <span style={{ fontWeight: 'bold' }}>
                                        {obj}
                                      </span>
                                      <span>
                                        {' '}
                                        {
                                          itm.sizing.reduce(function (p, c) {
                                            p[c.sizing] =
                                              (p[c.sizing] || 0) + 1;
                                            return p;
                                          }, {})[obj]
                                        }{' '}
                                      </span>
                                    </>
                                  ))}
                                </div>
                              ))}
                          </Grid>
                        ))}
                    </Grid>
                  ) : (
                    <Grid container md={12} spacing={2} xs={12}>
                      <h4>Commercial Customer Information</h4>
                      <Grid container md={12} xs={12}>
                        <Grid item md={3} xs={3}>
                          <strong>Customer Name</strong>
                        </Grid>
                        <Grid item md={3} xs={3}>
                          {
                            this.state.selectedRequest?.commercialCustomerId
                              ?.contactName
                          }
                        </Grid>
                      </Grid>

                      <Grid container md={12} xs={12}>
                        <Grid item md={3} xs={3}>
                          <strong>Business Name</strong>
                        </Grid>
                        <Grid item md={3} xs={3}>
                          {
                            this.state.selectedRequest?.commercialCustomerId
                              ?.businessName
                          }
                        </Grid>
                      </Grid>
                      <Grid container md={12} xs={12}>
                        <Grid item md={3} xs={3}>
                          <strong>Email</strong>
                        </Grid>
                        <Grid item md={3} xs={3}>
                          {
                            this.state.selectedRequest?.commercialCustomerId
                              ?.email
                          }
                        </Grid>
                      </Grid>
                      <Grid container md={12} xs={12}>
                        <Grid item md={3} xs={3}>
                          <strong>Phone</strong>
                        </Grid>
                        <Grid item md={3} xs={3}>
                          {
                            this.state.selectedRequest?.commercialCustomerId
                              ?.phoneNo
                          }
                        </Grid>
                      </Grid>
                      <Grid container md={12} xs={12}>
                        <Grid item md={3} xs={3}>
                          <strong>Time to Contact</strong>
                        </Grid>
                        <Grid item md={3} xs={3}>
                          {
                            this.state.selectedRequest?.commercialCustomerId
                              ?.timeToContact
                          }
                        </Grid>
                      </Grid>
                    </Grid>
                  )}

                  <Grid container md={12} spacing={4} xs={12}>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3} justify="flex-end">
                      <div style={{ width: '100%', textAlign: 'right' }}>
                        <Button
                          onClick={this.handleCloseModal}
                          style={{
                            fontFamily: 'calibri',
                            backgroundColor: '#dddddd'
                          }}>
                          {' '}
                          Close
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          </Fade>
        </Modal>
      </Grid>
    );
  }
}

export default withStyles(styles)(Orders);
