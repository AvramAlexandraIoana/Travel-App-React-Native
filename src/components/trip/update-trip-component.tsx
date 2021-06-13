import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef, useState, useContext} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
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
import DatePicker from 'react-native-datepicker';

import {YellowBox} from 'react-native';
import _ from 'lodash';
import {Icon} from 'react-native-elements';
import {GlobalContext} from '../context/global-state';

YellowBox.ignoreWarnings(['componentWillReceiveProps']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('componentWillReceiveProps') <= -1) {
    _console.warn(message);
  }
};

const UpdateTrip = ({route}: {route: any}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const navigation = useNavigation();
  const {
    getLocationList,
    getAgencyList,
    tripName,
    setTripName,
    duration,
    setDuration,
    price,
    setPrice,
    numberOfSeats,
    setNumberOfSeats,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    locationId,
    setLocationId,
    agencyId,
    setAgencyId,
    locationList,
    agencyList,
    showLoading,
    updateTrip,
    getTrip,
    errorMessage,
  } = useContext(GlobalContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    setTripName('');
    setDuration('');
    setPrice('');
    setNumberOfSeats('');
    setStartDate('');
    setEndDate('');
    setLocationId('');
    setAgencyId('');
    if (isFocused) {
      console.log('called');
      getLocationList();
      getAgencyList();
      getTrip(route.params.id);
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
      <Text style={styles.text}>Update Trip</Text>
      <Input
        labelValue={tripName}
        onChangeText={(tripName: string) => setTripName(tripName)}
        placeholderText="Trip Name"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        labelValue={price}
        onChangeText={(price: string) => setPrice(price)}
        placeholderText="Price"
        autoCapitalize="none"
        keyboardType="numeric"
        autoCorrect={false}
      />
      <Input
        labelValue={numberOfSeats}
        keyboardType="numeric"
        onChangeText={(numberOfSeats: string) =>
          setNumberOfSeats(numberOfSeats)
        }
        placeholderText="Number Of Seats"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        labelValue={duration}
        keyboardType="numeric"
        onChangeText={(duration: string) => setDuration(duration)}
        placeholderText="Duration"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <DatePicker
        style={styles.datePickerStyle}
        date={startDate} // Initial date from state
        mode="date" // The enum of date, datetime and time
        placeholder="Select Start Date"
        format="DD-MM-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            //display: 'none',
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
        }}
        onDateChange={startDate => {
          setStartDate(startDate);
        }}
      />
      <DatePicker
        style={styles.datePickerStyle}
        date={endDate} // Initial date from state
        mode="date" // The enum of date, datetime and time
        placeholder="Select End Date"
        format="DD-MM-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            //display: 'none',
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
        }}
        onDateChange={endDate => {
          setEndDate(endDate);
        }}
      />
      {
        <View
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            marginTop: 10,
          }}>
          <Picker
            selectedValue={locationId}
            style={{height: 50}}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue != '0');
              if (itemValue != '0') {
                console.log(itemValue);
                setLocationId(itemValue);
              }
            }}>
            <Picker.Item label="Select City" value="0" />
            {locationList.map((item: any, i: number) => (
              <Picker.Item key={i} label={item.city} value={item.id} />
            ))}
          </Picker>
        </View>
      }

      {
        <View
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            marginTop: 10,
          }}>
          <Picker
            selectedValue={agencyId}
            style={{height: 50}}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue != '0');
              if (itemValue != '0') {
                console.log(itemValue);
                setAgencyId(itemValue);
              }
            }}>
            <Picker.Item label="Select Agency" value="0" />
            {agencyList.map((item: any, i: number) => (
              <Picker.Item key={i} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
      }

      <FormButton
        buttonTitle="Update Trip"
        onPress={() => {
          updateTrip(
            route.params.id,
            tripName,
            duration,
            numberOfSeats,
            price,
            startDate,
            endDate,
            agencyId,
            locationId,
          );
          if (!errorMessage) {
            navigation.navigate('TripList');
          }
        }}
      />
      {showLoading && <Loader></Loader>}
    </View>
  );
};

export default UpdateTrip;

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
  datePickerStyle: {
    width: windowWidth - 40,
    marginTop: 20,
  },
});
