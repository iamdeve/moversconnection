import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { MoverContext } from '../../../../../../contexts/MoverContext';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'KAM',
    avatar: '/images/logos/logotest.png'
  };

  return (
    <MoverContext.Consumer>
      {(context) => {
        return (
          <div {...rest} className={clsx(classes.root, className)}>
            <Avatar
              alt="Person"
              className={classes.avatar}
              component={RouterLink}
              src={user.avatar}
              to="/mover/dashboard"
            />
            <Typography className={classes.name} variant="h4">
              {context?.mover?.email}
            </Typography>
            <Typography variant="body2">{user.bio}</Typography>
          </div>
        );
      }}
    </MoverContext.Consumer>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
