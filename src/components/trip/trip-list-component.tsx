import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
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
import Moment from 'moment';
import {GlobalContext} from '../context/global-state';

type screenProp = StackNavigationProp<RootStackParamList, 'CountryList'>;

const TripList = () => {
  const navigation = useNavigation();
  const {
    tripList,
    setTripList,
    showLoading,
    getTripList,
    errorMessage,
    deleteTrip,
  } = useContext(GlobalContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log('called');
      getTripList();
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Button
          onPress={() => {
            navigation.navigate('AddTrip');
          }}
          title="Add Trip"
          color="#6495ed"></Button>
      </View>
      {tripList &&
        tripList.map((item: any, i: number) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Trip Name: {item.name}</ListItem.Title>
              <ListItem.Title>Price: {item.price} Lei</ListItem.Title>
              <ListItem.Title>Duration: {item.duration} Days</ListItem.Title>
              <ListItem.Title>
                Number of Seats: {item.numberOfSeats}
              </ListItem.Title>
              <ListItem.Title>Start Date: {item.startDate}</ListItem.Title>
              <ListItem.Title>End Date: {item.endDate}</ListItem.Title>
              <View style={styles.footerWrapper}>
                <Button
                  onPress={() => {
                    navigation.navigate('UpdateTrip', {id: item.id});
                  }}
                  title="Update"
                  color="#ff8c00"
                />
                <View style={{marginLeft: 10}}>
                  <Button
                    onPress={() => {
                      deleteTrip(item.id);
                    }}
                    title="Delete"
                    color="#ff0000"
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Button
                    onPress={() => {
                      navigation.navigate('LocationDetails', {
                        id: item.locationId,
                      });
                    }}
                    title="View Location Details"
                    color="#87ceeb"
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Button
                    onPress={() => {
                      navigation.navigate('AgencyDetails', {
                        id: item.agencyId,
                      });
                    }}
                    title="View Agency Details"
                    color="#6495ed"
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

export default TripList;

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
