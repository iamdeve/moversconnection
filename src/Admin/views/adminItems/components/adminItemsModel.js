// import React from 'react';
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

export default function AdminItemsModel(props) {
  const classes = useStyles();
  const AdminContext1 = useContext(AdminContext);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  //cpmponent states
  const [Category,setCategory]=React.useState("LivingRoom");
  const [ItemName,setItemName]=React.useState("");
  const [ItemPrice,setItemPrice]=React.useState("");
  
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    let category = event.target.value;
    setCategory(category);
  };


  const handleSubmit = async () => {
      let itemData= {ItemName,ItemPrice,Category};
 try{
 let {data}=await AdminContext1.handleNewItems(itemData);
 console.log("Data",data);
 }catch(err){
 console.log(err);
 }
    }

    const handleSubmitUpdate = async () => {
let id=props.editData._id;
let UpdateData={id,ItemName,ItemPrice,Category} 
// console.log(id);
try{
  let {data}=await AdminContext1.handleUpdataItems(UpdateData);
  console.log("Data",data);
  }catch(err){
  console.log(err);
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
  React.useEffect(()=> {
    if(props.editData){
      setOpen(true)
      setCategory(props.editData.categoryName)
      setItemName(props.editData.name)
      setItemPrice(props.editData.cost)
    }
  }, [props.editData])
  
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {/* Add New Items */}
          {!props.editData ? "Add New Items":"Edit Item"}
          </DialogTitle>
        <DialogContent dividers={'paper'}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className={classes.TextInput}>
              <TextField className={classes.Input} value={ItemName}  onChange={(e) => { setItemName(e.target.value) }} id="standard-basic" label="Item Name" />
            </div>
            <div className={classes.TextInput}>
              <TextField className={classes.Input} value={ItemPrice} onChange={(e) => { setItemPrice(e.target.value) }} id="standard-basic" label="Item Price" />
            </div>
            <h6>Select Item Category</h6>
            <FormControl className={classes.formControl} style={{ marginLeft: "5px" }}>
                <Select
                  native
                  onChange={handleChange}
                  defaultValue={Category}
                >
                  <option value={"Living Room"}>Living Room</option>
          <option value={"Bed Room"}>Bed Rooms</option>
          <option value={"Dining Room"}>Dining Rooms</option>
          <option value={"Kitchen"}>Kitchen</option>
          <option value={"Miscellaneous"}>MIscelleaneous</option>
                </Select>
              </FormControl>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          {props.editData ? (
             <Button onClick={() => { handleSubmitUpdate() }} color="primary">
             Updte
           </Button>
          ) : (
            <Button onClick={() => { handleSubmit() }} color="primary">
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
