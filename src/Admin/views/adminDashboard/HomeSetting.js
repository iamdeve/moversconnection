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

export default function HomeSetting(props) {
  const classes = useStyles();
  const AdminContext1 = useContext(AdminContext);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [backgroundImage, setbackgroundImage] = React.useState("");

  // for english language
  const [homemainheading, sethomemainheading] = React.useState("");
  const [homesubheading, sethomesubheading] = React.useState("");
  const [homethirdheading, sethomethirdheading] = React.useState("");
  // for spanish  language
  const [sphomemainheading, setsphomemainheading] = React.useState("");
  const [sphomesubheading, setsphomesubheading] = React.useState("");
  const [sphomethirdheading, setsphomethirdheading] = React.useState("");


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
      setbackgroundImage(img);
    }
  }
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("backgroundImage", backgroundImage);
    formData.append("homemainheading", homemainheading);
    formData.append("homesubheading", homesubheading);
    formData.append("homethirdheading", homethirdheading);
    formData.append("sphomemainheading", sphomemainheading);
    formData.append("sphomesubheading", sphomesubheading);
    formData.append("sphomethirdheading", sphomethirdheading);
    try {
      let data = await AdminContext1.handleHomeSubmit(formData)
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
        <DialogTitle id="scroll-dialog-title">Home Page Setting</DialogTitle>
        <DialogContent dividers={'paper'}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {/* for english  */}
            <h2>For English</h2>
            <div className={classes.TextInput}>
              <h5>HomePage Background Image</h5>
              <TextField className={classes.Input} onChange={(e) => onImageChange(e)} type="file" id="logo" label="Home Page" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.homemainheading} onChange={(e) => { sethomemainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
            </div>

            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.homesubheading} onChange={(e) => { sethomesubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.homethirdheading} onChange={(e) => { sethomethirdheading(e.target.value) }} id="standard-basic" label="Third Heading" />
            </div>
            {/* for spanish  */}
            <div className={classes.TextInput}>
              <h2>For Spanish</h2>
              <TextField className={classes.Input} defaultValue={settings.sphomemainheading} onChange={(e) => { setsphomemainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.sphomesubheading} onChange={(e) => { setsphomesubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.sphomethirdheading} onChange={(e) => { setsphomethirdheading(e.target.value) }} id="standard-basic" label="Third Heading" />
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
