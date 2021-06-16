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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import { AdminContext } from './../../../context/AdminContext';

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
  },
  SizePriceList: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

export default function AdminItemsModel(props) {
  const classes = useStyles();
  const AdminContext1 = useContext(AdminContext);
  const [open, setOpen] = React.useState(false);

  //cpmponent states
  const [Category, setCategory] = React.useState('');
  const [ItemName, setItemName] = React.useState('');
  const [specificationMessage, setSM] = React.useState('');
  const [sizeAndPrice, setSizeAndPrice] = React.useState('price');
  const [price, setPrice] = React.useState('');
  const [sizeAndPriceList, setSizeAndPrizeList] = React.useState([]);

  const addSizeHandle = () => {
    setSizeAndPrizeList((prevState) => {
      let newArr = [];
      let data = {
        sizing: '',
        price: ''
      };
      newArr.push(data);
      return [...prevState, ...newArr];
    });
  };

  const handleChange = (event) => {
    let category = event.target.value;
    setCategory(category);
  };

  const handleSubmit = async () => {
    let itemData = {
      ItemName,
      specificationMessage,
      Category,
      sizeAndPriceList,
      price
    };
    try {
      let returnValue = await AdminContext1.handleNewItems(itemData);
      if (returnValue) {
        setPrice('');
        setSM('');
        setSizeAndPrice('price');
        setSizeAndPrizeList([]);
        props.handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitUpdate = async () => {
    let id = props.editData._id;
    let UpdateData = {
      id,
      ItemName,
      specificationMessage,
      Category,
      sizeAndPriceList,
      price
    };
    // console.log(id);
    try {
      let returnValue = await AdminContext1.handleUpdataItems(UpdateData);
      if (returnValue) {
        open(false);
      }
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
      // setPrice('');
      // setSM('');
      // setSizeAndPrice('price');
      // setSizeAndPrizeList([]);
    }
  }, [open]);
  React.useEffect(() => {
    if (props.editData) {
      setOpen(true);
      setSM(props.editData.specificationMessage);
      setCategory(props.editData.categoryId._id);
      setItemName(props.editData.name);
      if (props.editData.sizing && props.editData.sizing.length > 0) {
        setSizeAndPrice('size');
        setSizeAndPrizeList(props.editData.sizing);
      } else {
        setSizeAndPrice('price');
        setPrice(props.editData.price);
      }
    }
  }, [props.editData]);

  const handleSizePriceRadioChange = (e) => {
    let value = e.target.value;
    if (value === 'size') {
      setSizeAndPrice(value);
      setSizeAndPrizeList((prevState) => {
        let newArr = [];
        let data = {
          sizing: '',
          price: ''
        };
        newArr.push(data);
        return [...newArr];
      });
    } else {
      setSizeAndPrice(value);
      setSizeAndPrizeList([]);
    }
  };

  const removeSizeHandle = (id) => {
    setSizeAndPrizeList((prevList) => {
      let newArr = prevList.filter((list, i) => i !== id);
      return [...newArr];
    });
  };

  const handlePrizeAndSizeListChange = (e, i) => {
    const { name, value } = e.target;
    setSizeAndPrizeList((prevList) => {
      let newArr = prevList.map((list, id) => {
        if (id === i) {
          return {
            ...list,
            [name]: value
          };
        } else {
          return list;
        }
      });

      return [...newArr];
    });
  };
  console.log(sizeAndPriceList);
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
          {!props.editData ? 'Add New Items' : 'Edit Item'}
        </DialogTitle>
        <DialogContent style={{ minWidth: '600px' }} dividers={'paper'}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}>
            {AdminContext1.itemAddErrorMsg && (
              <p>{AdminContext1.itemAddErrorMsg}</p>
            )}
            <div className={classes.TextInput}>
              <TextField
                className={classes.Input}
                value={ItemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
                id="standard-basic"
                label="Item Name"
              />
            </div>
            <div className={classes.TextInput}>
              <TextField
                className={classes.Input}
                value={specificationMessage}
                multiline
                onChange={(e) => {
                  setSM(e.target.value);
                }}
                id="standard-basic"
                label="Specification Message"
              />
            </div>
            <div className={classes.TextInput}>
              <h6>Select Item Category</h6>
              <FormControl
                className={classes.formControl}
                style={{ marginLeft: '5px', width: '100%' }}>
                <Select
                  style={{}}
                  native
                  onChange={handleChange}
                  value={Category}
                  defaultValue={Category}>
                  <option value="0">Select Category</option>
                  {AdminContext1.categories.length > 0 &&
                    AdminContext1.categories.map((cat) => {
                      return <option value={cat._id}>{cat.name}</option>;
                    })}
                  {/* <option value={'Living Room'}>Living Room</option>
                <option value={'Bed Room'}>Bed Rooms</option>
                <option value={'Dining Room'}>Dining Rooms</option>
                <option value={'Kitchen'}>Kitchen</option>
                <option value={'Miscellaneous'}>MIscelleaneous</option> */}
                </Select>
              </FormControl>
            </div>
            <div className={classes.TextInput}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Sizing and Pricing</FormLabel>
                <RadioGroup
                  aria-label="sizeAndPrice"
                  name="sizeAndPrice"
                  value={sizeAndPrice}
                  onChange={handleSizePriceRadioChange}>
                  <FormControlLabel
                    value="price"
                    control={<Radio />}
                    label="Price"
                  />
                  <FormControlLabel
                    value="size"
                    control={<Radio />}
                    label="Size and Price"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            {sizeAndPrice === 'price' ? (
              <div className={classes.TextInput}>
                <TextField
                  className={classes.Input}
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  id="standard-basic"
                  label="Price"
                />
              </div>
            ) : (
              <div className={classes.TextInput}>
                <div>
                  <Button onClick={addSizeHandle} variant="contained">
                    Add Size
                  </Button>
                </div>
                <div className={classes.ListWrapper}>
                  {sizeAndPriceList &&
                    sizeAndPriceList.length > 0 &&
                    sizeAndPriceList.map((item, id) => {
                      return (
                        <div key={id} className={classes.SizePriceList}>
                          <div className={classes.TextInput}>
                            <TextField
                              className={classes.Input}
                              value={item.size}
                              onChange={(e) => {
                                handlePrizeAndSizeListChange(e, id);
                              }}
                              name="sizing"
                              id="standard-basic"
                              label="Size"
                            />
                          </div>
                          <div className={classes.TextInput}>
                            <TextField
                              className={classes.Input}
                              value={item.price}
                              onChange={(e) => {
                                handlePrizeAndSizeListChange(e, id);
                              }}
                              name="price"
                              id="standard-basic"
                              label="Price"
                            />
                          </div>
                          <div>
                            <Button
                              onClick={() => removeSizeHandle(id)}
                              color="primary"
                              variant="contained">
                              Remove
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
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
          <Button
            onClick={() => {
              setPrice('');
              setSM('');
              setSizeAndPrice('price');
              setSizeAndPrizeList([]);
              props.handleClose();
            }}
            color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
