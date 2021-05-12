import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid , Card, CardActions , CardContent, IconButton } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import AccountBalanceIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AdminContext } from '../../context/AdminContext';
import NavbarSetting from './NavbarSetting'
import RserveSetting  from "./ReserveSetting"
import ContactSetting from "./ContactSetting"
import ReviewSetting from "./ReviewSetting"
import HomeSetting from "./HomeSetting"
import CostSetting from "./CostSetting"
import BookNowSetting from "./BookNowSeting"
import HelpSetting from "./HelpSetting"
import MoreInfoSetting from "./MoreInfoSetting"
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: 'white',
  },
  CardContent:{
    display:'flex',
    justifyContent: 'space-between',
    alignItems:'center'
  }
}));

const Dashboard = () => {
  const [openNavbarSetting, setOpenNavbarSetting] = React.useState(false);
  const [OpenHomePageSetting, setOpenHomePageSetting] = React.useState(false);
  const [OpenReservePageSetting, setOpenReservePageSetting] = React.useState(false);
  const [OpenContactPageSetting, setOpenContactPageSetting] = React.useState(false);
  const [OpenReviewPageSetting, setOpenReviewPageSetting] = React.useState(false);
  const [OpenHelpPageSetting, setOpenHelpPageSetting] = React.useState(false);
  const [OpenBookNowPageSetting, setOpenBookNowPageSetting] = React.useState(false);
  const [OpenCostPageSetting, setOpenCostPageSetting] = React.useState(false);
  const [OpenMoreInfoPageSetting, setOpenMoreInfoPageSetting] = React.useState(false);
// navbar dialaog
  const handleClickOpen = () => {
    setOpenNavbarSetting(true);
  };

  const handleClose = () => {
    setOpenNavbarSetting(false);
  };
    // 1 home dialog
    const handleClickOpen1 = () => {
      setOpenHomePageSetting(true);
    };
  
    const handleClose1 = () => {
      setOpenHomePageSetting(false);
    };
  // 2 reserve dialog
  const handleClickOpen2 = () => {
    setOpenReservePageSetting(true);
  };

  const handleClose2 = () => {
    setOpenReservePageSetting(false);
  };
    // 3 More Info dialog
    const handleClickOpen3 = () => {
      setOpenMoreInfoPageSetting(true);
    };
  
    const handleClose3 = () => {
      setOpenMoreInfoPageSetting(false);
    };
     // 4 Review Info dialog
     const handleClickOpen4 = () => {
      setOpenReviewPageSetting(true);
    };
  
    const handleClose4 = () => {
      setOpenReviewPageSetting(false);
    };
              
    // 5 cost  dialog
    const handleClickOpen5 = () => {
      setOpenCostPageSetting(true);
    };
  
    const handleClose5 = () => {
      setOpenCostPageSetting(false);
    };
    // 6 contact  dialog
    const handleClickOpen6 = () => {
      setOpenContactPageSetting(true);
    };
  
    const handleClose6 = () => {
      setOpenContactPageSetting(false);
    };
     // 7 Book Now  dialog
     const handleClickOpen7 = () => {
      setOpenBookNowPageSetting(true);
    };
  
    const handleClose7 = () => {
      setOpenBookNowPageSetting(false);
    };
  
    // 8 Help  dialog
    const handleClickOpen8 = () => {
      setOpenHelpPageSetting(true);
    };
  
    const handleClose8 = () => {
      setOpenHelpPageSetting(false);
    };  
  const classes = useStyles();

  return (
    <AdminContext.Consumer>
      {(context) => {
        return context.isAuthenticated ? (
          <div className={classes.root}>
            {/* <div className="grid">{dialoginfo.map(renderDialog)}</div> */}
            <Grid container spacing={4}>
            <Grid item lg={3} md={3} xl={3} xs={12}>
                <Card className={classes.root}>
                      <CardContent>
                        <div className={classes.CardContent}>
                          <h4>Navbar & Footer Setting </h4>
                          <IconButton onClick={handleClickOpen}><AccountBalanceIcon/></IconButton>
                        </div>
                        <NavbarSetting open={openNavbarSetting} handleClose = {handleClose}/>
                      </CardContent>
                    </Card>
              </Grid>
              <Grid item lg={3} md={3} xl={3} xs={12}>
                <Card className={classes.root}>
                      <CardContent>
                        <div className={classes.CardContent}>
                          <h4>Home Page Setting </h4>
                          <IconButton onClick={handleClickOpen1}><AccountBalanceIcon/></IconButton>
                        </div>
                        <HomeSetting open={OpenHomePageSetting} handleClose = {handleClose1}/>
                      </CardContent>
                    </Card>
              </Grid>

              <Grid item lg={3} md={3} xl={3} xs={12}>
                  <Card className={classes.root}>
                      <CardContent>
                        <div className={classes.CardContent}>
                          <h4>Reserve Page Setting </h4>
                          <IconButton onClick={handleClickOpen2}><AccountBalanceIcon/></IconButton>
                        </div>
                        <RserveSetting open={OpenReservePageSetting} handleClose = {handleClose2}/>
                      </CardContent>
                    </Card>
              </Grid>
              <Grid item lg={3} md={3} xl={3} xs={12}>
                  <Card className={classes.root}>
                      <CardContent>
                        <div className={classes.CardContent}>
                          <h4>More info Page Setting </h4>
                          <IconButton onClick={handleClickOpen3}><AccountBalanceIcon/></IconButton>
                        </div>
                        <MoreInfoSetting open={OpenMoreInfoPageSetting} handleClose = {handleClose3}/>
                      </CardContent>
                    </Card>
              </Grid>
              <Grid item lg={3} md={6} xl={3} xs={12}>
                  <Card className={classes.root}>
                      <CardContent>
                        <div className={classes.CardContent}>
                          <h4>Review Page Setting </h4>
                          <IconButton onClick={handleClickOpen4}><AccountBalanceIcon/></IconButton>
                        </div>
                        <ReviewSetting open={OpenReviewPageSetting} handleClose = {handleClose4}/>
                      </CardContent>
                    </Card>
              </Grid>
              <Grid item lg={3} md={6} xl={3} xs={12}>
                    <Card className={classes.root}>
                      <CardContent>
                        <div className={classes.CardContent}>
                          <h4>Cost Page Setting </h4>
                          <IconButton onClick={handleClickOpen5}><AccountBalanceIcon/></IconButton>
                        </div>
                        <CostSetting open={OpenCostPageSetting} handleClose = {handleClose5}/>
                      </CardContent>
                    </Card>
              </Grid>
              <Grid item lg={3} md={6} xl={3} xs={12}>
                {/* <DeliverymanPayments /> */}
                <Card className={classes.root}>
                      <CardContent>
                        <div className={classes.CardContent}>
                          <h4>Contact Page Setting </h4>
                          <IconButton onClick={handleClickOpen6}><AccountBalanceIcon/></IconButton>
                        </div>
                        <ContactSetting open={OpenContactPageSetting} handleClose = {handleClose6}/>
                      </CardContent>
                    </Card>
              </Grid>
              <Grid item lg={3} md={6} xl={3} xs={12}>
              <Card className={classes.root}>
                      <CardContent>
                        <div className={classes.CardContent}>
                          <h4>Book Now Page Setting </h4>
                          <IconButton onClick={handleClickOpen7}><AccountBalanceIcon/></IconButton>
                        </div>
                        <BookNowSetting open={OpenBookNowPageSetting} handleClose = {handleClose7}/>
                      </CardContent>
                    </Card>
                  </Grid>
              <Grid item item lg={3} md={6} xl={3} xs={12}>
                {/* <PaymentDetails /> */}
                 <Card className={classes.root}>
                      <CardContent>
                        <div className={classes.CardContent}>
                          <h4>Help Pages Setting </h4>
                          <IconButton onClick={handleClickOpen8}><AccountBalanceIcon/></IconButton>
                        </div>
                        <HelpSetting open={OpenHelpPageSetting} handleClose = {handleClose8}/>
                      </CardContent>
                    </Card>
              </Grid>
              <Grid item lg={3} md={6} xl={3} xs={12}>
                {/* <BarChat /> */}
       
              </Grid>
            </Grid>
          </div>
        ) : (
          <Redirect to="/admin/Signin" />
        );
      }}
    </AdminContext.Consumer>
  );
};

export default Dashboard;
