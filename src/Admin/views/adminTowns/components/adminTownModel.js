import React, { useEffect, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { AdminContext } from './../../../context/AdminContext';
import Towns from './../adminTowns';

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

export default function AdminTownModel(props) {
  const classes = useStyles();
  const AdminContext1 = useContext(AdminContext);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  //cpmponent states
  const [townName, settownName] = React.useState('');
  const [townDes, settownDes] = React.useState('');
  const [zone, setzone] = React.useState('');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    let Towncategory = event.target.value;
    setzone(Towncategory);
  };

  const handleSubmit = async () => {
    let townData = { townName, townDes, zone };
    try {
      let data = await AdminContext1.handleTownData(townData);
      console.log('Data', data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitUpdate = async () => {
    let id = props.TowneditData._id;
    let UpdateData = { id, townName, townDes, zone };
    console.log(id);
    try {
      let data = await AdminContext1.handleUpdateTowns(UpdateData);
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
    if (props.TowneditData) {
      setOpen(true);
      settownName(props.TowneditData.name);
      settownDes(props.TowneditData.description);
      setzone(props.TowneditData.zoneId.name);
    }
  }, [props.TowneditData]);
  // console.log("hassan",townName,townDes,zone)
  console.log(zone);
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">
          {!props.TowneditData ? 'Add New Towns' : 'Edit Towns'}
        </DialogTitle>
        <DialogContent dividers={'paper'}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}>
            <div className={classes.TextInput}>
              <TextField
                className={classes.Input}
                value={townName}
                onChange={(e) => {
                  settownName(e.target.value);
                }}
                id="standard-basic"
                label="Town Name"
              />
            </div>
            <div className={classes.TextInput}>
              <TextField
                className={classes.Input}
                value={townDes}
                onChange={(e) => {
                  settownDes(e.target.value);
                }}
                id="standard-basic"
                label="Town Dsecription"
              />
            </div>
            <h6>Select Town Category</h6>
            <FormControl
              className={classes.formControl}
              style={{ marginLeft: '5px', marginBottom: '50px' }}>
              <Select native onChange={handleChange}>
                {AdminContext1.Allzones.map((zone, id) => {
                  return (
                    <option value={zone._id} key={id}>
                      {zone.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          {props.TowneditData ? (
            <Button
              color="primary"
              onClick={() => {
                handleSubmitUpdate();
              }}>
              Update
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
