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

export default function MoreInfoSetting(props) {
  const classes = useStyles();
  const AdminContext1 = useContext(AdminContext);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [moreinfoBGImg, setmoreinfoBGImg] = React.useState("");
  //for english 
  const [moreinfomainheading, setmoreinfomainheading] = React.useState("");
  const [moreinfosubheading, setmoreinfosubheading] = React.useState("");
  //for  spanish 
  const [spmoreinfomainheading, setspmoreinfomainheading] = React.useState("");
  const [spmoreinfosubheading, setspmoreinfosubheading] = React.useState("");

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
      setmoreinfoBGImg(img);
    }
  }
  const handleSubmit = async () => {
    let moreinfodata = { moreinfomainheading, moreinfosubheading, spmoreinfomainheading, spmoreinfosubheading };
    const formData = new FormData();
    formData.append("moreinfoBGImg", moreinfoBGImg)
    formData.append("moreinfodata", JSON.stringify(moreinfodata))
    try {
      let data = await AdminContext1.moreInfoSubmit(formData)
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
        <DialogTitle id="scroll-dialog-title">More Info Page Setting</DialogTitle>
        <DialogContent dividers={'paper'}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <h2>For English</h2>
            <div className={classes.TextInput}>
              <h5>MoreInfo Page Background Image</h5>
              <TextField className={classes.Input} onChange={(e) => onImageChange(e)} type="file" id="logo" label="MoreInfo Page" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.moreinfomainheading} onChange={(e) => { setmoreinfomainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.moreinfosubheading} onChange={(e) => { setmoreinfosubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
            </div>

            <div className={classes.TextInput}>
              <h2>For Spanish</h2>
              <TextField className={classes.Input} defaultValue={settings.spmoreinfomainheading} onChange={(e) => { setspmoreinfomainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} defaultValue={settings.spmoreinfosubheading} onChange={(e) => { setspmoreinfosubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
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
