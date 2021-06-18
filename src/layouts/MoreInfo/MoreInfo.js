import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import moreinfo from '../../assets/moreinfo-man-flip.png';
// import { Sidebar, Topbar, Footer } from './components';

import { TopBarMenu, Footer } from '../../components';
import '../../App.css';
import { StepperDataContext } from '../../contexts/StepperDataContext';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: `url(${moreinfo})`,
    height: '100vh',
    backgroundPosition: 'bottom left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '38%',
    // backgroundSize: '45%',
    '@media(max-width: 787px)': {
      overflow: 'scroll',
      backgroundImage: 'none !important',
      background: '#F2E161'
    }
  }
}));

const MoreInfo = (props) => {
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
    SteeperContext.getAllsettings.moreinfoBGImg &&
    'https://gt-api.moversconnections.com/api/' +
      SteeperContext.getAllsettings.moreinfoBGImg.split('\\')[0] +
      '/' +
      SteeperContext.getAllsettings.moreinfoBGImg.split('\\')[1];
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

        <Footer help={true} style={{}} />
      </main>
    </div>
  );
};

MoreInfo.propTypes = {
  children: PropTypes.node
};

export default MoreInfo;
