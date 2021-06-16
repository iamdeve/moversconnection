import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

// import { Topbar, Footer } from './components';
import { TopBarMenu, Footer } from '../../components';
import backgroundMinimal from '../../assets/backgroundminimal.png';
import { StepperDataContext } from '../../contexts/StepperDataContext';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    backgroundImage: `url(${backgroundMinimal})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    '@media(max-width: 787px)': {
      overflow: 'scroll',
      backgroundImage: 'none',
      background: '#F2E161'
    }
  },
  content: {
    // height: '100%',
    '@media (max-width:787px)': {
      height: 'auto'
    }
  }
}));

const BookNow = (props) => {
  const { children } = props;
  const SteeperContext = useContext(StepperDataContext);
  const classes = useStyles();
  const bg =
    SteeperContext.getAllsettings.bookBgImage &&
    'https://gt-api.moversconnections.com/api/' +
      SteeperContext.getAllsettings.bookBgImage.split('\\')[0] +
      '/' +
      SteeperContext.getAllsettings.bookBgImage.split('\\')[1];
  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: `url(${bg})`
      }}>
      <TopBarMenu />
      <main className={classes.content}>{children}</main>
      <Footer />
    </div>
  );
};

BookNow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default BookNow;
