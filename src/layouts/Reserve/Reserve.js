import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import reservebackground from '../../assets/reservebackground.png';
// import { Sidebar, Topbar, Footer } from './components';

import { TopBarMenu, Footer } from '../../components';
import '../../App.css';
import { StepperDataContext } from '../../contexts/StepperDataContext';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: `url(${reservebackground})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    '@media(max-width: 787px)': {
      overflow: 'scroll',
      backgroundImage: 'none !important',
      background: '#F2E161'
    }
  }
}));

const Reserve = (props) => {
  const { children } = props;
  const SteeperContext = useContext(StepperDataContext);
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;
  const bg =
    SteeperContext.getAllsettings.reserveBgImage &&
    'https://gt-api.moversconnections.com/api/' +
      SteeperContext.getAllsettings.reserveBgImage.split('\\')[0] +
      '/' +
      SteeperContext.getAllsettings.reserveBgImage.split('\\')[1];
  console.log(bg);
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`
      }}
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}>
      <TopBarMenu onSidebarOpen={handleSidebarOpen} />
      <main className={classes.content} style={{}}>
        {children}

        <Footer style={{}} />
      </main>
    </div>
  );
};

Reserve.propTypes = {
  children: PropTypes.node
};

export default Reserve;
