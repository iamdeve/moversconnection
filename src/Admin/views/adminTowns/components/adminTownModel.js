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
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from 'react-places-autocomplete';

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
  const [address, setAddress] = React.useState('');
  const [latLng, setLatLng] = React.useState(null);

  //cpmponent states
  const [townName, settownName] = React.useState('');
  const [townDes, settownDes] = React.useState('');
  const [zone, setzone] = React.useState('0');

  const handleChangeLocation = (address) => {
    console.log(address);
    setAddress(address);
  };

  const handleSelectLocation = (address) => {
    console.log(address);
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(
        (latLng) =>
          setLatLng(latLng) /*console.log('Success', latLng, address)*/
      )
      .catch((error) => console.error('Error', error));
  };

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
    let townData = { address, townDes, latLng, zone };
    try {
      let data = await AdminContext1.handleTownData(townData);
      console.log('Data', data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitUpdate = async () => {
    let id = props.TowneditData._id;
    let UpdateData = { id, address, townDes, latLng, zone };
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
    console.log(props);
    if (props.TowneditData) {
      setOpen(true);
      setAddress(props.TowneditData.name);
      settownDes(props.TowneditData.description);
      setzone(props.TowneditData.zoneId._id);
    }
  }, [props.TowneditData]);

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
              <PlacesAutocomplete
                value={address}
                onChange={handleChangeLocation}
                onSelect={handleSelectLocation}>
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <TextField
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input'
                      })}
                      label="Town Name"
                      // name='address'
                      // onChange={this.context.handleChange}
                      // value={this.context.address}
                      // label='Pickup Address'
                      // multiline
                      // rowsMax={2}
                      style={{
                        paddingBottom: '80px',
                        //   width: "100%",
                        width: '280px',
                        height: '31px'
                      }}
                    />
                    {/* <input
											{...getInputProps({
												placeholder: 'Search Places ...',
												className: 'location-search-input',
											})}
										/> */}
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: '#fafafa',
                              cursor: 'pointer'
                            }
                          : {
                              backgroundColor: '#ffffff',
                              cursor: 'pointer'
                            };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}>
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              {/* <TextField
                className={classes.Input}
                value={townName}
                onChange={(e) => {
                  settownName(e.target.value);
                }}
                id="standard-basic"
                label="Town Name"
              /> */}
            </div>
            {/* <div className={classes.TextInput}>
              <TextField
                className={classes.Input}
                value={townDes}
                onChange={(e) => {
                  settownDes(e.target.value);
                }}
                id="standard-basic"
                label="Town Dsecription"
              />
            </div> */}
            <h6>Select Town Zone</h6>
            <FormControl
              className={classes.formControl}
              style={{
                marginLeft: '5px',
                marginBottom: '50px',
                width: '100%'
              }}>
              <Select native defaultValue={zone} onChange={handleChange}>
                <option value="0">Please Select Zone</option>
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
              disabled={zone === '0'}
              onClick={() => {
                handleSubmitUpdate();
              }}>
              Update
            </Button>
          ) : (
            <Button
              disabled={zone === '0'}
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
