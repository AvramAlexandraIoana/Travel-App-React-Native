import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {RootStackParamList} from '../../../RootStackParams';
import {windowWidth} from '../../utils/dimension';
import firestore from '@react-native-firebase/firestore';
import FormButton from '../custom-fields/form-button';
import FormInput from '../custom-fields/form-input';
import Input from '../custom-fields/input';
import {Picker} from '@react-native-picker/picker';
import {count} from 'console';
import firebase from '@react-native-firebase/app';
import {ActivityIndicator} from 'react-native';
import Loader from '../custom-fields/loader';

type screenProp = StackNavigationProp<RootStackParamList, 'AddLocation'>;

const AddLocation = () => {
  const refCountry = firestore().collection('country');
  const refLocation = firestore().collection('location');
  const [selectedValue, setSelectedValue] = useState('');
  const navigation = useNavigation<screenProp>();

  const [countryList, setCountryList] = useState([]);

  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [locationId, setLocationId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [didMount, setDidMount] = useState(false);
  let isRendered = useRef(false);
  const [showLoading, setShowLoading] = useState(false);

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
      console.log(list);
      setCountryList([...list]);
      setShowLoading(false);
    } catch (e) {
      console.log(e);
      setErrorMessage('Error');
    }
  };

  useEffect(() => {
    getCountryList();
  }, []);

  const addLocation = (
    streetAddress: string,
    city: string,
    locationId: string,
  ) => {
    refLocation
      .add({
        streetAddress: streetAddress,
        city: city,
        locationId: locationId,
      })
      .then((response: any) => {
        console.log('Locatia adaugata cu succes');
        console.log(response);
        navigation.navigate('LocationList');
      })
      .catch((error: any) => {
        console.log('Eroare');
        setErrorMessage(errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Location</Text>
      <Input
        labelValue={city}
        onChangeText={(city: string) => setCity(city)}
        placeholderText="City"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        labelValue={streetAddress}
        onChangeText={(streetAddress: string) =>
          setStreetAddress(streetAddress)
        }
        placeholderText="Street Address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {
        <View style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 4}}>
          <Picker
            selectedValue={selectedValue}
            style={{height: 50}}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue != '0') {
                setSelectedValue(itemValue);
              }
            }}>
            <Picker.Item label="Select Country" value="0" />
            {countryList.map((item: any, i) => (
              <Picker.Item key={i} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
      }

      <FormButton
        buttonTitle="Add Location"
        onPress={() => {
          addLocation(streetAddress, city, locationId);
        }}
      />
      {/* <Text>{!showLoading ? countryList.length : 0}</Text> */}
      {showLoading && <Loader></Loader>}
    </View>
  );
};

export default AddLocation;

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