import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from 'react-places-autocomplete';
import { MoverContext } from '../../../../contexts/MoverContext';

const useStyles = makeStyles(() => ({
  root: {},
  Autocomplete: {
    color: 'white'
  },
  inputColor: {
    color: 'white',
    fontWeight: 'bold'
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
}));

const AccountDetails = (props) => {
  const context = useContext(MoverContext)
  const autocomplete = React.useRef(null);
  const { className, ...rest } = props;

  const classes = useStyles();

  const [city, setCity] = React.useState(context.profile.city);
  const [latLng, setLatLng] = React.useState(null);

  const handleChangeLocation = (address) => {
    console.log(address);
    setCity(address);
  };

  const handleSelectLocation = (city) => {
    console.log(city);
    setCity(city);
    context.cityProfileChangeHandler(city)
    geocodeByAddress(city)
      .then((results) => getLatLng(results[0]))
      .then(
        (latLng) =>
          setLatLng(latLng) /*console.log('Success', latLng, address)*/
      )
      .catch((error) => console.error('Error', error));
  };


  return (
    // <MoverContext.Consumer>
    //   {(context) => {
    //     return (
          <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  {context.errorMsg && (
                    <div
                      style={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        color: 'red'
                      }}>
                      {context.errorMsg}
                    </div>
                  )}
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    margin="dense"
                    name="name"
                    onChange={context.handleProfileChange}
                    required
                    value={context.profile.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    margin="dense"
                    name="companyName"
                    onChange={context.handleProfileChange}
                    required
                    value={context.profile.companyName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    margin="dense"
                    name="email"
                    onChange={context.handleProfileChange}
                    required
                    value={context.profile.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    margin="dense"
                    name="phone"
                    onChange={context.handleProfileChange}
                    type="number"
                    value={context.profile.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  {/* <TextField
                    fullWidth
                    label="City"
                    margin="dense"
                    name="city"
                    onChange={context.handleProfileChange}
                    required
                    value={context.profile.city}
                    variant="outlined"
                  /> */}
                      <PlacesAutocomplete
                        className={classes.textField}
                        
                value={city}
                onChange={handleChangeLocation}
                onSelect={handleSelectLocation}>
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div  className={classes.textField}>
                    <TextField
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input'
                      })}
                      style={{width:'100%'}}
                      label="City"
                      style={{
                        //   width: "100%",
                        width: '100%',
                      }}
                      variant="outlined"
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

                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    margin="dense"
                    name="address"
                    onChange={context.handleProfileChange}
                    required
                    value={context.profile.address}
                    variant="outlined"
                  />
                </Grid>
              
                <Grid item md={6} xs={12}>
                  <TextField
                    type="password"
                    fullWidth
                    label="Password"
                    margin="dense"
                    name="password"
                    onChange={context.handleProfileChange}
                    required
                    value={context.profile.password}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    type="password"
                    fullWidth
                    label="Confirm Password"
                    margin="dense"
                    name="confirmPassword"
                    onChange={context.handleProfileChange}
                    required
                    value={context.profile.confirmPassword}
                    variant="outlined"
                  />
                </Grid>

                <Grid className={classes.content} item lg={12} xs={12}>
            
                </Grid>
                {/* {context.profile.zone.length > 0 && (
                  <Grid className={classes.content} item lg={12} xs={12}>
                    <Autocomplete
                      ref={autocomplete}
                      multiple={true}
                      className={classes.Autocomplete}
                      inputStyle={{ color: 'white' }}
                      align="left"
                      InputProps={{
                        className: classes.inputColor
                      }}
                      id="combo-box-demofff"
                      options={context.zones}
                      getOptionLabel={(option) => (option ? option.name : '')}
                      defaultValue={context.zones.filter((a) =>
                        context.profile.zone.some((b) => a._id === b._id)
                      )}
                      openOnFocus={true}
                      onChange={(e, value) => {
                        console.log(e, value);
                        context.zoneProfileChangeHandler(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          value={context.profile.zone}
                          required
                          inputProps={{
                            classes: {
                              input: classes.resize,
                              root: classes.label,
                              focused: classes.focusedLabel,
                              error: classes.erroredLabel
                            }
                          }}
                          {...params}
                          label="Zones"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                )} */}

                {context.profile.zone.length > 0 && (
                  <Grid className={classes.content} item lg={12} xs={12}>
                    <Autocomplete
                      className={classes.Autocomplete}
                      inputStyle={{ color: 'white' }}
                      align="left"
                      InputProps={{
                        className: classes.inputColor
                      }}
                      id="combo-box-demofff"
                      options={['Residential', 'Commercial', 'Both']}
                      getOptionLabel={(option) => (option ? option : '')}
                      defaultValue={context.profile.companyType}
                      openOnFocus={true}
                      onChange={(e, value) => {
                        console.log(e, value);
                        context.typeChangeHandlerProfile(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          // value={context.zone}
                          required
                          inputProps={{
                            classes: {
                              input: classes.resize,
                              root: classes.label,
                              focused: classes.focusedLabel,
                              error: classes.erroredLabel
                            }
                          }}
                          {...params}
                          label="Company Type"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                onClick={context.updateProfile}
                color="primary"
                variant="contained">
                Save details
              </Button>
            </CardActions>
          </Card>
    //     );
    //   }}
    // </MoverContext.Consumer>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
