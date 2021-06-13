import React, {createContext, useEffect, useReducer, useState} from 'react';

//Create Context
export const GlobalContext = createContext({} as any);

//Provider Componennt
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const GlobalProvider = ({children}: {children: any}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const refCountry = firestore().collection('country');
  const [countryList, setCountryList] = useState([] as any);
  const [countryName, setCountryName] = useState('');

  const refLocation = firestore().collection('location');
  const [locationList, setLocationList] = useState([] as any);
  const [city, setCityName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [countryId, setCountryId] = useState('');

  const refAgency = firestore().collection('agency');
  const [agencyList, setAgencyList] = useState([] as any);
  const [agencyName, setAgencyName] = useState('');
  const [locationId, setLocationId] = useState('');

  const refTrip = firestore().collection('trip');
  const [tripList, setTripList] = useState([] as any);
  const [tripName, setTripName] = useState('');
  const [price, setPrice] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [agencyId, setAgencyId] = useState('');

  const getCountryList = async () => {
    setShowLoading(true);
    try {
      var list: any = [];
      var snapshot = await refCountry.get();
      snapshot.forEach(res => {
        const {name} = res.data();
        list.push({
          id: res.id,
          name,
        });
      });
      setCountryList(list);
      console.log(list);
      setShowLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getCountry = (id: string) => {
    console.log(id);
    const dbRef = refCountry.doc(id);
    dbRef
      .get()
      .then((response: any) => {
        console.log(response);
        if (response.exists) {
          const country = response.data();
          console.log(country);
          setCountryName(country.name);
        } else {
          console.log('Country does not exist!');
        }
      })
      .catch((error: any) => {
        console.log('Eroare');
        setErrorMessage(error);
      });
  };

  const addCountry = (countryName: string) => {
    refCountry
      .add({
        name: countryName,
      })
      .then(response => {
        console.log('Tara adaugata cu succes');
        console.log(response);
      })
      .catch(error => {
        console.log('Eroare');
        setErrorMessage(errorMessage);
      });
  };

  const updateCountry = (id: string, countryName: string) => {
    const dbRef = refCountry.doc(id);
    dbRef
      .set({
        name: countryName,
      })
      .then(response => {})
      .catch(error => {
        console.log('Error', error);
        setErrorMessage(error);
      });
  };

  const deleteCountry = (id: string) => {
    console.log(id);
    const dbRef = refCountry.doc(id);
    dbRef
      .delete()
      .then(res => {
        console.log('Country removed');
        getCountryList();
      })
      .catch(error => {
        console.log(error);
        setErrorMessage(error);
      });
  };

  const getLocationList = async () => {
    setShowLoading(true);
    try {
      var list: any = [];
      var snapshot = await refLocation.get();
      snapshot.forEach(res => {
        const {city, streetAddress, countryId} = res.data();
        list.push({
          id: res.id,
          city,
          streetAddress,
          countryId,
        });
      });
      console.log(list);
      setShowLoading(false);
      setLocationList([...list]);
    } catch (e) {
      console.log(e);
      setErrorMessage('Error');
    }
  };

  const deleteLocation = (id: string) => {
    console.log(id);
    const dbRef = refLocation.doc(id);
    dbRef
      .delete()
      .then(res => {
        console.log('Location removed');
        getLocationList();
      })
      .catch(error => {
        console.log(error);
        setErrorMessage(error);
      });
  };

  const addLocation = (
    streetAddress: string,
    city: string,
    countryId: string,
  ) => {
    refLocation
      .add({
        streetAddress: streetAddress,
        city: city,
        countryId: countryId,
      })
      .then((response: any) => {
        console.log('Locatia adaugata cu succes');
        console.log(response);
      })
      .catch((error: any) => {
        console.log('Eroare');
        setErrorMessage(errorMessage);
      });
  };

  const getLocation = (id: string) => {
    const dbRef = refLocation.doc(id);
    dbRef
      .get()
      .then((response: any) => {
        console.log(response);
        if (response.exists) {
          const location = response.data();
          console.log(location);
          setCityName(location.city);
          setStreetAddress(location.streetAddress);
          setCountryId(location.countryId);
        } else {
          console.log('Location does not exist!');
        }
      })
      .catch((error: any) => {
        console.log('Eroare');
        setErrorMessage(error);
      });
  };

  const updateLocation = (
    id: string,
    city: string,
    streetAddress: string,
    countryId: string,
  ) => {
    const dbRef = refLocation.doc(id);
    dbRef
      .set({
        city: city,
        streetAddress: streetAddress,
        countryId: countryId,
      })
      .then(response => {})
      .catch(error => {
        console.log('Error', error);
        setErrorMessage(error);
      });
  };

  const getAgencyList = async () => {
    setShowLoading(true);
    try {
      var list: any = [];
      var snapshot = await refAgency.get();
      snapshot.forEach(res => {
        const {name, locationId} = res.data();
        list.push({
          id: res.id,
          name,
          locationId,
        });
      });
      console.log(list);
      setShowLoading(false);
      setAgencyList([...list]);
    } catch (e) {
      console.log(e);
      setErrorMessage('Error');
    }
  };

  const addAgency = (name: string, locationId: string) => {
    console.log(name);
    console.log(locationId);
    refAgency
      .add({
        name: name,
        locationId: locationId,
      })
      .then((response: any) => {
        console.log('Agentie adaugata cu succes');
        console.log(response);
      })
      .catch((error: any) => {
        console.log('Eroare');
        setErrorMessage(errorMessage);
      });
  };

  const deleteAgency = (id: string) => {
    console.log(id);
    const dbRef = refAgency.doc(id);
    dbRef
      .delete()
      .then(res => {
        console.log('Agency removed');
        getAgencyList();
      })
      .catch(error => {
        console.log(error);
        setErrorMessage(error);
      });
  };

  const getAgency = (id: string) => {
    const dbRef = refAgency.doc(id);
    dbRef
      .get()
      .then((response: any) => {
        console.log(response);
        if (response.exists) {
          const agency = response.data();
          console.log(agency);
          setAgencyName(agency.name);
          setLocationId(agency.locationId);
        } else {
          console.log('Agency does not exist!');
        }
      })
      .catch((error: any) => {
        console.log('Eroare');
        setErrorMessage(error);
      });
  };

  const updateAgency = (id: string, agencyName: string, locationId: string) => {
    const dbRef = refAgency.doc(id);
    dbRef
      .set({
        name: agencyName,
        locationId: locationId,
      })
      .then(response => {})
      .catch(error => {
        console.log('Error', error);
        setErrorMessage(error);
      });
  };

  const getTripList = async () => {
    setShowLoading(true);
    try {
      var list: any = [];
      var snapshot = await refTrip.get();
      snapshot.forEach(res => {
        const {
          name,
          price,
          duration,
          numberOfSeats,
          startDate,
          endDate,
          locationId,
          agencyId,
        } = res.data();
        list.push({
          id: res.id,
          name,
          price,
          duration,
          numberOfSeats,
          startDate,
          endDate,
          locationId,
          agencyId,
        });
      });
      console.log(list);
      setShowLoading(false);
      setTripList([...list]);
    } catch (e) {
      console.log(e);
      setErrorMessage('Error');
    }
  };

  const addTrip = (
    tripName: string,
    duration: number,
    numberOfSeats: number,
    price: number,
    startDate: string,
    endDate: string,
    agencyId: string,
    locationId: string,
  ) => {
    refTrip
      .add({
        name: tripName,
        duration: duration,
        numberOfSeats: numberOfSeats,
        price: price,
        startDate: startDate,
        endDate: endDate,
        agencyId: agencyId,
        locationId: locationId,
      })
      .then((response: any) => {
        console.log('Trip adaugata cu succes');
        console.log(response);
      })
      .catch((error: any) => {
        console.log('Eroare');
        setErrorMessage(errorMessage);
      });
  };

  const deleteTrip = (id: string) => {
    console.log(id);
    const dbRef = refTrip.doc(id);
    dbRef
      .delete()
      .then(res => {
        console.log('Trip removed');
        getTripList();
      })
      .catch(error => {
        console.log(error);
        setErrorMessage(error);
      });
  };

  const updateTrip = (
    id: string,
    tripName: string,
    duration: number,
    numberOfSeats: number,
    price: number,
    startDate: string,
    endDate: string,
    agencyId: string,
    locationId: string,
  ) => {
    const dbRef = refTrip.doc(id);
    dbRef
      .set({
        name: tripName,
        duration: duration,
        numberOfSeats: numberOfSeats,
        price: price,
        startDate: startDate,
        endDate: endDate,
        agencyId: agencyId,
        locationId: locationId,
      })
      .then(response => {})
      .catch(error => {
        console.log('Error', error);
        setErrorMessage(error);
      });
  };

  const getTrip = (id: string) => {
    const dbRef = refTrip.doc(id);
    dbRef
      .get()
      .then((response: any) => {
        console.log(response);
        if (response.exists) {
          const trip = response.data();
          console.log(trip);
          setTripName(trip.name);
          setPrice(trip.price);
          setDuration(trip.duration);
          setNumberOfSeats(trip.numberOfSeats);
          setStartDate(trip.startDate);
          setEndDate(trip.endDate);
          setLocationId(trip.locationId);
          setAgencyId(trip.agencyId);
        } else {
          console.log('Trip does not exist!');
          setErrorMessage('Trip does not exist!');
        }
      })
      .catch((error: any) => {
        console.log('Eroare');
        setErrorMessage(error);
      });
  };

  const doCreateUser = async (email: string, password: string) => {
    setShowLoading(true);
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response && response.user) {
        setShowLoading(false);
        console.log('Success ✅', 'Account created successfully');
      }
    } catch (e) {
      setShowLoading(false);
      console.error(e.message);
    }
  };

  const loginUser = async (email: any, password: any) => {
    setShowLoading(true);
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      console.log(response);
      if (response && response.user) {
        setShowLoading(false);
        console.log('Success ✅', 'User sign in successfully');
      }
    } catch (e) {
      setShowLoading(false);
      console.error(e.message);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        countryList,
        setCountryList,
        getCountryList,
        showLoading,
        setShowLoading,
        errorMessage,
        setErrorMessage,
        deleteCountry,
        addCountry,
        updateCountry,
        setCountryName,
        countryName,
        getCountry,
        locationList,
        setLocationList,
        getLocationList,
        deleteLocation,
        addLocation,
        getLocation,
        city,
        setCityName,
        streetAddress,
        setStreetAddress,
        countryId,
        setCountryId,
        updateLocation,
        agencyName,
        setAgencyName,
        locationId,
        setLocationId,
        addAgency,
        agencyList,
        setAgencyList,
        getAgencyList,
        deleteAgency,
        getAgency,
        updateAgency,
        tripName,
        setTripName,
        duration,
        setDuration,
        numberOfSeats,
        setNumberOfSeats,
        price,
        setPrice,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        agencyId,
        setAgencyId,
        deleteTrip,
        getTripList,
        tripList,
        setTripList,
        updateTrip,
        getTrip,
        addTrip,
        doCreateUser,
        loginUser,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
