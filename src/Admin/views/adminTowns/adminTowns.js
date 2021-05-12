import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TownTable from '../adminTowns/components/adminTownTable';
import AdminTownModel from './components/adminTownModel';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: 'white',
    height: '155vh'
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Towns = () => {
  const classes = useStyles();
  const [OpenModel, setOpenModel] = React.useState(false);
  const handleAddTown = () => {
    setOpenModel(true);
  };
  const handleClose = () => {
    setOpenModel(false);
  };
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<AddIcon />}
            onClick={handleAddTown}>
            Add New Towns
          </Button>
          <AdminTownModel open={OpenModel} handleClose={handleClose} />
        </div>
        <TownTable />
      </div>
    </div>
  );
};

export default Towns;
