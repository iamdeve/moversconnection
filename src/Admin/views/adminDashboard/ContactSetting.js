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

export default function ContactSetting(props) {
  const classes = useStyles();
  const AdminContext1 = useContext(AdminContext);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [BgImage, setBgImage] = React.useState("");
  // for english 
  const [contactmainheading, setcontactmainheading] = React.useState("");
  const [contactsubheading, setcontactsubheading] = React.useState("");
  // for spanish 
  const [spcontactmainheading, setspcontactmainheading] = React.useState("");
  const [spcontactsubheading, setspcontactsubheading] = React.useState("");


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setBgImage(img);
    }
  }
  const handleSubmit = async (e) => {
    let contactdata = { contactmainheading, contactsubheading, spcontactmainheading, spcontactsubheading }
    const formData = new FormData();
    formData.append("BgImage", BgImage);
    formData.append('contactdata', JSON.stringify(contactdata));

    try {
      let data = await AdminContext1.hadleContactSubmit(formData)
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
        <DialogTitle id="scroll-dialog-title">Contact Page Setting</DialogTitle>
        <DialogContent dividers={'paper'}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <h2>For English</h2>
            <div className={classes.TextInput}>
              <h5>Contact Page Background Image</h5>
              <TextField className={classes.Input} onChange={(e) => onImageChange(e)} type="file" id="logo" label="Standard" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.contactmainheading} onChange={(e) => { setcontactmainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.contactsubheading} onChange={(e) => { setcontactsubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
            </div>
            <div className={classes.TextInput}>
              <h2>For Spanish</h2>
              <TextField className={classes.Input} defaultValue={settings.spcontactmainheading} onChange={(e) => { setspcontactmainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.spcontactsubheading} onChange={(e) => { setspcontactsubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
            </div>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => { handleSubmit(e) }} color="primary">
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
