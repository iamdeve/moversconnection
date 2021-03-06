import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/admin/Dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Residential',
      href: '/admin/Residential',
      icon: <DashboardIcon />
    },
    {
      title: 'Commercial',
      href: '/admin/Commercial',
      icon: <DashboardIcon />
    },
    {
      title: 'Movers',
      href: '/admin/Stores',
      icon: <DashboardIcon />
    },

    // , commericial, mover
    {
      title: 'Requests',
      href: '/admin/Orders',
      icon: <DashboardIcon />
    },
    //ab
    // {
    //   title: 'Category',
    //   href: '/admin/category',
    //   icon: <DashboardIcon />
    // },
    {
      title: 'Items',
      href: '/admin/Items',
      icon: <DashboardIcon />
    },
    // ab
    {
      title: 'Towns',
      href: '/admin/Towns',
      icon: <DashboardIcon />
    }
    // {
    //   title: 'Category',
    //   href: '/admin/Category',
    //   icon: <ImageIcon />
    // },
    // {
    //   title: 'Deliveries',
    //   href: '/admin/Deliveries',
    //   icon: <ImageIcon />
    // },
    // {
    //   title: 'Vehical',
    //   href: '/admin/Vehical',
    //   icon: <ImageIcon />
    // },

    // {
    //   title: 'Account',
    //   href: '/admin/Account',
    //   icon: <AccountBoxIcon />
    // },
    // {
    //   title: 'Settings',
    //   href: '/admin/Settings',
    //   icon: <SettingsIcon />
    // }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}>
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
        <UpgradePlan />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
