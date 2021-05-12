// import React from 'react';
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

export default function NavbarSetting(props) {
  const classes = useStyles();
  const AdminContext1 = useContext(AdminContext);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  // for english 
  const [navlogo, setnavlogo] = React.useState("");
  const [navcolor, setnavcolor] = React.useState("");
  const [navtext1, setnavtext1] = React.useState("");
  const [navtext2, setnavtext2] = React.useState("");
  const [navtext3, setnavtext3] = React.useState("");
  const [navtext4, setnavtext4] = React.useState("");

  const [footericoncolor, setfootericoncolor] = React.useState("");
  const [footertext1, setfootertext1] = React.useState("");

  // for spanish 
  const [spnavtext1, setspnavtext1] = React.useState("");
  const [spnavtext2, setspnavtext2] = React.useState("");
  const [spnavtext3, setspnavtext3] = React.useState("");
  const [spnavtext4, setspnavtext4] = React.useState("");


  const [spfootertext1, setspfootertext1] = React.useState("");

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
      setnavlogo(img);
    }
  }
  const handleSubmit = async () => {
    console.log(navlogo, navtext1, navtext2, navtext3, navtext4, footericoncolor, footertext1)
    const formData = new FormData();
    // for english 
    formData.append("navlogo", navlogo);
    formData.append("navcolor", navcolor);
    formData.append("navtext1", navtext1);
    formData.append("navtext2", navtext2);
    formData.append("navtext3", navtext3);
    formData.append("navtext4", navtext4);
    formData.append("footericoncolor", footericoncolor);
    formData.append("footertext1", footertext1);
    // for spanish 

    formData.append("spnavtext1", spnavtext1);
    formData.append("spnavtext2", spnavtext2);
    formData.append("spnavtext3", spnavtext3);
    formData.append("spnavtext4", spnavtext4);
    formData.append("spfootertext1", spfootertext1);
    try {
      let data = await AdminContext1.hadleNavBarSubmit(formData)
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
        <DialogTitle id="scroll-dialog-title">Navbar Setting</DialogTitle>
        <DialogContent dividers={'paper'}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {/* for english  */}
            <div>
              <h2>For English</h2>
            </div>
            <div className={classes.TextInput}>
              <h3>Navbar</h3>
              <TextField className={classes.Input} onChange={(e) => onImageChange(e)} type="file" id="logo" label="Standard" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.navcolor} type="color" onChange={(e) => { setnavcolor(e.target.value) }} id="iconcolors" label="Change Color" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.navtext1} onChange={(e) => { setnavtext1(e.target.value) }} id="standard-basic" label="Navbar Text 1" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.navtext2} onChange={(e) => { setnavtext2(e.target.value) }} id="standard-basic" label="Navbar Text 2" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.navtext3} onChange={(e) => { setnavtext3(e.target.value) }} id="standard-basic" label="Navbar Text 3" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.navtext4} onChange={(e) => { setnavtext4(e.target.value) }} id="standard-basic" label="Navbar Text 4" />
            </div>
            <div className={classes.TextInput}>
              <h3>Footer</h3>
              <TextField className={classes.Input} defaultValue={settings.footericoncolor} type="color" onChange={(e) => { setfootericoncolor(e.target.value) }} id="iconcolors" label="Change Color" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.footertext1} onChange={(e) => { setfootertext1(e.target.value) }} id="standard-basic" label="Footer Text 1" />
            </div>
            {/* for Spanish  */}
            <div>
              <h2>For Spanish</h2>
            </div>
            <div className={classes.TextInput}>
              <h3>Navbar</h3>
              <TextField className={classes.Input} defaultValue={settings.spnavtext1} onChange={(e) => { setspnavtext1(e.target.value) }} id="standard-basic" label="Navbar Text 1" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.spnavtext2} onChange={(e) => { setspnavtext2(e.target.value) }} id="standard-basic" label="Navbar Text 2" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.spnavtext3} onChange={(e) => { setspnavtext3(e.target.value) }} id="standard-basic" label="Navbar Text 3" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.spnavtext4} onChange={(e) => { setspnavtext4(e.target.value) }} id="standard-basic" label="Navbar Text 4" />
            </div>
            <div className={classes.TextInput}>
              <h3>Footer</h3>
              <TextField className={classes.Input} defaultValue={settings.spfootertext1} onChange={(e) => { setspfootertext1(e.target.value) }} id="standard-basic" label="Footer Text 1" />
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
