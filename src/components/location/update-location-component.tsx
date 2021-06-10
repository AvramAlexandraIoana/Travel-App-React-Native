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

const UpdateLocation = ({route}: {route: any}) => {
  const refCountry = firestore().collection('country');
  const refLocation = firestore().collection('location');
  const [selectedValue, setSelectedValue] = useState('');
  const navigation = useNavigation();

  const [countryList, setCountryList] = useState([] as any);

  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [countryId, setCountryId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const getLocation = () => {
    const dbRef = refLocation.doc(route.params.id);
    dbRef
      .get()
      .then((response: any) => {
        console.log(response);
        if (response.exists) {
          const location = response.data();
          console.log(location);
          setCity(location.city);
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
    getLocation();
  }, []);

  const updateLocation = (id: string) => {
    const dbRef = refLocation.doc(id);
    dbRef
      .set({
        city: city,
        streetAddress: streetAddress,
        countryId: countryId,
      })
      .then(response => {
        navigation.navigate('LocationList');
      })
      .catch(error => {
        console.log('Error', error);
        setErrorMessage(error);
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
            selectedValue={countryId}
            style={{height: 50}}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue != '0') {
                setCountryId(itemValue);
              }
            }}>
            <Picker.Item label="Select Country" value="0" />
            {countryList.map((item: any, i: number) => (
              <Picker.Item key={i} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
      }

      <FormButton
        buttonTitle="Update Location"
        onPress={() => {
          updateLocation(route.params.id);
        }}
      />
      {/* <Text>{!showLoading ? countryList.length : 0}</Text> */}
      {showLoading && <Loader></Loader>}
    </View>
  );
};

export default UpdateLocation;

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
