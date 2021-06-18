import React, { createContext, Component } from 'react';
import { withRouter } from 'react-router-dom';
import Geocode from 'react-geocode';
import axios from './axios';

export const StepperDataContext = createContext();

class StepperDataContextProvider extends Component {
  state = {
    getAllsettings: '',
    language: 'eng',
    loader: false,
    showErroModal: false,
    errorMsg: '',
    OpenTvStand: false,
    nameTvStand: '',
    shareholders: [{ name: '' }],

    finalStepForm: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      cardNumber: '',
      expiry: '',
      expiry_month: '',
      expiry_year: '',
      cvc: ''
    },

    cities: [],
    livingRoom: '',
    diningRoom: '',
    bedRoom: '',
    misc: '',
    kitchen: '',
    itemsValid: true,

    customerId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerBussinessName: '',
    customerBusinessPhone: '',

    from: '',
    to: '',
    fromLatitude: '',
    fromLongitude: '',
    toLatitude: '',
    toLongitude: '',
    date: new Date(),
    time: new Date(),
    orderId: '',

    totalPrice: 0,

    bookNowFrom: '',
    bookNowTo: '',
    bookNowdate: '',

    moveFrom: '',
    moveFromElevator: false,
    moveToElevator: false,
    moveTo: '',
    loadingDock: '',
    doorRemoval: '',

    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactBusinessName: '',
    contactDate: new Date(),

    specificationMessagae: '',

    title: 'TV',

    openModel: false,
    openModelDining: false,
    openModelBedroom: false,
    openModelKitchen: false,
    openModelMiscellaneous: false,
    categories: [],
    allItems: [],

    Quantity: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 }
    ],
  };

  disableLoader = () => {
    this.setState({
      loader: false
    });
  };

  handleCheckDetailsItems = () => {
    let checked = [];
    for (let i = 0; i < Object.keys(this.state.details).length; i++) {
      let item = Object.keys(this.state.details)[i];
      // console.log(this.state.details[item]);
      if (this.state.details[item].length > 0) {
        checked.push(true);
      } else {
        checked.push(false);
      }
    }
    // console.log(checked);
    return checked.filter((check) => check === true).length > 0 ? false : true;
  };
  handleOpen = (item, sm, selected, list) => {
    if (selected) {
      this.setState((prevState) => {
        let newArr = prevState[list].map((l, id) => {
          if (l.item === item) {
            return { ...l, isSelected: false };
          } else {
            return { ...l };
          }
        });
        return {
          ...prevState,
          [list]: [...newArr],
          itemsValid: this.handleCheckDetailsItems(),
          details: { ...prevState.details, [item]: [] }
        };
      });
    } else {
      this.setState({
        openModel: true,
        title: item,
        specificationMessagae: sm
      });
    }
  };
  handleCloseDining = () => {
    this.setState({ openModelDining: !this.state.openModelDining });
  };

  handleOpenDining = (item, sm, selected, list) => {
    if (selected) {
      this.setState((prevState) => {
        let newArr = prevState[list].map((l, id) => {
          if (l.item === item) {
            return { ...l, isSelected: false };
          } else {
            return { ...l };
          }
        });
        return {
          ...prevState,
          [list]: [...newArr],
          itemsValid: this.handleCheckDetailsItems(),
          details: { ...prevState.details, [item]: [] }
        };
      });
    } else {
      this.setState({
        openModelDining: true,
        title: item,
        specificationMessagae: sm
      });
    }
  };
  handleClose = () => {
    this.setState({ openModel: !this.state.openModel });
  };

  handleOpenBedroom = (item, sm, selected, list) => {
    if (selected) {
      this.setState((prevState) => {
        let newArr = prevState[list].map((l, id) => {
          if (l.item === item) {
            return { ...l, isSelected: false };
          } else {
            return { ...l };
          }
        });
        return {
          ...prevState,
          [list]: [...newArr],
          itemsValid: this.handleCheckDetailsItems(),
          details: { ...prevState.details, [item]: [] }
        };
      });
    } else {
      this.setState({
        openModelBedroom: true,
        title: item,
        specificationMessagae: sm
      });
    }
  };
  handleCloseBedroom = () => {
    this.setState({ openModelBedroom: !this.state.openModelBedroom });
  };

  handleOpenMiscellaneous = (item, sm, selected, list) => {
    // console.log(this.state.openModelMiscellaneous, this.state.title, item, sm)
    if (selected) {
      this.setState((prevState) => {
        let newArr = prevState[list].map((l, id) => {
          if (l.item === item) {
            return { ...l, isSelected: false };
          } else {
            return { ...l };
          }
        });
        return {
          ...prevState,
          [list]: [...newArr],
          itemsValid: this.handleCheckDetailsItems(),
          details: { ...prevState.details, [item]: [] }
        };
      });
    } else {
      this.setState({
        openModelMiscellaneous: true,
        title: item,
        specificationMessagae: sm
      });
    }
    // console.log(this.state.openModelMiscellaneous, this.state.title)
  };
  handleCloseMiscellaneous = () => {
    this.setState({
      openModelMiscellaneous: !this.state.openModelMiscellaneous
    });
  };
  handleOpenKitchen = (item, sm, selected, list) => {
    if (selected) {
      this.setState((prevState) => {
        let newArr = prevState[list].map((l, id) => {
          if (l.item === item) {
            return { ...l, isSelected: false };
          } else {
            return { ...l };
          }
        });
        return {
          ...prevState,
          [list]: [...newArr],
          itemsValid: this.handleCheckDetailsItems(),
          details: { ...prevState.details, [item]: [] }
        };
      });
    } else {
      this.setState({
        openModelKitchen: true,
        title: item,
        specificationMessagae: sm
      });
    }
  };
  handleCloseKitchen = () => {
    this.setState({
      openModelKitchen: !this.state.openModelKitchen
    });
  };
  handleShareholderName = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, nameTvStand: evt.target.value };
    });
    this.setState({ shareholders: newShareholders });
  };
  handleChangeSelect = (title, newQuantity) => {
    // console.log(newQuantity);
    let newArray = [];
    if (title === 'Gym_Equipment' && typeof newQuantity === 'string') {
      newArray.push({ id: 0, sizing: newQuantity });
      if (this.search(this.state.ListOfMiscellaneous).find) {
        this.setState((prevState) => {
          let updatedDetails = [...prevState.ListOfMiscellaneous];
          updatedDetails[this.search(this.state.ListOfMiscellaneous).index] = {
            isSelected: true,
            item: title
          };
          return {
            ...prevState,
            ListOfMiscellaneous: updatedDetails
          };
        });
      }
    } else {
      for (let i = 0; i < newQuantity; i++) {
        newArray.push({ id: i, sizing: 0 });
      }
    }
    // console.log(newArray);
    var { details } = this.state;
    details[title] = newArray;
    this.setState({ details: details }, () => {
      // console.log(this.state.details);
    });
  };
  handleSubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      openModel: false,
      openModelDining: false,
      openModelBedroom: false,
      openModelKitchen: false,
      openModelMiscellaneous: false
    });
    // console.log(this.state.details)
    const { nameTvStand, shareholders } = this.state;
  };

  bedRoomChangeHandler = (e) => {
    this.setState({
      bedRoom: e.target.value
    });
  };

  diningRoomChangeHandler = (e) => {
    this.setState({
      diningRoom: e.target.value
    });
  };

  livingRoomChangeHandler = (e) => {
    this.setState({
      livingRoom: e.target.value
    });
  };

  miscChangeHandler = (e) => {
    this.setState({
      misc: e.target.value
    });
  };

  kitchenChangeHandler = (e) => {
    this.setState({
      kitchen: e.target.value
    });
  };

  search(arr) {
    // console.log(arr)
    for (let i = 0; i < arr.length; i++) {
      // console.log(arr[i] ,this.state.title)
      if (arr[i].item === this.state.title) {
        return { find: true, index: i };
      }
    }
    return { find: false };
  }
  changeSizeHandler = (sizing, id, price) => {
    if (typeof sizing === 'object') {
      sizing = sizing.target.value;
    }
    const title = this.state.title;
    if (price === undefined) {
      price = this.state.Prices[title];
    }
    console.log(title, sizing, price);
    if (this.search(this.state.ListOfLivingRoom).find) {
      // console.log(this.state.ListOfLivingRoom[this.search(this.state.ListOfLivingRoom).index])
      let i = this.state.ListOfLivingRoom[this.search(this.state.ListOfLivingRoom).index]
      this.setState((prevState) => {
        let updatedDetails = [...prevState.ListOfLivingRoom];
        updatedDetails[this.search(this.state.ListOfLivingRoom).index] = {
          ...i,
          isSelected: true,
          item: title
          
        };
        return {
          ...prevState,
          ListOfLivingRoom: updatedDetails
        };
      });
    } else if (this.search(this.state.ListOfDiningRoom).find) {
      this.setState((prevState) => {
        let updatedDetails = [...prevState.ListOfDiningRoom];
        let i = this.state.ListOfDiningRoom[this.search(this.state.ListOfDiningRoom).index]
        updatedDetails[this.search(this.state.ListOfDiningRoom).index] = {
          ...i,
          isSelected: true,
          item: title
        };
        return {
          ...prevState,
          ListOfDiningRoom: updatedDetails
        };
      });
    } else if (this.search(this.state.ListOfBedrooms).find) {
      this.setState((prevState) => {
        let updatedDetails = [...prevState.ListOfBedrooms];
        let i = this.state.ListOfBedrooms[this.search(this.state.ListOfBedrooms).index]
      
        updatedDetails[this.search(this.state.ListOfBedrooms).index] = {
          ...i,
          isSelected: true,
          item: title
        };
        return {
          ...prevState,
          ListOfBedrooms: updatedDetails
        };
      });
    } else if (this.search(this.state.ListOfKitchen).find) {
      this.setState((prevState) => {
        let updatedDetails = [...prevState.ListOfKitchen];
        let i = this.state.ListOfKitchen[this.search(this.state.ListOfKitchen).index]
      
        updatedDetails[this.search(this.state.ListOfKitchen).index] = {
          ...i,
          isSelected: true,
          item: title
        };
        return {
          ...prevState,
          ListOfKitchen: updatedDetails
        };
      });
    } else if (this.search(this.state.ListOfMiscellaneous).find) {
      this.setState((prevState) => {
        let updatedDetails = [...prevState.ListOfMiscellaneous];
        let i = this.state.ListOfMiscellaneous[this.search(this.state.ListOfMiscellaneous).index]
        updatedDetails[this.search(this.state.ListOfMiscellaneous).index] = {
          ...i,
          isSelected: true,
          item: title
        };
        return {
          ...prevState,
          ListOfMiscellaneous: updatedDetails
        };
      });
    }
    for (let i in this.state.details[title]) {
      if (this.state.details[title][i].id === id) {
        this.setState((prevState) => {
          // console.log([...prevState.details[title]])
          let updatedDetails = [...prevState.details[title]];
          updatedDetails[id] = {
            id: id,
            sizing: sizing,
            price:
              price && price.length > 0
                ? price.filter((item) => item.size === sizing)[0].price
                : price
          };
          return {
            ...prevState,
            itemsValid: false,
            details: { ...prevState.details, [title]: updatedDetails }
          };
        });
      }
    }
    console.log(this.state.details);
  };

  reserveChangeHandlerFrom = (from) => {
    this.setState({
      from: from
    });
  };
  reserveChangeHandlerTo = (to) => {
    this.setState({
      to: to
    });
  };
  reserveChangeHandlerDate = (date) => {
    this.setState({
      date: date
    });
  };

  bookNowChangeHandlerFrom = (from) => {
    this.setState({
      bookNowFrom: from
    });
  };
  bookNowChangeHandlerTo = (to) => {
    this.setState({
      bookNowTo: to
    });
  };
  bookNowChangeHandlerDate = (date) => {
    this.setState({
      bookNowDate: date
    });
  };

  lastDetailsMovingFromHandler = (from) => {
    this.setState({
      moveFrom: from
    });
  };
  lastDetailsMovingToHandler = (to) => {
    this.setState({
      moveTo: to
    });
  };
  lastDetailsLoadingDockHandler = (doc) => {
    this.setState({
      loadingDock: doc
    });
  };
  lastDetailsDoorRemovingHandler = (door) => {
    this.setState({
      doorRemoval: door
    });
  };
  lastDetaislMovingFromElevatorHandler = () => {
    this.setState((prevState) => {
      return { moveFromElevator: !prevState.moveFromElevator };
    });
  };
  lastDetaislMovingToElevatorHandler = () => {
    this.setState((prevState) => {
      return { moveToElevator: !prevState.moveToElevator };
    });
  };
  customerDetailsHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  customerPhoneHandler = (value) => {
    var reg = new RegExp(/^(?=.*\d)[\d ]+$/);

    console.log(reg.test(value));
    if (!reg.test(value)) {
      return;
    }
    let formatedValue = value;
    if (formatedValue.length === 3) {
      formatedValue = formatedValue + ' ';
    }
    if (formatedValue.length === 7) {
      formatedValue = formatedValue + ' ';
    }

    if (value.length === 13) {
      return;
    }

    this.setState({
      customerPhone: value,
      customerPhoneFormated: formatedValue
    });
  };
  handleNextEvent = async (moreInfoLink, contact) => {
    this.setState({
      loader: true
    });
    // // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    // Geocode.setApiKey('AIzaSyBbmYIh2aROJI2GNe61mbnK4WASMy7KS4s');

    // // set response language. Defaults to english.
    // Geocode.setLanguage('en');

    // // set response region. Its optional.
    // // A Geocoding request with region=es (Spain) will return the Spanish city.
    // Geocode.setRegion('pr');

    // // Enable or disable logs. Its optional.
    // Geocode.enableDebug();

    //   let fromResponse = await Geocode.fromAddress(this.state.from);
    //   // let { lat, lng } = fromResponse.results[0].geometry.location;
    //   console.log(fromResponse);
    //   await this.setState({
    //     fromLatitude: fromResponse.results[0].geometry.location.lat,
    //     fromLongitude: fromResponse.results[0].geometry.location.lng
    //   });

    //   let toResponse = await Geocode.fromAddress(this.state.to);
    //   console.log(toResponse);
    //   // let { lat, lng } = toResponse.results[0].geometry.location;
    //   await this.setState({
    //     toLatitude: toResponse.results[0].geometry.location.lat,
    //     toLongitude: toResponse.results[0].geometry.location.lng
    //   });
    try {
      console.log(moreInfoLink, contact);
      if (moreInfoLink) {
        if (this.state.customerName !== '') {
          let customer = await axios.post('/api/customers/addCustomer', {
            name: this.state.customerName
          });
          // console.log(customer)
          if (customer.status === 200) {
            this.setState({
              customerId: customer.data.customer._id,
              loader: false,
              showErroModal: false
            });
            this.props.history.push({
              pathname: 'moreinfo',
              state: {
                fromLink:
                  this.state.language === 'eng' ? 'RESIDENTIAL' : 'RESIDENCIAL'
              }
            });
          }
        } else {
          this.setState({
            loader: false
          });
          this.props.history.push({
            pathname: 'moreinfo',
            state: {
              fromLink:
                this.state.language === 'eng' ? 'RESIDENTIAL' : 'RESIDENCIAL'
            }
          });
        }
      } else {
        this.setState({
          loader: false
        });
        this.props.history.push(contact);
      }
    } catch (err) {
      console.error(err.response);
      console.error(err.message);
      this.setState({
        errorMsg: err.message,
        loader: false,
        showErroModal: true
      });
    }
  };

  handleMoreInfoNextHandle = async (url) => {
    console.log(this.state.from, this.state.to);
    let fromLatitude = this.state.cities.filter((c) =>
      c.name.includes(this.state.from)
    )[0].coordinates.lat;
    let fromLongitude = this.state.cities.filter((c) =>
      c.name.includes(this.state.from)
    )[0].coordinates.lng;

    let toLatitude = this.state.cities.filter((c) =>
      c.name.includes(this.state.to)
    )[0].coordinates.lat;
    let toLongitude = this.state.cities.filter((c) =>
      c.name.includes(this.state.to)
    )[0].coordinates.lng;

    this.setState({
      loader: true
    });
    // console.log(this.state.details);
    let order = {
      origin: {
        lat: fromLatitude,
        lon: fromLongitude
      },
      destination: {
        lat: toLatitude,
        lon: toLongitude
      },
      items: []
    };
    console.log(this.state.details);
    try {
      if (this.state.livingRoom !== '') {
        try {
        
          for (let i = 0; i < this.state.ListOfLivingRoom.length; i++) {
            let items = this.state.ListOfLivingRoom[i];
            if (items.isSelected) {
              console.log(this.state.details[items.item], items)
              order.items.push({
                id: items.id,
                cost: this.state.details[items.item].reduce((total, num) => {
                  return total + parseInt(num.price);
                }, 0),
                sizing:[...this.state.details[items.item]],
                quantity: this.state.details[items.item].length
              });
              
            }
          }
        } catch (err) {
          console.log(err);
          this.setState({
            errorMsg: err.message,
            loader: false,
            showErroModal: true
          });
        }
      }

      if (this.state.diningRoom !== '') {
        try {
          for (let j = 0; j < this.state.ListOfDiningRoom.length; j++) {
            let items = this.state.ListOfDiningRoom[j];
            if (items.isSelected) {
              order.items.push({
                cost: this.state.details[items.item].reduce((total, num) => {
                  return total + num.price;
                }, 0),
                id: items.id,
                quantity: this.state.details[items.item].length
              });
            }
          }
        } catch (err) {
          console.log(err);
          this.setState({
            errorMsg: err.message,
            loader: false,
            showErroModal: true
          });
        }
      }

      if (this.state.bedRoom !== '') {
        try {
          for (let k = 0; k < this.state.ListOfBedrooms.length; k++) {
            let items = this.state.ListOfBedrooms[k];
            if (items.isSelected) {
              order.items.push({
                cost: this.state.details[items.item].reduce((total, num) => {
                  return total + num.price;
                }, 0),
                id: items.id,
                quantity: this.state.details[items.item].length
              });
            }
          }
        } catch (err) {
          console.log(err);
          this.setState({
            errorMsg: err.message,
            loader: false,
            showErroModal: true
          });
        }
      }

      if (this.state.misc !== '') {
        try {
          for (let l = 0; l < this.state.ListOfMiscellaneous.length; l++) {
            let items = this.state.ListOfMiscellaneous[l];
            if (items.isSelected) {
              order.items.push({
                id: items.id,
                cost: this.state.details[items.item].reduce((total, num) => {
                  return total + num.price;
                }, 0),
                quantity: this.state.details[items.item].length
              });
            }
          }
        } catch (err) {
          console.log(err);
          this.setState({
            errorMsg: err.message,
            loader: false,
            showErroModal: true
          });
        }
      }

      if (this.state.kitchen !== '') {
        try {
          for (let m = 0; m < this.state.ListOfKitchen.length; m++) {
            let items = this.state.ListOfKitchen[m];
            if (items.isSelected) {
              order.items.push({
                cost: this.state.details[items.item].reduce((total, num) => {
                  return total + num.price;
                }, 0),
                id: items._id,
                quantity: this.state.details[items.item].length
              });
            }
          }
        } catch (err) {
          console.log(err);
          this.setState({
            errorMsg: err.message,
            loader: false,
            showErroModal: true
          });
        }
      }

      console.log('orders data',order);

      if (order.items.length > 0) {
        try {
          let submitOrder = await axios.post(`order/addOrder`, {
            origin: order.origin,
            destination: order.destination,
            items: order.items,
            customer: this.state.customerId
          });
          if (submitOrder.status === 200 || submitOrder.status === 201) {
            console.log(submitOrder);
            this.setState({
              totalPrice: parseFloat(submitOrder.data.order.totalPrice),
              orderId: submitOrder.data.order._id,
              customerId: submitOrder.data.order.customerId,
              loader: false,
              showErroModal: false
            });

            if (url === '') {
              this.props.history.push({ pathname: '/lastdetail' });
            } else {
              this.props.history.push({ pathname: url });
            }
          }
        } catch (err) {
          console.log(err.message);
          if (err.response) {
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
    } catch (err) {
      console.log(err);
      this.setState({
        errorMsg: err.message,
        loader: false,
        showErroModal: true
      });
    }
  };

  handleCloseModal = () => {
    this.setState({
      showErroModal: false
    });
  };

  saveAndBookLaterHandler = () => {};

  saveNowHandler = async () => {
    this.setState({
      loader: true
    });
    console.log(this.state.cities, this.state.from);
    console.log(
      this.state.cities.filter((city) => city.name.includes(this.state.from))
    );
    let paidAmmount = ((25 / 100) * this.state.totalPrice).toFixed(2);
    let finalStepForm = this.state.finalStepForm;
    finalStepForm.expiry = `${this.state.finalStepForm.expiry[0]}${this.state.finalStepForm.expiry[1]}/${this.state.finalStepForm.expiry[2]}${this.state.finalStepForm.expiry[3]}`;
    let reservation = {
      reservation: {
        from: this.state.from,
        to: this.state.to,
        fromLatitude: this.state.fromLatitude,
        fromLongitude: this.state.fromLongitude,
        toLatitude: this.state.toLatitude,
        toLongitude: this.state.toLongitude,
        totalAmount: this.state.totalPrice,
        amountPaid: paidAmmount,
        remainingAmount: this.state.totalPrice - parseFloat(paidAmmount)
      },
      finalStepForm: this.state.finalStepForm,
      date: this.state.date,
      time: this.state.time,
      orderId: this.state.orderId,
      npm: this.state.npm,
      customerId: this.state.customerId,
      areaId: this.state.cities.filter((city) =>
        city.name.includes(this.state.from)
      )[0]._id
    };
    try {
      let reservationResponse = await axios.post(
        'reservations/addReservation',
        reservation
      );
      let jobsData = {
        status: 'unassigned',
        areaId:this.state.cities.filter((city) =>
        city.name.includes(this.state.from)
      )[0]._id,
        orderId: this.state.orderId,
        customerId: this.state.customerId,
        jobType: 'Residential',
        reservationId: reservationResponse.data.reservation._id
      };
      if (
        reservationResponse.status === 200 ||
        reservationResponse.status === 201
      ) {
        let addJobRes = await axios.post(`jobs/addJob`, jobsData);
        if (addJobRes.status === 200 || addJobRes.status === 201) {
          this.setState({
            errorMsg: '',
            showErroModal: true,
            loader: false,
            livingRoom: '',
            diningRoom: '',
            bedRoom: '',
            misc: '',
            kitchen: '',
            itemsValid: true,

            finalStepForm: {
              fullName: '',
              email: '',
              phone: '',
              address: '',
              cardNumber: '',
              expiry: '',
              expiry_month: '',
              expiry_year: '',
              cvc: ''
            },

            npm: '',
            customerName: '',
            customerEmail: '',
            customerPhone: '',

            from: '',
            to: '',
            fromLatitude: '',
            fromLongitude: '',
            toLatitude: '',
            toLongitude: '',
            date: new Date(),
            time: new Date(),

            totalPrice: '',

            bookNowFrom: '',
            bookNowTo: '',
            bookNowdate: '',

            moveFrom: '',
            moveFromElevator: false,
            moveToElevator: false,
            moveTo: '',
            loadingDock: '',
            doorRemoval: '',

            specificationMessagae: '',

            title: 'TV',
          });
        }
        await this.getCititesData();
        await this.getCategories();
        await this.getAllItems();
        this.props.history.push({ pathname: '/dashboard' });
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data.message) {
        this.setState({
          errorMsg: err.message,
          loader: false,
          showErroModal: true
        });
      } else if (err.response && err.response.data.error) {
        this.setState({
          errorMsg: err.response.data.error,
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

  contactDetailsHandler = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  customerDateHandler = (date) => {
    this.setState({
      date: date
    });
  };

  customerTimeHandler = (time) => {
    console.log(time);
    this.setState({
      time: time
    });
  };
  submitContactHandler = async (route) => {
    this.setState({
      loader: true
    });
    let data = {
      contactName: this.state.contactName,
      email: this.state.contactEmail,
      businessName: this.state.contactBusinessName,
      timeToContact: this.state.contactDate,
      phoneNo: this.state.contactPhone
    };
    if (route === 'booknow') {
      data.contactName = this.state.customerName;
      data.email = this.state.customerEmail;
      data.businessName = this.state.customerBussinessName;
      data.timeToContact = this.state.date;
      data.phoneNo = this.state.customerBusinessPhone;
    }
    try {
      let contactRes = await axios.post('commercial/addCustomer', data);
      if (contactRes.status === 200 || contactRes.status === 201) {
        let order = {
          origin: {
            from: this.state.from,
            lat: this.state.fromLatitude,
            lon: this.state.fromLongitude
          },
          destination: {
            to: this.state.to,
            lat: this.state.toLatitude,
            lon: this.state.toLongitude
          }
        };
        let submitOrder = await axios.post(`order/addCommercialOrder`, {
          date: this.state.date,
          time: this.state.time,
          origin: order.origin,
          destination: order.destination,
          commercialCustomerId: contactRes.data.commercialCustomer._id
        });
        if (submitOrder.status === 200 || submitOrder.status === 201) {
          console.log(this.state.from, this.state.cities);
          let jobsData = {
            status: 'unassigned',
            areaId: this.state.cities.filter((city) =>
            city.name.includes(this.state.from)
          )[0]._id,
            jobType: 'Commercial',
            orderId: submitOrder.data.order._id,
            commercialCustomerId: contactRes.data.commercialCustomer._id
          };
          let addJobRes = await axios.post(`jobs/addJob`, jobsData);
          if (addJobRes.status === 200 || addJobRes.status === 201) {
            this.setState({
              loader: false,
              contactName: '',
              contactEmail: '',
              contactPhone: '',
              contactBusinessName: '',
              contactDate: '',
              from: '',
              to: '',
              fromLatitude: '',
              fromLongitude: '',
              toLatitude: '',
              toLongitude: '',
              customerId: '',
              customerName: '',
              customerEmail: '',
              customerPhone: '',
              customerBussinessName: '',
              customerBusinessPhone: '',
              date: new Date(),
              time: new Date()
            });
            this.props.history.push('thankyou');
          }
        }
      }
    } catch (err) {
      console.log(err);
      this.setState({
        errorMsg: err.message,
        loader: false,
        showErroModal: true
      });
    }
  };
  bookNowResidentialHandler = async (href, flag) => {
    if (flag) {
      this.props.history.push({
        pathname: 'reserve',
        state: {
          fromLink:
            this.state.language === 'eng' ? 'BOOK NOW' : 'RESERVAR AHORA'
        }
      });
    }
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey('AIzaSyAe-RvE9UpwF-SNkKvlpt4YpjOgDfaUCpQ');

    // set response language. Defaults to english.
    Geocode.setLanguage('en');

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion('pr');

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

    try {
      let fromResponse = await Geocode.fromAddress(this.state.from);
      // let { lat, lng } = fromResponse.results[0].geometry.location;
      await this.setState({
        fromLatitude: fromResponse.results[0].geometry.location.lat,
        fromLongitude: fromResponse.results[0].geometry.location.lng
      });

      let toResponse = await Geocode.fromAddress(this.state.to);
      // let { lat, lng } = toResponse.results[0].geometry.location;
      await this.setState({
        toLatitude: toResponse.results[0].geometry.location.lat,
        toLongitude: toResponse.results[0].geometry.location.lng
      });

      if (this.state.customerName !== '') {
        let customer = await axios.post('customers/addCustomer', {
          name: this.state.customerName
        });
        // console.log(customer)
        if (customer.status === 200) {
          this.setState({
            npm: customer.data.customer._id,
            from: '',
            to: '',
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            contactBusinessName: '',
            contactDate: '',
            date: new Date(),
            time: new Date(),
            loader: false
          });
          this.props.history.push({
            pathname: href,
            state: {
              fromLink:
                this.state.language === 'eng' ? 'BOOK NOW' : 'RESERVAR AHORA'
            }
          });
        }
      }
    } catch (e) {
      console.error(e);
      this.setState({
        loader: false,
        errorMsg: e.message,
        showErroModal: true
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.itemsValid !== prevState.itemsValid) {
      this.setState({
        itemsValid: this.handleCheckDetailsItems()
      });
    }
  }
  componentWillUpdate(prevProps, prevState) {
    if (this.state.itemsValid !== prevState.itemsValid) {
      this.setState({
        itemsValid: this.handleCheckDetailsItems()
      });
    }
  }
  componentDidMount = async () => {
    // let ZoneAndAreas= {
    //   'Zone 1':[
    //     'Aguadila',
    //     'Aguada',
    //     'Rincón',
    //     'Moca',
    //     'Añasco',
    //     'San Sebastián',
    //     'Isabela',
    //     'Quebradillas',
    //     'Camuy',
    //     'Hatillo',
    //     'Arecibo',
    //     'Lares',
    //     'Utuado',
    //     'Florida',
    //     'Barceloneta',
    //     'Ciales',
    //     'Manatí',
    //     'Vega Baja',
    //     'Morovis',
    //     'Corozal',
    //     'Vega Alta',
    //   ],
    //   'Zone 2':[
    //     'Naranjito',
    //     'Toa Alta',
    //     'Dorado',
    //     'Toa Baja',
    //     'Cataño',
    //     'Bayamón',
    //     'Guaynabo',
    //     'Aguas Buenas',
    //     'Gurabo',
    //     'Trujillo Alto',
    //     'Carolina',
    //     'Loíza',
    //     'Canóvanas',
    //     'Río Grande',
    //     'Luquillo',
    //     'Fajardo',
    //   ],

    //   'Zone 3':[

    //     'Mayagüez',
    //     'Hormigueros',
    //     'Cabo Rojo',
    //     'Maricao',
    //     'San Germán',
    //     'Lajas',
    //     'Sabana Grande',
    //     'Guánica',
    //     'Yauco',
    //     'Guayanilla',
    //     'Adjuntas',
    //     'Peñuelas',
    //     'Ponce',
    //     'Jayuya',
    //     'Juana Díaz',
    //     'Villalba',
    //     'Las Marías',
    //   ],

    //   'Zone 4':[

    //     'Coamo',
    //     'Santa Isabel',
    //     'Salinas',
    //     'Aibonito',
    //     'Barranquitas',
    //     'Cidra',
    //     'Cayey',
    //     'Salinas',
    //     'Guayama',
    //     'Arroyo',
    //     'Maunabo',
    //     'Yabucoa',
    //     'Humacao',
    //     'Las Piedras',
    //     'San Lorenzo',
    //     'Orocovis',
    //     'Comerio',
    //     'Naguabo',
    //     'Ceiba',
    //   ]

    // }
    //     for(let x in ZoneAndAreas){
    //       console.log(x)
    //       axios.post('http://localhost:3001/api/zone/addNewZone', {name : x , description:x}).then(resp=>{
    //         if(resp.status === 200 || resp.status === 201){
    //           for(let i = 0; i < ZoneAndAreas[x].length; i++){
    //             axios.post(`http://localhost:3001/api/area/addArea`, {name : ZoneAndAreas[x][i], description: ZoneAndAreas[x][i], zoneId:resp.data.zone._id}).then(res => {
    //               console.log(res)
    //             }).catch(err=>{
    //               console.error(err)
    //             })
    //           }
    //         }
    //       }).catch(err =>{

    //         console.error(err)
    //       })
    //     }
    await this.getAllsettings();
    await this.getCititesData();
    await this.getCategories();
    await this.getAllItems();
  };
  getCategories = async () => {
    let itemsData = {};
    try {
      let category = await axios.get('/category/getAll');
      if (category.status === 200 || category.status === 201) {
        let categories = category.data.categories;
        let itemsResponse = await axios.get('/getItems/getAll');
        if (itemsResponse.status === 200 || itemsResponse.status === 201) {
          let items = itemsResponse.data.items;
          if (categories.length > 0) {
            for (let i = 0; i < categories.length; i++) {
              let category = categories[i];
              let itemsArray = [];
              for (let j = 0; j < items.length; j++) {
                console.log(category._id === items[j].categoryId._id)
                if (
                  items[j] && items[j].categoryId && items[j].categoryId._id === category._id
                ) {
                  itemsArray.push(items[j]);
                }
              }
              if (category.name === 'Living Room') {
                itemsData.ListOfLivingRoom = itemsArray.map((itm) => ({
                  isSelected: false,
                  item: itm.name,
                  sm: itm.specificationMessage,
                  id: itm._id,
                }));
                // itemsData.ListOfLivingRoom = []
                // for(let i = 0; i < itemsArray.length; i++){
                //   itemsData.ListOfLivingRoom.push({
                //     isSelected: false,
                //     item: itemsArray[i].name,
                //     sm: itemsArray[i].specificationMessage
                //   })
                // }
              }
              console.log(itemsData.ListOfLivingRoom)
              if (category.name === 'Dining Room') {
                itemsData.ListOfDiningRoom = itemsArray.map((itm) => ({
                  id: itm._id,
                  isSelected: false,
                  item: itm.name,
                  sm: itm.specificationMessage
                }));
              }
              if (category.name === 'Bed Room') {
                itemsData.ListOfBedrooms = itemsArray.map((itm) => ({
                  id: itm._id,
                  isSelected: false,
                  item: itm.name,
                  sm: itm.specificationMessage
                }));
              }
              if (category.name === 'Kitchen') {
                itemsData.ListOfKitchen = itemsArray.map((itm) => ({
                  id: itm._id,
                  isSelected: false,
                  item: itm.name,
                  sm: itm.specificationMessage
                }));
              }
              if (category.name === 'Miscellaneous') {
                itemsData.ListOfMiscellaneous = itemsArray.map((itm) => ({
                  id: itm._id,
                  isSelected: false,
                  item: itm.name,
                  sm: itm.specificationMessage
                }));
              }
            }

            let Sizes = {},
              Prices = {},
              details = {};

            for (let i = 0; i < items.length; i++) {
              let item = items[i];
              details[item.name] = [];
              Sizes[item.name] =
                item.sizing && item.sizing.length > 0
                  ? item.sizing.map((itm) => itm.sizing)
                  : undefined;
              Prices[item.name] =
                item.sizing && item.sizing.length > 0
                  ? item.sizing.map((itm) => ({
                      size: itm.sizing,
                      price: itm.price
                    }))
                  : parseInt(item.cost);
            }
            console.log(itemsData, Sizes, Prices, details);
            this.setState({
              categories: category.data.categories,
              Prices,
              Sizes,
              details,
              ...itemsData
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  getAllItems = async () => {
    try {
      let { data } = await axios.get('/getItems/getAll');
      this.setState({
        allItems: data.items
      });
    } catch (err) {
      console.log(err);
    }
  };
  getAllsettings = async () => {
    try {
      let { data: allsettings } = await axios.get('settings/getAllSettings');
      // console.log(data)
      console.log(allsettings[0]);
      this.setState({
        getAllsettings: allsettings[0]
      });
      console.log(this.state.getAllsettings);
    } catch (err) {
      console.log(err);
    }
  };

  getCititesData = async () => {
    try {
      let allZones = await axios.get('zone/getAll');

      if (allZones.status === 200) {
        for (let i = 0; i < allZones.data.zones.length; i++) {
          // console.log(allZones);
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

  gotToFinalStepPage = () => {
    this.props.history.push('/final-step');
  };
  finalStepFormHandler = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        finalStepForm: {
          ...prevState.finalStepForm,
          [name]: value
        }
      };
    });
  };

  handleCardNumber = (e) => {
    console.log(e);
    const value = e;

    this.setState((prevState) => {
      return {
        ...prevState,
        finalStepForm: {
          ...prevState.finalStepForm,
          cardNumber: value
        }
      };
    });
  };

  handleExpiry = (e) => {
    const value = e;

    this.setState((prevState) => {
      return {
        ...prevState,
        finalStepForm: {
          ...prevState.finalStepForm,
          expiry: value
        }
      };
    });
  };
  handleCvc = (e) => {
    const value = e.target.value;

    if (value.length === 4) {
      return;
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          finalStepForm: {
            ...prevState.finalStepForm,
            cvc: value
          }
        };
      });
    }
  };
  handleLanguageChange = (language) => {
    this.setState({
      language: language
    });
  };

  render() {
    return (
      <StepperDataContext.Provider
        value={{
          ...this.state,
          handleOpen: this.handleOpen,
          handleCloseDining: this.handleCloseDining,
          handleOpenDining: this.handleOpenDining,
          handleClose: this.handleClose,
          handleOpenBedroom: this.handleOpenBedroom,
          handleCloseBedroom: this.handleCloseBedroom,
          handleOpenMiscellaneous: this.handleOpenMiscellaneous,
          handleCloseMiscellaneous: this.handleCloseMiscellaneous,
          handleOpenKitchen: this.handleOpenKitchen,
          handleCloseKitchen: this.handleCloseKitchen,
          handleShareholderName: this.handleShareholderName,
          handleChangeSelect: this.handleChangeSelect,
          handleSubmit: this.handleSubmit,
          bedRoomChangeHandler: this.bedRoomChangeHandler,
          diningRoomChangeHandler: this.diningRoomChangeHandler,
          livingRoomChangeHandler: this.livingRoomChangeHandler,
          miscChangeHandler: this.miscChangeHandler,
          kitchenChangeHandler: this.kitchenChangeHandler,
          changeSizeHandler: this.changeSizeHandler,
          reserveChangeHandlerFrom: this.reserveChangeHandlerFrom,
          reserveChangeHandlerTo: this.reserveChangeHandlerTo,
          reserveChangeHandlerDate: this.reserveChangeHandlerDate,
          lastDetailsMovingFromHandler: this.lastDetailsMovingFromHandler,
          lastDetailsMovingToHandler: this.lastDetailsMovingToHandler,
          lastDetailsLoadingDockHandler: this.lastDetailsLoadingDockHandler,
          lastDetailsDoorRemovingHandler: this.lastDetailsDoorRemovingHandler,
          lastDetaislMovingFromElevatorHandler:
            this.lastDetaislMovingFromElevatorHandler,
          lastDetaislMovingToElevatorHandler:
            this.lastDetaislMovingToElevatorHandler,
          bookNowChangeHandlerFrom: this.bookNowChangeHandlerFrom,
          bookNowChangeHandlerTo: this.bookNowChangeHandlerTo,
          bookNowChangeHandlerDate: this.bookNowChangeHandlerDate,
          customerDetailsHandler: this.customerDetailsHandler,
          handleNextEvent: this.handleNextEvent,
          handleMoreInfoNextHandle: this.handleMoreInfoNextHandle,
          saveAndBookLaterHandler: this.saveAndBookLaterHandler,
          saveNowHandler: this.saveNowHandler,
          contactDetailsHandler: this.contactDetailsHandler,
          submitContactHandler: this.submitContactHandler,
          bookNowResidentialHandler: this.bookNowResidentialHandler,
          handleCloseModal: this.handleCloseModal,
          customerPhoneHandler: this.customerPhoneHandler,
          customerDateHandler: this.customerDateHandler,
          customerTimeHandler: this.customerTimeHandler,
          finalStepFormHandler: this.finalStepFormHandler,
          gotToFinalStepPage: this.gotToFinalStepPage,
          handleCardNumber: this.handleCardNumber,
          handleExpiry: this.handleExpiry,
          handleCvc: this.handleCvc,
          handleCheckDetailsItems: this.handleCheckDetailsItems,
          handleLanguageChange: this.handleLanguageChange
        }}>
        {this.props.children}
      </StepperDataContext.Provider>
    );
  }
}

export default withRouter(StepperDataContextProvider);
