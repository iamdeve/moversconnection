import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/styles';
import CategoryTable from './CategoryTable';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CategoryModel from './CategoryModel';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: 'white',
    height: '155vh'
  },
  content: {
    marginTop: theme.spacing(2)
  },
  button: {
    marginBottom: theme.spacing(2)
  }
}));

const Items = () => {
  const classes = useStyles();
  const [OpenModel, setOpenModel] = React.useState(false);

  const handleAddCategory = () => {
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
            onClick={handleAddCategory}>
            Add New Category
          </Button>
          <CategoryModel open={OpenModel} handleClose={handleClose} />
        </div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default Items;
