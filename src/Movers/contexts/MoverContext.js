import React, { createContext, Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from './axios';
import Geocode from 'react-geocode';
import jwt_decode from 'jwt-decode';

export const MoverContext = createContext();

class MoverContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signupForm: {
        companyName: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        street: '',
        companyType: ''
      },
      profile: {
        companyName: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        city: '',
        street: '',
        profile: '',
        zone: [],
        companyType: ''
      },
      mover:
        localStorage.getItem('moverToken') !== null
          ? jwt_decode(localStorage.getItem('moverToken'))
          : {},
      loginForm: {
        email: '',
        password: ''
      },
      isAuthenticated:
        localStorage.getItem('moverToken') === null ? false : true,
      zone: [],
      reservations: [],
      zones: [],
      cities: [],
      errorMsg: '',
      showErroModal: true,
      loader: false,
      signupSuccess: ''
    };
  }

  componentDidMount() {
    if (this.state.isAuthenticated) {
      axios
        .get('mover')
        .then((mover) => {
          this.setState({
            mover: mover.data.mover,
            profile: {
              companyName: mover.data.mover.companyName,
              name: mover.data.mover.name,
              email: mover.data.mover.email,
              phone: mover.data.mover.phone,
              profile: mover.data.mover.profile,
              city: mover.data.mover.city,
              street: mover.data.mover.street,
              companyType: mover.data.mover.companyType,
              zone: [...mover.data.mover.zones]
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.getUserJobs();
    }
    this.getCititesData();
  }
  getUserJobs = async () => {
    this.setState({
      loader: true
    });
    try {
      let jobs = await axios.get('/jobs/getMoversJobs');
      if (jobs.status === 200) {
        Geocode.setApiKey('AIzaSyAe-RvE9UpwF-SNkKvlpt4YpjOgDfaUCpQ');
        Geocode.setLanguage('en');
        Geocode.setRegion('pr');
        Geocode.enableDebug();
        if (jobs.data.jobs.length > 0) {
          for (let i = 0; i < jobs.data.jobs.length; i++) {
            if (
              jobs.data.jobs[i].orderId !== null &&
              Object.keys(jobs.data.jobs[i].orderId).length > 0 &&
              jobs.data.jobs[i].orderId.origin.hasOwnProperty('lat')
            ) {
              let responseFrom = await Geocode.fromLatLng(
                jobs.data.jobs[i].orderId.origin.lat,
                jobs.data.jobs[i].orderId.origin.lon
              );

              const addressFrom = responseFrom.results[0].formatted_address;
              // console.log(addressFrom.split(',')[1]);
              jobs.data.jobs[i].from = addressFrom.split(',')[1];

              let responseTo = await Geocode.fromLatLng(
                jobs.data.jobs[i].orderId.destination.lat,
                jobs.data.jobs[i].orderId.destination.lon
              );

              const addressTo = responseTo.results[0].formatted_address;
              // console.log(addressTo.split(',')[1]);
              jobs.data.jobs[i].to = addressTo.split(',')[1];
            }
          }
          let data = jobs.data.jobs.filter((dataItems) => {
            return dataItems.from !== null && dataItems.to !== null;
          });
          this.setState({
            reservations: data,
            loader: false
          });
        } else {
          this.setState({
            reservations: [],
            loader: false
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  acceptJobHandler = async (id) => {
    this.setState({
      loader: true
    });
    console.log(this.state.mover);
    let data = {
      moverId: this.state.mover._id,
      status: 'assigned'
    };

    try {
      let jobsAssignRes = await axios.patch(`/jobs/updateJob/${id}`, data);
      if (jobsAssignRes.status === 200) {
        this.getUserJobs();
        // this.setState({
        //   loader: false
        // });
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        this.setState({
          errorMsg: err.response.data.error,
          loader: false,
          showErroModal: true
        });
      } else if (err.response && err.response.data.message) {
        this.setState({
          errorMsg: err.response.data.message,
          loader: false,
          showErroModal: true
        });
      } else {
        this.setState({
          errorMsg: err.message,
          loader: false,
          showErroModal: true
        });
      }
    }
  };

  handleCloseModal = () => {
    this.setState({
      showErroModal: false
    });
  };

  getCititesData = async () => {
    try {
      let allZones = await axios.get('zone/getAll');

      if (allZones.status === 200) {
        for (let i = 0; i < allZones.data.zones.length; i++) {
          console.log(allZones);
          this.setState({
            zones: allZones.data.zones
          });
          let area = await axios.get(
            `/area/getAreaByZone/${allZones.data.zones[i]._id}`
          );

          if (area.status === 200) {
            console.log(area);
            this.setState((prevState) => {
              return { cities: [...prevState.cities, ...area.data.area] };
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  signupHandleChange = (e) => {
    const { name, value, checked, type } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      signupForm: {
        ...prevState.signupForm,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };
  loginHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      loginForm: {
        ...prevState.loginForm,
        [name]: value
      }
    }));
  };

  handleSignUp = async (autocomplete) => {
    let data = {
      zones: this.state.zone,
      companyName: this.state.signupForm.companyName,
      name: this.state.signupForm.name,
      email: this.state.signupForm.email,
      password: this.state.signupForm.password,
      phone: this.state.signupForm.phone,
      city: this.state.signupForm.city,
      companyType: this.state.signupForm.companyType
    };

    try {
      let signup = await axios.post('mover/signup', data);

      if (signup.status === 200 || signup.status === 201) {
        this.setState((prevState) => {
          return {
            ...prevState,
            signupSuccess: signup.data.message,
            errorMsg: '',
            zone: [],
            signupForm: {
              companyName: '',
              name: '',
              email: '',
              password: '',
              phone: '',
              city: '',
              street: ''
            }
          };
        });
        autocomplete.current
          .getElementsByClassName('MuiAutocomplete-clearIndicator')[0]
          .click();
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data.error) {
        this.setState({
          errorMsg: err.response.data.error,
          loader: false,
          showErroModal: true
        });
      } else if (err.response && err.response.data.message) {
        this.setState({
          errorMsg: err.response.data.message,
          loader: false,
          showErroModal: true
        });
      } else {
        this.setState({
          errorMsg: err.message,
          loader: false,
          showErroModal: true
        });
      }
    }
  };

  handleLogin = async () => {
    let data = {
      email: this.state.loginForm.email,
      password: this.state.loginForm.password
    };

    try {
      let login = await axios.post('mover/login', data);

      if (login.status === 200 || login.status === 201) {
        axios.defaults.headers['authorization'] = login.data.token;
        let mover = await axios.get('mover');
        if (mover.status === 200) {
          this.setState((prevState) => {
            return {
              ...prevState,
              mover: mover.data.mover,
              profile: {
                companyName: mover.data.mover.companyName,
                name: mover.data.mover.name,
                profile: mover.data.mover.profile,
                email: mover.data.mover.email,
                phone: mover.data.mover.phone,
                city: mover.data.mover.city,
                street: mover.data.mover.street,
                companyType: mover.data.mover.companyType,
                zone: [...mover.data.mover.zones]
              },
              errorMsg: '',
              isAuthenticated: true,
              loginForm: {
                email: '',
                password: ''
              }
            };
          });
          localStorage.setItem('moverToken', login.data.token);
          this.getUserJobs();
          this.props.history.push('/mover/dashboard');
        }
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data.error) {
        this.setState({
          errorMsg: err.response.data.error,
          loader: false,
          showErroModal: true
        });
      } else if (err.response && err.response.data.message) {
        this.setState({
          errorMsg: err.response.data.message,
          loader: false,
          showErroModal: true
        });
      } else {
        this.setState({
          errorMsg: err.message,
          loader: false,
          showErroModal: true
        });
      }
    }
  };

  zoneProfileChangeHandler = (zone) => {
    console.log('zone', zone);
    this.setState((prevState) => {
      return { ...prevState, profile: { ...prevState.profile, zone: zone } };
    });
  };
  areaChangeHandler = (zone) => {
    console.log(zone);
    this.setState({
      zone: zone
    });
  };
  typeChangeHandler = (type) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        signupForm: { ...prevState.signupForm, companyType: type }
      };
    });
  };
  typeChangeHandlerProfile = (type) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        profile: { ...prevState.profile, companyType: type }
      };
    });
  };
  handleLogout = () => {
    localStorage.removeItem('moverToken');
    this.setState({
      isAuthenticated: false,
      amdin: {}
    });
    this.props.history.push('/mover/Signin');
  };

  handleProfileChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        profile: {
          ...prevState.profile,
          [name]: value
        }
      };
    });
  };

  profileChangeHandler = (event) => {
    const file = event.target.files[0];
    this.setState((prevState) => {
      return {
        ...prevState,
        profile: {
          ...prevState.profile,
          file
        }
      };
    });
  };
  updateProfile = async () => {
    const formData = new FormData();
    console.log(this.state.profile);
    if (
      this.state.profile.password !== '' &&
      this.state.profile.confirmPassword !== '' &&
      this.state.profile.password !== this.state.profile.confirmPassword
    ) {
      this.setState({
        errorMsg: 'Password Did not match with confirm password'
      });
      return;
    }
    if (this.state.profile.password && this.state.profile.password !== ''
    ){
      formData.append('password', this.state.profile.password);
    }
    
    if(this.state.profile.file && this.state.profile.file !== ''){
      formData.append('profile', this.state.profile.file);
    }

    formData.append('name', this.state.profile.name);
    formData.append('email', this.state.profile.email);
    formData.append('companyName', this.state.profile.companyName);
    formData.append('phone', this.state.profile.phone);
    formData.append('city', this.state.profile.city);
    formData.append('street', this.state.profile.street);
    formData.append('companyType', this.state.profile.companyType);
    formData.append('zones', this.state.profile.zone.map((z) => z._id).join());

    let options = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };

    try {
      let update = await axios.patch('mover', formData, options);
      if (update.status === 200 || update.status === 201) {
        console.log('Updated');
        this.setState((prevState) => {
          return {
            ...prevState,
            errorMsg: '',
            profile: {
              ...prevState.profile,
              password: '',
              confirmPassword: ''
            }
          };
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        errorMsg: err.message
      });
    }
  };

  confirmJob = async (id) => {
      this.setState({
      loader: true
    });
    console.log(this.state.mover);
    let data = {
      moverId: this.state.mover._id,
      status: 'confirmed'
    };

    try {
      let jobsAssignRes = await axios.patch(`/jobs/confirmJob/${id}`, data);
      if (jobsAssignRes.status === 200) {
        this.getUserJobs();
        // this.setState({
        //   loader: false
        // });
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        this.setState({
          errorMsg: err.response.data.error,
          loader: false,
          showErroModal: true
        });
      } else if (err.response && err.response.data.message) {
        this.setState({
          errorMsg: err.response.data.message,
          loader: false,
          showErroModal: true
        });
      } else {
        this.setState({
          errorMsg: err.message,
          loader: false,
          showErroModal: true
        });
      }
    }
  }
  markAsComplete = () => {}

  render() {
    return (
      <MoverContext.Provider
        value={{
          ...this.state,
          signupHandleChange: this.signupHandleChange,
          loginHandleChange: this.loginHandleChange,
          handleSignUp: this.handleSignUp,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          acceptJobHandler: this.acceptJobHandler,
          handleCloseModal: this.handleCloseModal,
          areaChangeHandler: this.areaChangeHandler,
          handleProfileChange: this.handleProfileChange,
          zoneProfileChangeHandler: this.zoneProfileChangeHandler,
          profileChangeHandler: this.profileChangeHandler,
          updateProfile: this.updateProfile,
          typeChangeHandler: this.typeChangeHandler,
          typeChangeHandlerProfile: this.typeChangeHandlerProfile,
          confirmJob: this.confirmJob,
          markAsComplete: this.markAsComplete

        }}>
        {this.props.children}
      </MoverContext.Provider>
    );
  }
}
export default withRouter(MoverContextProvider);
