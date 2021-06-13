import React, {createContext, useEffect, useReducer, useState} from 'react';
import AppReducer from './app-reducer';

//Create Context
export const GlobalContext = createContext({} as any);

//Provider Componennt
import firestore from '@react-native-firebase/firestore';

export const GlobalProvider = ({children}) => {
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

  const getCountry = id => {
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

  const getLocation = id => {
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
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
