import React, { useEffect, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { AdminContext } from "../../context/AdminContext"


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: 'white',
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

export default function CostSetting(props) {
  const classes = useStyles();
  const AdminContext1 = useContext(AdminContext);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  // for english
  const [finalcostmainheading, setfinalcostmainheading] = React.useState("");
  const [finalcostsubheading, setfinalcostsubheading] = React.useState("");
  const [finalcostthirdheading, setfinalcostthirdheading] = React.useState("");
  const [finalcostfourthheading, setfinalcostfourthheading] = React.useState("");
  const [finalcostfifthheading, setfinalcostfifthheading] = React.useState("");
  const [finalcostsixthheading, setfinalcostsixthheading] = React.useState("");

  // for spanish
  const [spfinalcostmainheading, setspfinalcostmainheading] = React.useState("");
  const [spfinalcostsubheading, setspfinalcostsubheading] = React.useState("");
  const [spfinalcostthirdheading, setspfinalcostthirdheading] = React.useState("");
  const [spfinalcostfourthheading, setspfinalcostfourthheading] = React.useState("");
  const [spfinalcostfifthheading, setspfinalcostfifthheading] = React.useState("");
  const [spfinalcostsixthheading, setspfinalcostsixthheading] = React.useState("");


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {

    try {
      let finalcostdata = {
        finalcostmainheading, finalcostsubheading, finalcostthirdheading, finalcostfourthheading, finalcostfifthheading, finalcostsixthheading,
        spfinalcostmainheading, spfinalcostsubheading, spfinalcostthirdheading, spfinalcostfourthheading, spfinalcostfifthheading, spfinalcostsixthheading
      }
      let data = await AdminContext1.handleFinalCostSubmit(finalcostdata)
      console.log(data);
    }
    catch (err) {
      console.log(err)
    }

  }


  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  let settings = AdminContext1.AdminSettings;
  console.log(settings)
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Cost Page Setting</DialogTitle>
        <DialogContent dividers={'paper'}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className={classes.TextInput}>
              <h2>For English</h2>
              <TextField className={classes.Input} defaultValue={settings.finalcostmainheading} onChange={(e) => { setfinalcostmainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.finalcostsubheading} onChange={(e) => { setfinalcostsubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.finalcostthirdheading} onChange={(e) => { setfinalcostthirdheading(e.target.value) }} id="standard-basic" label="3rd Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.finalcostfourthheading} onChange={(e) => { setfinalcostfourthheading(e.target.value) }} id="standard-basic" label="4th Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.finalcostfifthheading} onChange={(e) => { setfinalcostfifthheading(e.target.value) }} id="standard-basic" label="5th Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.finalcostsixthheading} onChange={(e) => { setfinalcostsixthheading(e.target.value) }} id="standard-basic" label="6th Heading" />
            </div>
            <div className={classes.TextInput}>
              <h2>For Spanish</h2>
              <TextField className={classes.Input} defaultValue={settings.spfinalcostmainheading} onChange={(e) => { setspfinalcostmainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.spfinalcostsubheading} onChange={(e) => { setspfinalcostsubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.spfinalcostthirdheading} onChange={(e) => { setspfinalcostthirdheading(e.target.value) }} id="standard-basic" label="3rd Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.spfinalcostfourthheading} onChange={(e) => { setspfinalcostfourthheading(e.target.value) }} id="standard-basic" label="4th Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.spfinalcostfifthheading} onChange={(e) => { setspfinalcostfifthheading(e.target.value) }} id="standard-basic" label="5th Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.spfinalcostsixthheading} onChange={(e) => { setspfinalcostsixthheading(e.target.value) }} id="standard-basic" label="6th Heading" />
            </div>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleSubmit() }} color="primary">
            Submit
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
