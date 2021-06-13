import React, {createContext, useReducer, useState} from 'react';
import AppReducer from './app-reducer';

//Create Context
export const GlobalContext = createContext({} as any);

//Provider Componennt
import firestore from '@react-native-firebase/firestore';

export const GlobalProvider = ({children}) => {
  const [countryList, setCountryList] = useState([] as any);
  const [showLoading, setShowLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const refCountry = firestore().collection('country');

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
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
