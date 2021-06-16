import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import ContactBackground from '../../assets/Contact.png';

// import { Sidebar, Topbar, Footer } from './components';
import { TopBarMenu, Footer } from '../../components';
import '../../App.css';

import { StepperDataContext } from '../../contexts/StepperDataContext';
const useStyles = makeStyles(() => ({
  root: {
    // backgroundImage: `url(${ContactBackground})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    '@media(max-width: 787px)': {
      overflow: 'scroll',
      backgroundImage: 'none',
      background: '#F2E161'
    }
  }
}));

const Contact = (props) => {
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
  console.log(SteeperContext.getAllsettings.contactBgImage);
  const bgi =
    SteeperContext.getAllsettings.contactBgImage &&
    'https://gt-api.moversconnections.com/api/' +
      SteeperContext.getAllsettings.contactBgImage.split('\\')[0] +
      '/' +
      SteeperContext.getAllsettings.contactBgImage.split('\\')[1];
  return (
    <div
      style={{
        backgroundImage: `url(${bgi})`
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

Contact.propTypes = {
  children: PropTypes.node
};

export default Contact;
