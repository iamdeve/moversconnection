import React, { useEffect, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';
import { AdminContext } from "../../context/AdminContext"
import { Grid } from '@material-ui/core';
import context from 'react-bootstrap/esm/AccordionContext';



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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function HelpSetting(props) {
  const classes = useStyles();
  const AdminContext1 = useContext(AdminContext);
  const [open, setopen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [pagestate, setpagestate] = React.useState("page1");
  const [Bg1Image, set1BgImage] = React.useState("");
  const [Bg2Image, set2BgImage] = React.useState("");
  const [Bg3Image, set3BgImage] = React.useState("");
  // for english 
  const [helpmainheading, sethelpmainheading] = React.useState("");
  const [helpsubheading, sethelpsubheading] = React.useState("");
  const [helpthirdheading, sethelpthirdheading] = React.useState("");
  const [helpfourthheading, sethelpfourthheading] = React.useState("");
  const [helpfifthheading, sethelpfifthheading] = React.useState("");
  const [helpsixthheading, sethelpsixthheading] = React.useState("");
  const [helpseventhheading, sethelpseventhheading] = React.useState("");
  const [helpeighthheading, sethelpeighthheading] = React.useState("");
  const [helpnineheading, sethelpnineheading] = React.useState("");
  const [helptenheading, sethelptenheading] = React.useState("");
  const [helpelevenheading, sethelpelevenheading] = React.useState("");
  // for spanish 
  const [sphelpmainheading, setsphelpmainheading] = React.useState("");
  const [sphelpsubheading, setsphelpsubheading] = React.useState("");
  const [sphelpthirdheading, setsphelpthirdheading] = React.useState("");
  const [sphelpfourthheading, setsphelpfourthheading] = React.useState("");
  const [sphelpfifthheading, setsphelpfifthheading] = React.useState("");
  const [sphelpsixthheading, setsphelpsixthheading] = React.useState("");
  const [sphelpseventhheading, setsphelpseventhheading] = React.useState("");
  const [sphelpeighthheading, setsphelpeighthheading] = React.useState("");
  const [sphelpnineheading, setsphelpnineheading] = React.useState("");
  const [sphelptenheading, setsphelptenheading] = React.useState("");
  const [sphelpelevenheading, setsphelpelevenheading] = React.useState("");

  const handleClickOpen = (scrollType) => () => {
    setopen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setopen(false);
  };
  const onImageChange3 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      set3BgImage(img);
    }
  }
  const onImageChange1 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      set1BgImage(img);
    }
  }
  const onImageChange2 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      set2BgImage(img);
    }
  }
  const handleSubmit = async (e) => {
    let helpdata = {
      helpmainheading, helpsubheading, helpthirdheading, helpfourthheading,
      helpfifthheading, helpsixthheading, helpseventhheading, helpeighthheading,
      helpnineheading, helptenheading, helpelevenheading,
      sphelpmainheading, sphelpsubheading, sphelpthirdheading, sphelpfourthheading,
      sphelpfifthheading, sphelpsixthheading, sphelpseventhheading, sphelpeighthheading,
      sphelpnineheading, sphelptenheading, sphelpelevenheading,
    }
    let pagetype = AdminContext1.formType;
    console.log(pagetype)
    const formData = new FormData();
    formData.append("help1BgImage", Bg1Image);
    formData.append("help2BgImage", Bg2Image);
    formData.append("help3BgImage", Bg3Image);
    formData.append("pagetype", JSON.stringify(pagetype));
    formData.append("helpdata", JSON.stringify(helpdata));
    try {

      let data = await AdminContext1.hadleHelpSubmit(formData)
      console.log(data);
      console.log(open)
    }
    catch (err) {
      console.log(err)
    }

  }
  const handleChange = (event) => {
    let page = event.target.value;
    setpagestate(page);
    AdminContext1.handleFormType(page);
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
  // console.log("yameen ", AdminContext1.formType)
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
        <DialogTitle id="scroll-dialog-title">Help Page Setting</DialogTitle>
        <DialogContent dividers={'paper'}>
          <div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <FormControl className={classes.formControl} style={{ marginLeft: "5px" }}>
                <Select
                  native
                  onChange={handleChange}
                >
                  <option value={"page1"}>Page1</option>
                  <option value={"page2"}>page2</option>
                  <option value={"page3"}>Page3</option>
                </Select>
              </FormControl>
            </Grid>
          </div>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {AdminContext1.formType === "page3" && <>
              <h2>For English</h2>
              <h5>Deposit risk free</h5>
              <div className={classes.TextInput}>
                <h5>Help Page Background Image</h5>
                <TextField className={classes.Input} onChange={(e) => onImageChange3(e)} type="file" id="logo" label="Standard" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.helpmainheading} onChange={(e) => { sethelpmainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.helpsubheading} onChange={(e) => { sethelpsubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.helpthirdheading} onChange={(e) => { sethelpthirdheading(e.target.value) }} id="standard-basic" label="3rd Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.helpfourthheading} onChange={(e) => { sethelpfourthheading(e.target.value) }} id="standard-basic" label="4th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.helpfifthheading} onChange={(e) => { sethelpfifthheading(e.target.value) }} id="standard-basic" label="5th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.helpsixthheading} onChange={(e) => { sethelpsixthheading(e.target.value) }} id="standard-basic" label="6th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.helpseventhheading} onChange={(e) => { sethelpseventhheading(e.target.value) }} id="standard-basic" label="7th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.helpeighthheading} onChange={(e) => { sethelpeighthheading(e.target.value) }} id="standard-basic" label="8th Heading" />
              </div>
              <h2>For Spanish</h2>
              <div className={classes.TextInput}>
                <h5>Deposit risk free</h5>
                <TextField className={classes.Input} defaultValue={settings.sphelpmainheading} onChange={(e) => { setsphelpmainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphelpsubheading} onChange={(e) => { setsphelpsubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphelpthirdheading} onChange={(e) => { setsphelpthirdheading(e.target.value) }} id="standard-basic" label="3rd Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphelpfourthheading} onChange={(e) => { setsphelpfourthheading(e.target.value) }} id="standard-basic" label="4th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphelpfifthheading} onChange={(e) => { setsphelpfifthheading(e.target.value) }} id="standard-basic" label="5th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphelpsixthheading} onChange={(e) => { setsphelpsixthheading(e.target.value) }} id="standard-basic" label="6th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphelpseventhheading} onChange={(e) => { setsphelpseventhheading(e.target.value) }} id="standard-basic" label="7th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphelpeighthheading} onChange={(e) => { setsphelpeighthheading(e.target.value) }} id="standard-basic" label="8th Heading" />
              </div>
            </>
            }
            {AdminContext1.formType === "page1" && <>
              <h2>For English</h2>
              <h5>How We Work</h5>
              <div className={classes.TextInput}>
                <h5>Help Page Background Image</h5>
                <h6>Left Image</h6>
                <TextField className={classes.Input} onChange={(e) => onImageChange1(e)} type="file" id="logo" label="Standard" />
              </div>
              <div className={classes.TextInput}>
                <h6>Right Image</h6>
                <TextField className={classes.Input} onChange={(e) => onImageChange2(e)} type="file" id="logo" label="Standard" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.howhelpmainheading} onChange={(e) => { sethelpmainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.howhelpsubheading} onChange={(e) => { sethelpsubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.howhelpthirdheading} onChange={(e) => { sethelpthirdheading(e.target.value) }} id="standard-basic" label="3rd Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.howhelpfourthheading} onChange={(e) => { sethelpfourthheading(e.target.value) }} id="standard-basic" label="4th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.howhelpfifthheading} onChange={(e) => { sethelpfifthheading(e.target.value) }} id="standard-basic" label="5th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.howhelpsixthheading} onChange={(e) => { sethelpsixthheading(e.target.value) }} id="standard-basic" label="6th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.howhelpseventhheading} onChange={(e) => { sethelpseventhheading(e.target.value) }} id="standard-basic" label="7th Heading" />
              </div>
              <h2>For Spanish</h2>
              <div className={classes.TextInput}>
                <h5>How We Work</h5>
                <TextField className={classes.Input} defaultValue={settings.sphowhelpmainheading} onChange={(e) => { setsphelpmainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphowhelpsubheading} onChange={(e) => { setsphelpsubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphowhelpthirdheading} onChange={(e) => { setsphelpthirdheading(e.target.value) }} id="standard-basic" label="3rd Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphowhelpfourthheading} onChange={(e) => { setsphelpfourthheading(e.target.value) }} id="standard-basic" label="4th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphowhelpfifthheading} onChange={(e) => { setsphelpfifthheading(e.target.value) }} id="standard-basic" label="5th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphowhelpsixthheading} onChange={(e) => { setsphelpsixthheading(e.target.value) }} id="standard-basic" label="6th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.sphowhelpseventhheading} onChange={(e) => { setsphelpseventhheading(e.target.value) }} id="standard-basic" label="7th Heading" />
              </div>
            </>
            }

            {AdminContext1.formType === "page2" && <>
              <h2>For English</h2>
              <div className={classes.TextInput}>
                <h5>Be part of out network</h5>
                <TextField className={classes.Input} defaultValue={settings.bePartHelpMainHed} onChange={(e) => { sethelpmainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.bePartHelpSubHed} onChange={(e) => { sethelpsubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.bePartHelpThirdHed} onChange={(e) => { sethelpthirdheading(e.target.value) }} id="standard-basic" label="3rd Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.bePartHelpFourthHed} onChange={(e) => { sethelpfourthheading(e.target.value) }} id="standard-basic" label="4th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.bePartHelpFifthHed} onChange={(e) => { sethelpfifthheading(e.target.value) }} id="standard-basic" label="5th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.bePartHelpSixthHed} onChange={(e) => { sethelpsixthheading(e.target.value) }} id="standard-basic" label="6th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.bePartHelpSeventhHed} onChange={(e) => { sethelpseventhheading(e.target.value) }} id="standard-basic" label="7th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.bePartHelpEightHed} onChange={(e) => { sethelpeighthheading(e.target.value) }} id="standard-basic" label="8th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.bePartHelpNineHed} onChange={(e) => { sethelpnineheading(e.target.value) }} id="standard-basic" label="9th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.bePartHelpTenHed} onChange={(e) => { sethelptenheading(e.target.value) }} id="standard-basic" label="10th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.bePartHelpElevenHed} onChange={(e) => { sethelpelevenheading(e.target.value) }} id="standard-basic" label="11th Heading" />
              </div>
              <h2>For Spanish</h2>
              <div className={classes.TextInput}>
                <h5>Be part of out network</h5>
                <TextField className={classes.Input} defaultValue={settings.spbePartHelpMainHed} onChange={(e) => { setsphelpmainheading(e.target.value) }} id="standard-basic" label="Main Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.spbePartHelpSubHed} onChange={(e) => { setsphelpsubheading(e.target.value) }} id="standard-basic" label="Sub Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.spbePartHelpThirdHed} onChange={(e) => { setsphelpthirdheading(e.target.value) }} id="standard-basic" label="3rd Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.spbePartHelpFourthHed} onChange={(e) => { setsphelpfourthheading(e.target.value) }} id="standard-basic" label="4th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.spbePartHelpFifthHed} onChange={(e) => { setsphelpfifthheading(e.target.value) }} id="standard-basic" label="5th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.spbePartHelpSixthHed} onChange={(e) => { setsphelpsixthheading(e.target.value) }} id="standard-basic" label="6th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.spbePartHelpSeventhHed} onChange={(e) => { setsphelpseventhheading(e.target.value) }} id="standard-basic" label="7th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.spbePartHelpEightHed} onChange={(e) => { setsphelpeighthheading(e.target.value) }} id="standard-basic" label="8th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.spbePartHelpNineHed} onChange={(e) => { setsphelpnineheading(e.target.value) }} id="standard-basic" label="9th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.spbePartHelpTenHed} onChange={(e) => { setsphelptenheading(e.target.value) }} id="standard-basic" label="10th Heading" />
              </div>
              <div className={classes.TextInput}>
                <TextField className={classes.Input} defaultValue={settings.spbePartHelpElevenHed} onChange={(e) => { setsphelpelevenheading(e.target.value) }} id="standard-basic" label="11th Heading" />
              </div>
            </>
            }
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
    </div >
  );
}
