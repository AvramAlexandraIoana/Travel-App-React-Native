import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {RootStackParamList} from '../../../RootStackParams';
import {windowWidth} from '../../utils/dimension';
import firestore from '@react-native-firebase/firestore';
import FormButton from '../custom-fields/form-button';
import FormInput from '../custom-fields/form-input';
import Input from '../custom-fields/input';
import {Picker} from '@react-native-picker/picker';
import {ListItem} from 'react-native-elements';
import {count} from 'console';

const LocationList = () => {
  const refCountry = firestore().collection('country');
  const refLocation = firestore().collection('location');

  const [selectedValue, setSelectedValue] = useState('');
  const navigation = useNavigation();

  const [countryList, setCountryList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [locationId, setLocationId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getCountryList = async () => {
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
      // console.log(list);
      setCountryList([...list]);
    } catch (e) {
      console.log(e);
      setErrorMessage('Error');
    }
  };

  const getLocationList = async () => {
    try {
      var list: any = [];
      var snapshot = await refLocation.get();
      snapshot.forEach(res => {
        const {city, streetAddress, locationId} = res.data();
        list.push({
          id: res.id,
          city,
          streetAddress,
          locationId,
        });
      });
      setLocationList([...list]);
    } catch (e) {
      console.log(e);
      setErrorMessage('Error');
    }
  };

  useEffect(() => {
    //getCountryList();
    getLocationList();
  });

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

  const getCountryName = (location: any) => {
    let foundCountry: any = countryList.find(function (country: any) {
      return country.id == location.locationId;
    });

    if (foundCountry) {
      return foundCountry.name;
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Button
          onPress={() => {
            navigation.navigate('AddLocation');
          }}
          title="Add Location"
          color="#6495ed"></Button>
      </View>
      {locationList.map((location: any, i) => (
        <ListItem key={i} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              Country:
              <Text style={styles.countryName}>{getCountryName(location)}</Text>
            </ListItem.Title>
            <ListItem.Title>City: {location.city}</ListItem.Title>
            <ListItem.Title>
              Street Address: {location.streetAddress}
            </ListItem.Title>
            <View style={styles.footerWrapper}>
              <Button
                onPress={() => {
                  navigation.navigate('CountryUpdate', {id: location.id});
                }}
                title="Update"
                color="#ff8c00"
              />
              <View style={{marginLeft: 10}}>
                <Button
                  onPress={() => {
                    deleteLocation(location.id);
                  }}
                  title="Delete"
                  color="#ff0000"
                />
              </View>
            </View>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default LocationList;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  footerWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
  },
  footerButton: {
    position: 'relative',
    marginLeft: 20,
  },
  countryName: {
    fontWeight: 'bold',
  },
});
