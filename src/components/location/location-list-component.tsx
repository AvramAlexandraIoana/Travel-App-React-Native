import {useIsFocused, useNavigation} from '@react-navigation/native';
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

const LocationList = () => {
  const navigation = useNavigation();
  const [locationList, setLocationList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const ref = firestore().collection('location');
  const isFocused = useIsFocused();

  const getLocationList = async () => {
    setShowLoading(true);
    try {
      var list: any = [];
      var snapshot = await ref.get();
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

  useEffect(() => {
    if (isFocused) {
      console.log('called');
      getLocationList();
    }
  }, [isFocused]);

  const deleteLocation = id => {
    console.log(id);
    const dbRef = ref.doc(id);
    dbRef
      .delete()
      .then(res => {
        console.log('Country removed');
        getLocationList();
      })
      .catch(error => {
        console.log(error);
        setErrorMessage(error);
      });
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
      {locationList &&
        locationList.map((item: any, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>City: {item.city}</ListItem.Title>
              <ListItem.Title>
                Street Adress: {item.streetAddress}
              </ListItem.Title>
              <View style={styles.footerWrapper}>
                <Button
                  onPress={() => {
                    navigation.navigate('UpdateLocation', {id: item.id});
                  }}
                  title="Update"
                  color="#ff8c00"
                />
                <View style={{marginLeft: 10}}>
                  <Button
                    onPress={() => {
                      deleteLocation(item.id);
                    }}
                    title="Delete"
                    color="#ff0000"
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Button
                    onPress={() => {
                      navigation.navigate('CountryDetails', {
                        id: item.countryId,
                      });
                    }}
                    title="View Country Details"
                    color="#87ceeb"
                  />
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      <Text>{showLoading}</Text>
      {showLoading && <Loader></Loader>}
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
});
