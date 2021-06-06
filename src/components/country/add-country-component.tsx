import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {RootStackParamList} from '../../../RootStackParams';
import {windowWidth} from '../../utils/dimension';
import firestore from '@react-native-firebase/firestore';
import FormButton from '../custom-fields/form-button';
import FormInput from '../custom-fields/form-input';
import Input from '../custom-fields/input';

type screenProp = StackNavigationProp<RootStackParamList, 'AddCountry'>;

const AddCountry = () => {
  const ref = firestore().collection('country');
  const navigation = useNavigation<screenProp>();

  const [countryName, setCountryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addCountry = (countryName: string) => {
    ref
      .add({
        name: countryName,
      })
      .then(response => {
        console.log('Tara adaugata cu succes');
        console.log(response);
        navigation.navigate('CountryList');
      })
      .catch(error => {
        console.log('Eroare');
        setErrorMessage(errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add country</Text>
      <Input
        labelValue={countryName}
        onChangeText={(countryName: string) => setCountryName(countryName)}
        placeholderText="Country Name"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormButton
        buttonTitle="Add Country"
        onPress={() => {
          addCountry(countryName);
        }}
      />
    </View>
  );
};

export default AddCountry;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    padding: 20,
  },
  logo: {
    height: 150,
    width: windowWidth,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
