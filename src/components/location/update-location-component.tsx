import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {Icon} from 'react-native-elements';
import {GlobalContext} from '../context/global-state';

const UpdateLocation = ({route}: {route: any}) => {
  const navigation = useNavigation();

  const {
    streetAddress,
    setStreetAddress,
    city,
    setCityName,
    countryId,
    setCountryId,
    countryList,
    getCountryList,
    showLoading,
    errorMessage,
    getLocation,
    updateLocation,
  } = useContext(GlobalContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    setCityName('');
    setStreetAddress('');
    setCountryId('');
    if (isFocused) {
      console.log('called');
      getCountryList();
      getLocation(route.params.id);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Icon
          name="arrow-left"
          size={20}
          color="black"
          type="entypo"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <Text style={styles.text}>Update Location</Text>
      <Input
        labelValue={city}
        onChangeText={(city: string) => setCityName(city)}
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
          updateLocation(route.params.id, city, streetAddress, countryId);
          if (!errorMessage) {
            navigation.navigate('LocationList');
          }
        }}
      />
      {/* <Text>{!showLoading ? countryList.length : 0}</Text> */}
      {showLoading && <Loader></Loader>}
    </View>
  );
};

export default UpdateLocation;

const styles = StyleSheet.create({
  backContainer: {
    position: 'absolute',
    left: 10,
    top: 0,
  },
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
