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

import { withStyles } from '@material-ui/styles';
import { ErrorModal } from '../../layouts';
import { MoverContext } from '../../contexts/MoverContext';

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

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

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
class Orders extends React.Component {
  static contextType = MoverContext;
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
    console.log(rowData);
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
    console.log(this.context.reservations);
    this.setState({
      Orders: this.context.reservations
    });
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
          height: '100vh'
        }}>
        {this.context.errorMsg ? (
          <ErrorModal msg={this.context.errorMsg} />
        ) : null}
        {this.context.loader ? (
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
        <Grid item xs={12} md={12}>
          <Card>
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
                  render: (rowData) => <span>{rowData.tableData.id + 1}</span>,
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
                  title: 'Move Type',
                  field: 'jobType',
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'From Location',
                  field: 'reservationId.reservation.from',

                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'Location To',
                  field: 'reservationId.reservation.to',
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                },
                {
                  title: 'Date',
                  // field: 'orderId.totalPrice',
                  render: (rowData) =>
                    rowData.jobType === 'Commercial'
                      ? rowData.orderId && rowData.orderId.date
                        ? getDateTime(rowData.orderId.date)
                        : ''
                      : rowData.reservationId && rowData.reservationId.date
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
                    rowData.jobType === 'Commercial'
                      ? rowData.orderId && rowData.orderId.date
                        ? formatAMPM(new Date(rowData.orderId.time))
                        : ''
                      : rowData.reservationId && rowData.reservationId.time
                      ? formatAMPM(new Date(rowData.reservationId.time))
                      : '',
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
                  title: 'Actions',
                  render: (rowData) => (
                    <>
                      {rowData.status === 'unassigned' && (
                        <>
                          <Button
                            variant="contained"
                            onClick={() =>
                              this.context.acceptJobHandler(rowData._id)
                            }>
                            Accept
                          </Button>
                        </>
                      )}

                      {rowData.status === 'assigned' &&
                        rowData.jobType === 'Residential' &&
                        rowData.reservationId &&
                        new Date().getTime() + 1 * 24 * 60 * 60 * 1000 >
                          Date.parse(new Date(rowData.reservationId.date)) && (
                          <>
                            <Button
                              variant="contained"
                              onClick={() =>
                                this.context.confirmJob(rowData._id)
                              }>
                              Confirm
                            </Button>
                          </>
                        )}
                      {rowData.status === 'assigned' &&
                        rowData.jobType === 'Commercial' &&
                        rowData.orderId &&
                        new Date().getTime() + 1 * 24 * 60 * 60 * 1000 >
                          Date.parse(new Date(rowData.orderId.date)) && (
                          <>
                            <Button
                              variant="contained"
                              onClick={() =>
                                this.context.confirmJob(rowData._id)
                              }>
                              Confirm
                            </Button>
                          </>
                        )}
                      {rowData.status === 'confirmed' && (
                        <>
                          <Button
                            variant="contained"
                            onClick={() => this.handleOpenModal(rowData)}>
                            View
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() =>
                              this.context.markAsComplete(rowData._id)
                            }>
                            Mark as Complete
                          </Button>
                        </>
                      )}
                    </>
                  ),
                  cellStyle: {
                    fontFamily: 'calibri'
                  }
                }
                // {
                //   title: 'Paid By', field: 'paidby',
                //   cellStyle: {
                //     fontFamily: "calibri",
                //   },
                // },
                // {
                //   title: 'Action', field: 'action',
                //   cellStyle: {
                //     fontFamily: "calibri",
                //   },
                // },
              ]}
              data={this.context.reservations}
              options={{
                headerStyle: {
                  backgroundColor: '#dddddd',
                  color: '#black'
                }
              }}
              actions={
                [
                  // (rowData) => ({
                  // icon: Edit,
                  // tooltip: 'Accept Job'
                  // eslint-disable-next-line no-restricted-globals
                  // onClick: (event, rowData) => {
                  //   let newData = [];
                  //   this.state.Orders.map((order) => {
                  //     //console.log(order)
                  //     if (rowData.id == order.id) {
                  //       rowData.stats = 'assigned';
                  //     }
                  //     newData.push(order)
                  //     // console.log(rowData.id)
                  //     //if (order.name != value) newData.push(tableRow);
                  //   });
                  //   this.setState({ Orders: newData })
                  //   //setTableLanguages(newData);
                  // },
                  // onClick: (event, rowData) => {
                  //   this.context.acceptJobHandler(rowData._id);
                  // }
                  // })
                  // rowData => ({
                  //   icon: Delete,
                  //   tooltip: 'Delete User',
                  //   // eslint-disable-next-line no-restricted-globals
                  //   onClick: (event, rowData) => {
                  //     let newData = [];
                  //     this.state.Orders.map((order) => {
                  //       //console.log(order)
                  //       if (rowData.id != order.id) {
                  //         newData.push(order)
                  //       }
                  //       // console.log(rowData.id)
                  //       //if (order.name != value) newData.push(tableRow);
                  //     });
                  //     this.setState({ Orders: newData })
                  //     //setTableLanguages(newData);
                  //   },
                  // })
                ]
              }
              options={{
                actionsColumnIndex: -1,
                // tableLayout: "fixed",
                // paging: false,
                actionsColumnIndex: -1,
                headerStyle: {
                  // backgroundColor: '#dddddd',
                  background: '#3f51b5',
                  // color: '#black'
                  color: '#FFF'
                },
                rowStyle: (x) => {
                  if (x.tableData.id % 2) {
                    return { backgroundColor: '#f2f2f2' };
                  }
                }
              }}
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
                          {this.state.selectedRequest.status === 'assign' && (
                            <>
                              <Grid container md={12} xs={12}>
                                <Grid item md={3} xs={3}>
                                  <strong>Customer Email</strong>
                                </Grid>
                                <Grid item md={3} xs={3}>
                                  {
                                    this.state.selectedRequest?.customerId
                                      ?.email
                                  }
                                </Grid>
                              </Grid>

                              <Grid container md={12} xs={12}>
                                <Grid item md={3} xs={3}>
                                  <strong>Customer Phone</strong>
                                </Grid>
                                <Grid item md={3} xs={3}>
                                  {
                                    this.state.selectedRequest?.customerId
                                      ?.phone
                                  }
                                </Grid>
                              </Grid>
                              <Grid container md={12} xs={12}>
                                <Grid item md={3} xs={3}>
                                  <strong>Customer Address</strong>
                                </Grid>
                                <Grid item md={3} xs={3}>
                                  {
                                    this.state.selectedRequest?.customerId
                                      ?.address
                                  }
                                </Grid>
                              </Grid>
                            </>
                          )}
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
                                    {/* {console.log(
                                    itm.sizing.reduce(function (p, c) {
                                      p[c.sizing] = (p[c.sizing] || 0) + 1;
                                      return p;
                                    }, {})
                                  )} */}
                                    {Object.keys(
                                      itm.sizing.reduce(function (p, c) {
                                        p[c.sizing] = (p[c.sizing] || 0) + 1;
                                        return p;
                                      }, {})
                                    ).map((obj) => (
                                      <>
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
                                        <span style={{ fontWeight: 'bold' }}>
                                          {obj}
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
                        {this.state.selectedRequest.status === 'assign' && (
                          <>
                            <Grid container md={12} xs={12}>
                              <Grid item md={3} xs={3}>
                                <strong>Email</strong>
                              </Grid>
                              <Grid item md={3} xs={3}>
                                {
                                  this.state.selectedRequest
                                    ?.commercialCustomerId?.email
                                }
                              </Grid>
                            </Grid>
                            <Grid container md={12} xs={12}>
                              <Grid item md={3} xs={3}>
                                <strong>Phone</strong>
                              </Grid>
                              <Grid item md={3} xs={3}>
                                {
                                  this.state.selectedRequest
                                    ?.commercialCustomerId?.phoneNo
                                }
                              </Grid>
                            </Grid>
                          </>
                        )}

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
                      <Grid item xs={3}>
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
      </Grid>
    );
  }
}

export default withStyles(styles)(Orders);
