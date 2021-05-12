import React, { createContext, Component } from 'react';
import axios from './axios';
import Geocode from 'react-geocode';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export const AdminContext = createContext();

class AdminContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formType: 'page1',
      AllItems: [],
      AllTowns: [],
      Allzones: [],
      AdminSettings: '',
      isAuthenticated:
        localStorage.getItem('adminToken') === null ? false : true,
      loginError: '',
      admin:
        localStorage.getItem('adminToken') !== null
          ? jwt_decode(localStorage.getItem('adminToken'))
          : {},
      loading: false,
      movers: [],
      commercial: [],
      reservations: []
    };
  }

  componentDidMount() {
    if (this.state.isAuthenticated) {
      this.getData();
    }
    this.getAllSettings();
    this.getAllItems();
    this.getAllTowns();
    this.getAllZones();
    // this.handleItemDelete2();
  }
  // gettAll Settings
  getAllSettings = async () => {
    console.log('ali raza');
    try {
      let { data: adminSettings } = await axios.get('/settings/getAllSettings');
      this.setState({
        AdminSettings: adminSettings[0]
      });
    } catch (err) {
      console.log(err);
    }
  };
  // get all getAllZones
  getAllZones = async () => {
    console.log('all zones');
    try {
      let { data } = await axios.get('/zone/getAll');
      this.setState({
        Allzones: data.zones
      });
    } catch (err) {
      console.log(err);
    }
  };
  // For admin Items
  getAllItems = async () => {
    try {
      let { data } = await axios.get('/getItems/getAll');
      this.setState({
        AllItems: data.items
      });
    } catch (err) {
      console.log(err);
    }
  };
  // for admin towns
  getAllTowns = async () => {
    try {
      let { data } = await axios.get('/area/getAll');
      this.setState({
        AllTowns: data.areas
      });
    } catch (err) {
      console.log(err);
    }
  };

  getData = async () => {
    axios
      .get('/commercial/getAll')
      .then((res) => {
        this.setState({
          commercial: res.data.commercialCustomers
        });
        // console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });

    this.getUserJobs();
    axios
      .get('/mover/getAll')
      .then((res) => {
        this.setState({
          movers: res.data.movers
        });
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getUserJobs = async () => {
    this.setState({
      loading: true
    });
    try {
      let jobs = await axios.get('/jobs/getAll');
      if (jobs.status === 200) {
        Geocode.setApiKey('AIzaSyAe-RvE9UpwF-SNkKvlpt4YpjOgDfaUCpQ');
        Geocode.setLanguage('en');
        Geocode.setRegion('pr');
        Geocode.enableDebug();
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
          loading: false
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  handleLogin = (userData) => {
    const { loginEmail, loginPassword } = userData;
    axios
      .post('/auth/login', { email: loginEmail, password: loginPassword })
      .then((res) => {
        localStorage.setItem('adminToken', res.data.token);
        this.setState({
          isAuthenticated: true,
          admin: jwt_decode(res.data.token)
        });
        this.getUserJobs();
        this.getData();
        // console.log(res)
      })
      .catch((error) => {
        console.log(error.response.data.message);
        this.setState({
          loginError: error.response.data.message
        });
      });
    console.log(userData);
  };

  handleLogout = () => {
    localStorage.removeItem('adminToken');
    this.setState({
      isAuthenticated: false,

      amdin: {}
    });

    this.props.history.push('/admin/Signin');
  };

  approveMover = async (id) => {
    try {
      let approved = await axios.put('/mover/approve/' + id);
      if (approved.status === 200) {
        axios
          .get('/mover/getAll')
          .then((res) => {
            this.setState({
              movers: res.data.movers
            });
            // console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleChangeStatus = async (id) => {
    try {
      let approved = await axios.put('/mover/status/' + id);
      if (approved.status === 200) {
        axios
          .get('/mover/getAll')
          .then((res) => {
            this.setState({
              movers: res.data.movers
            });
            // console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  hadleNavBarSubmit = async (formData) => {
    console.log(formData);
    try {
      const { data } = await axios.post('/navbar/settings', formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  handleReserveSetting = async (formData) => {
    try {
      const { data } = await axios.post('/reserve/reserveSettings', formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  hadleContactSubmit = async (formData) => {
    console.log('Contact Data', formData);
    try {
      const { data } = await axios.post('/contact/contactSettings', formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  hadleBookNowSubmit = async (formData) => {
    try {
      const { data } = await axios.post('/booknow/booknowSettings', formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  moreInfoSubmit = async (formData) => {
    try {
      const { data } = await axios.post('/moreinfo/moreinfoSettings', formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  handleHomeSubmit = async (formData) => {
    console.log('Home   Data', formData);
    try {
      const { data } = await axios.post('/home/homeSettings', formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  hadleHelpSubmit = async (formData) => {
    try {
      const { data } = await axios.post('/help/helpSettings', formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  handleFinalCostSubmit = async (finalcostdata) => {
    console.log('Help  Data', finalcostdata);
    try {
      const { data } = await axios.post('/finalcost/finalcostSettings', {
        finalcostdata
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  hadleReviewSubmit = async (formData) => {
    console.log('Help  Data', formData);
    try {
      const { data } = await axios.post('/review/reviewSettings', formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  handleFormType = (Formtype) => {
    this.setState({
      formType: Formtype
    });
  };
  handleNewItems = async (itemData) => {
    try {
      const { data } = await axios.post('/items/addItem', {
        name: itemData.ItemName,
        cost: itemData.ItemPrice,
        categoryName: itemData.Category
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  handleTownData = async (townData) => {
    console.log('Town Context', townData);
    try {
      const { data } = await axios.post('/area/addArea', {
        name: townData.townName,
        description: townData.townDes,
        zoneId: townData.zone
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  handleItemDelete2 = (id) => {
    console.log('vvvbvbvbvbvbvbvvvvv', id);
    const { data } = axios.delete('delete/deleteItem/' + id);
    console.log(data);
  };
  handleItemDelete = (id) => {
    console.log('bbbbbbbbbbbbbbb', id);
    const { data } = axios.delete('/area/deleteArea/' + id);
  };
  handleUpdataItems = (UpdateData) => {
    console.log(UpdateData);
    let id = UpdateData.id;
    const { data } = axios.put('update/updateItem/' + id, {
      name: UpdateData.ItemName,
      cost: UpdateData.ItemPrice,
      categoryName: UpdateData.Category
    });
    console.log(data);
  };
  handleUpdateTowns = (UpdateData) => {
    console.log('ghghghghgh', UpdateData);
    let id = UpdateData.id;
    const { data } = axios.put('/area/updateArea/' + id, {
      name: UpdateData.townName,
      description: UpdateData.townDes,
      zoneId: UpdateData.zone
    });
    console.log('data', data);
  };
  render() {
    // { console.log(this.state.formType) }
    {
      console.log(this.state.Allzones);
    }
    return (
      <AdminContext.Provider
        value={{
          ...this.state,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          approveMover: this.approveMover,
          handleChangeStatus: this.handleChangeStatus,
          hadleNavBarSubmit: this.hadleNavBarSubmit,
          handleReserveSetting: this.handleReserveSetting,
          hadleContactSubmit: this.hadleContactSubmit,
          hadleBookNowSubmit: this.hadleBookNowSubmit,
          moreInfoSubmit: this.moreInfoSubmit,
          handleHomeSubmit: this.handleHomeSubmit,
          hadleHelpSubmit: this.hadleHelpSubmit,
          handleFinalCostSubmit: this.handleFinalCostSubmit,
          handleFormType: this.handleFormType,
          hadleReviewSubmit: this.hadleReviewSubmit,
          handleNewItems: this.handleNewItems,
          handleItemDelete2: this.handleItemDelete2,
          handleUpdataItems: this.handleUpdataItems,
          handleTownData: this.handleTownData,
          handleUpdateTowns: this.handleUpdateTowns,
          handleItemDelete: this.handleItemDelete
        }}>
        {this.props.children}
      </AdminContext.Provider>
    );
  }
}
export default withRouter(AdminContextProvider);
