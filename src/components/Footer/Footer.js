import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';
import 'antd/dist/antd.css';

import { Widget } from 'react-chat-widget';
import PhoneIcon from '@material-ui/icons/Phone';
import 'react-chat-widget/lib/styles.css';
import '../../App.css';

import { StepperDataContext } from './../../contexts/StepperDataContext';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    '@media (max-width:600px)': {
      position: 'relative'
    }
  },
  Question: {
    padding: '1rem 0',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    '@media (max-width:600px)': {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height: 'auto'
    }
  },
  pQuestion: {
    color: 'rgb(25, 34, 31)',
    fontSize: '26px',
    fontWeight: 'bold',
    '& a': {
      color: 'rgb(25, 34, 31)',
      '&:hover': {
        textDecoration: 'none'
      }
    },
    '@media (max-width:600px)': {
      fontSize: '16px',
      lineHeight: '14px',
      margin: '0 4vh',
      marginBottom: '1vh'
    }
  },
  PhoneIcon: {
    display: 'inline-block',
    // background: '#3bb5fb',
    color: '#fff',
    padding: '.2rem',
    borderRadius: '50%',
    '& svg': {
      fontSize: '2.5rem'
    },
    '@media(max-width: 787px)': {
      '& svg': {
        fontSize: '1.5rem'
      }
    }
  },
  MS: {
    '@media (max-width:600px)': {
      display: 'none'
    }
  }
}));

const Footer = props => {
  const SteeperContext = useContext(StepperDataContext);

  const { className, help, ...rest } = props;

  const classes = useStyles();
  const { footericoncolor, footertext1, spfootertext1 } = SteeperContext.getAllsettings;
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={[classes.Question, help ? classes.MS : ''].join(' ')}>
        <Typography className={classes.pQuestion}>
          <span className={classes.PhoneIcon} style={{ background: footericoncolor }}>
            <PhoneIcon />
          </span>{' '}
          <a href="tel:+17879558832">
            {/* Questions? Call us at 787-955-8832 */}
            {SteeperContext.language === "spn" ? spfootertext1 : footertext1}
          </a>
        </Typography>
      </div>
      <Widget
        launcherCloseLabel="Chat with us"
        title="Welcome"
        subtitle="Ask us anything"
      />
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
