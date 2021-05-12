import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { MoverContext } from '../../../../contexts/MoverContext';
import { BASE_URL } from '../../../../contexts/axios';

import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    avatar: '/images/avatars/avatar_11.png'
  };

  return (
    <MoverContext.Consumer>
      {(context) => (
        <Card {...rest} className={clsx(classes.root, className)}>
          <CardContent>
            <div className={classes.details}>
              <div>
                <Typography gutterBottom variant="h2">
                  {context.mover.companyName}
                </Typography>
                <Typography
                  className={classes.locationText}
                  color="textSecondary"
                  variant="body1">
                  {context.mover.city}
                </Typography>
              </div>
              <Avatar
                className={classes.avatar}
                src={
                  context.profile.profile
                    ? BASE_URL + context.profile.profile
                    : null
                }
              />
            </div>
          </CardContent>
          <Divider />
          <CardActions>
            <input type="file" onChange={context.profileChangeHandler} />
          </CardActions>
        </Card>
      )}
    </MoverContext.Consumer>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
