import React, { forwardRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import '../../App.css';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

import { StepperDataContext } from '../../contexts/StepperDataContext';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  Button: {
    background: '#101820FF',
    '&:hover': {
      backgroundColor: '#101820FF',
      color: 'white'
    },
    width: '25vh',
    color: 'white',
    borderRadius: '25px',
    '@media (max-width:800px)': {
      width: '16vh',
      fontSize: '12px'
    }
  },
  logo: {
    // marginTop: '-15vh',
    // '@media (max-width:800px)': {
    //   marginTop: '-8vh',
    // },
    // '@media (max-width:600px)': {
    //   marginTop: '-10vh',
    // },
  },
  Question: {
    color: 'rgb(25, 34, 31)',
    fontSize: '20px',
    fontWeight: 'bold',
    '& a': {
      color: 'rgb(25, 34, 31)',
      '&:hover': {
        textDecoration: 'none'
      }
    },
    '@media (max-width:600px)': {
      fontSize: '12px',
      lineHeight: '14px',
      margin: '0 4vh',
      marginBottom: '1vh'
    }
  },
  LogoImg: {
    width: '250px',
    '@media (max-width:787px)': {
      width: '180px'
    }
  },
  PhoneIcon: {
    display: 'inline-block',
    background: '#3bb5fb',
    color: '#f2e161',
    padding: '.2rem',
    borderRadius: '50%'
  },
  QuestionDispaly: {
    display: 'none'
  },
  TOpMenusIcon: {
    '@media (min-width:787px)': {
      display: 'none'
    },
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    // padding: '1rem',
    color: '#3bb5fb',
    '& button': {
      display: 'flex',
      alignItems: 'end'
    },
    '& svg': {
      fontSize: '2rem'
    }
  },
  TopMenus: {
    width: '100%',
    textAlign: 'right',
    '& li': {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 .5rem',
      fontSize: '16px',
      fontWeight: 'lighter',
      cursor: 'pointer'
    },
    '@media (max-width:787px)': {
      display: 'none'
    }
  },
  DOT: {
    display: 'inline-block',
    // padding: '.4rem',
    // background: '#3bb5fb',
    borderRadius: '50%',
    margin: '0 .4rem',
    lineHeight: '1rem',
    width: '1.5rem',
    height: '1.5rem',
    marginLeft: 0,
    '@media (max-width:787px)': {
      width: '1rem',
      height: '1rem'
    }
  },

  MENU: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 999999999999,
    background: '#2f2c2ced',
    color: '#fff'
  },
  MenuList: {
    padding: '1rem',
    listStyle: 'none',
    textAlign: 'left'
  },
  MenuItem: {
    margin: '1rem 0',
    '& a': {
      color: '#fff',
      fontSize: '26px',
      padding: '1rem'
    }
  },
  Cancel: {
    padding: '1rem',
    textAlign: 'right'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    fontSize: '1.5rem',
    display: 'inline',
    marginLeft: '5px',
    marginRightL: '5px'
  }
}));

const Topbar = (props) => {
  const { t } = useTranslation();
  const SteeperContext = useContext(StepperDataContext);
  const { className, onSidebarOpen } = props;
  const classes = useStyles();

  const [showMenu, setShowMenu] = React.useState(false);
  const {
    navlogo,
    navcolor,
    navtext1,
    navtext2,
    navtext3,
    navtext4,
    spnavtext1,
    spnavtext2,
    spnavtext3,
    spnavtext4
  } = SteeperContext.getAllsettings;

  const [dropstate, setdropstate] = React.useState('');

  console.log(SteeperContext.getAllsettings.navlogo);

  const handleChange = (event) => {
    setdropstate(event.target.value);
    i18next.changeLanguage(event.target.value);
    SteeperContext.handleLanguageChange(event.target.value);
  };
  //drop down
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  // console.log('ali raza jhhgh', dropstate);
  return (
    <div className={classes.root}>
      <Grid container xs={12} style={{ height: '17vh' }}>
        <Grid container xs={12} style={{ marginTop: '2vh' }} align="center">
          <Grid item xs={0} style={{ marginTop: '.8vh' }} />
          <Grid item xs={6} sm={2} lg={2} className={classes.logo}>
            <RouterLink to="/">
              <img
                // src={require('../../assets/logotest.png')}
                src={'https://gt-api.moversconnections.com/api/' + navlogo}
                className={classes.LogoImg}
              />
            </RouterLink>
          </Grid>
          {/* <Grid item xs={0} sm={3} lg={3} /> */}

          <Grid
            container
            xs={6}
            sm={7}
            lg={10}
            align="center"
            style={{ marginTop: '0vh' }}>
            <Grid container xs={12} align="center">
              <ul className={classes.TopMenus}>
                <li>
                  <span
                    className={classes.DOT}
                    style={{ background: navcolor }}></span>
                  <RouterLink
                    style={{
                      fontSize: '1.2rem',
                      textDecoration: 'none',
                      color: '#000'
                    }}
                    to={{ pathname: '/help', page: 'page1' }}>
                    {/* How we work */}
                    {SteeperContext.language === 'spn' ? spnavtext1 : navtext1}
                  </RouterLink>
                </li>
                <li>
                  <span
                    className={classes.DOT}
                    style={{ background: navcolor }}></span>
                  <RouterLink
                    style={{
                      fontSize: '1.2rem',
                      textDecoration: 'none',
                      color: '#000'
                    }}
                    to={{ pathname: '/help', page: 'page2' }}>
                    {/* Be part of out network */}
                    {SteeperContext.language === 'spn' ? spnavtext2 : navtext2}
                  </RouterLink>
                </li>
                <li>
                  <span
                    className={classes.DOT}
                    style={{ background: navcolor }}></span>
                  <RouterLink
                    style={{
                      fontSize: '1.2rem',
                      textDecoration: 'none',
                      color: '#000'
                    }}
                    to={{ pathname: '/help', page: 'page3' }}>
                    {/* Deposit risk free */}
                    {SteeperContext.language === 'spn' ? spnavtext3 : navtext3}
                  </RouterLink>
                </li>
                <li>
                  <span
                    className={classes.DOT}
                    style={{ background: navcolor }}></span>
                  <div>
                    {/* <p style={{
                      fontSize: '1.2rem',
                      textDecoration: 'none',
                      color: '#000', display: "inline"
                    }}>{SteeperContext.language === "spn" ? spnavtext4 : navtext4}</p> */}
                    <FormControl
                      className={[classes.formControl, 'custom-ctr'].join(' ')}>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        className="remove_background_color"
                        style={{
                          fontSize: '1.2rem',
                          backgroundColor: 'transparent'
                        }}
                        defaultValue={SteeperContext.language}
                        onChange={handleChange}>
                        <MenuItem value={'eng'}>English</MenuItem>
                        <MenuItem value={'spn'}>Spanish</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  {/* <RouterLink
                    style={{
                      fontSize: '1.2rem',
                      textDecoration: 'none',
                      color: '#000'
                    }}
                    to={{ pathname: '/help', page: 'page3' }}>
                    Language */}
                  {/* {navtext4} */}
                  {/* </RouterLink> */}
                </li>
              </ul>
              <div className={classes.TOpMenusIcon}>
                <IconButton onClick={() => setShowMenu(!showMenu)}>
                  <MenuIcon style={{ fontSize: '2.5rem', color: '#3bb5fb' }} />
                </IconButton>
                {showMenu && (
                  <div className={classes.MENU}>
                    <div
                      onClick={() => setShowMenu(!showMenu)}
                      className={classes.Cancel}>
                      <CancelIcon />
                    </div>
                    <ul className={classes.MenuList}>
                      <li className={classes.MenuItem}>
                        <span className={classes.DOT}></span>
                        <RouterLink
                          style={{ textDecoration: 'none' }}
                          to={{ pathname: '/help', page: 'page1' }}>
                          {/* How we work */}
                          {SteeperContext.language === 'spn'
                            ? spnavtext1
                            : navtext1}
                        </RouterLink>
                      </li>
                      <li className={classes.MenuItem}>
                        <span className={classes.DOT}></span>
                        <RouterLink
                          style={{ textDecoration: 'none' }}
                          to={{ pathname: '/help', page: 'page2' }}>
                          {/* Be part of out network */}
                          {SteeperContext.language === 'spn'
                            ? spnavtext2
                            : navtext2}
                        </RouterLink>
                      </li>
                      <li className={classes.MenuItem}>
                        <span className={classes.DOT}></span>
                        <RouterLink
                          style={{ textDecoration: 'none' }}
                          to={{ pathname: '/help', page: 'page3' }}>
                          {/* Deposit risk free */}
                          {SteeperContext.language === 'spn'
                            ? spnavtext3
                            : navtext3}
                        </RouterLink>
                      </li>
                      <li className={classes.MenuItem}>
                        <span className={classes.DOT}></span>
                        {/* <RouterLink
                          style={{ textDecoration: 'none' }}
                          to={{ pathname: '/help', page: 'page3' }}>
                        
                          {SteeperContext.language === "spn" ? spnavtext4 : navtext4}
                        </RouterLink> */}
                        <br />
                        <FormControl
                          className={classes.formControl}
                          style={{ marginLeft: '40px' }}>
                          <Select
                            native
                            autoWidth
                            onChange={handleChange}
                            style={{ color: 'white' }}>
                            <option value={'eng'}>English</option>
                            <option value={'spn'}>Spanish</option>
                          </Select>
                        </FormControl>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
