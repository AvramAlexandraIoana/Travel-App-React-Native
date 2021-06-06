import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../custom-fields/form-button';
import Input from '../custom-fields/input';
import firestore from '@react-native-firebase/firestore';

const CountryUpdate = ({route}) => {
  const navigation = useNavigation();

  const ref = firestore().collection('country');
  const [countryName, setCountryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getCountry = () => {
    const dbRef = ref.doc(route.params.id);
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

  useEffect(() => {
    getCountry();
  }, []);

  const updateCountry = (id: string) => {
    const dbRef = ref.doc(id);
    dbRef
      .set({
        name: countryName,
      })
      .then(response => {
        navigation.navigate('CountryList');
      })
      .catch(error => {
        console.log('Error', error);
        setErrorMessage(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Update country</Text>
      <Input
        labelValue={countryName}
        onChangeText={(countryName: string) => setCountryName(countryName)}
        placeholderText="Country Name"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormButton
        buttonTitle="Update Country"
        onPress={() => {
          updateCountry(route.params.id);
        }}
      />
    </View>
  );
};

export default CountryUpdate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
});
