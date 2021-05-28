// import React from 'react';
import React, { useEffect, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { AdminContext } from '../../context/AdminContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: 'white'
  },
  CardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  TextInput: {
    margin: '1rem 0'
  },
  Input: {
    width: '100%'
  }
}));

export default function CategoryModel(props) {
  const classes = useStyles();
  const AdminContext1 = useContext(AdminContext);
  const [open, setOpen] = React.useState(false);

  const [categoryName, setCategoryName] = React.useState('');

  const handleSubmit = async () => {
    let data = { name: categoryName };
    try {
      let addResponse = await AdminContext1.handleNewCategory(data);
      console.log('Data', addResponse);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitUpdate = async () => {
    let id = props.editData._id;
    let UpdateData = { id, categoryName };
    // console.log(id);
    try {
      let { data } = await AdminContext1.handleUpdataCategory(UpdateData);
      console.log('Data', data);
    } catch (err) {
      console.log(err);
    }
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  React.useEffect(() => {
    if (props.editData) {
      setOpen(true);
      setCategoryName(props.editData.name);
    }
  }, [props.editData]);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">
          {/* Add New Items */}
          {!props.editData ? 'Add New Category' : 'Edit Category'}
        </DialogTitle>
        <DialogContent dividers={'paper'}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}>
            <div className={classes.TextInput}>
              <TextField
                className={classes.Input}
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
                id="standard-basic"
                label="Category Name"
              />
            </div>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          {props.editData ? (
            <Button
              onClick={() => {
                handleSubmitUpdate();
              }}
              color="primary">
              Updte
            </Button>
          ) : (
            <Button
              onClick={() => {
                handleSubmit();
              }}
              color="primary">
              Submit
            </Button>
          )}
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
