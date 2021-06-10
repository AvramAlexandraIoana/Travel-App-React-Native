import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SnapshotViewIOSBase,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../RootStackParams';
import {windowWidth} from '../../utils/dimension';
import firestore from '@react-native-firebase/firestore';
import {ListItem, Avatar, Icon} from 'react-native-elements';
import Loader from '../custom-fields/loader';

const LocationDetails = ({route}: {route: any}) => {
  const navigation = useNavigation();
  const [city, setCityName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const ref = firestore().collection('location');

  const getLocation = () => {
    const dbRef = ref.doc(route.params.id);
    dbRef
      .get()
      .then((response: any) => {
        console.log(response);
        if (response.exists) {
          const location = response.data();
          console.log(location);
          setCityName(location.city);
          setStreetAddress(location.streetAddress);
        } else {
          console.log('Location does not exist!');
        }
      })
      .catch((error: any) => {
        console.log('Eroare');
        setErrorMessage(error);
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>City: {city} </ListItem.Title>
          <ListItem.Title>Street Address: {streetAddress} </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Text>{showLoading}</Text>
      {showLoading && <Loader></Loader>}
    </ScrollView>
  );
};

export default LocationDetails;

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
});