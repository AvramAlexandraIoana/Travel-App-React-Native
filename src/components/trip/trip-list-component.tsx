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
  Animated,
  TouchableOpacity,
  Easing,
  Dimensions,
  Image,
  YellowBox,
} from 'react-native';

var {width, height} = Dimensions.get('window');
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
  const [fadeValue, setFadeValue] = useState(new Animated.Value(0));
  const [xValue, setXValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isFocused) {
      console.log('called');
      getTripList();
    }
    YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
  }, [isFocused]);

  const fadeAnimation = () => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 1200,
    }).start();
  };

  const moveAnimation = () => {
    Animated.timing(xValue, {
      toValue: width - 100,
      duration: 1000,
      asing: Easing.cubic,
    }).start(() => {
      Animated.timing(xValue, {
        toValue: 0,
        duration: 1000,
        asing: Easing.linear,
      }).start(() => {
        moveAnimation();
      });
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Animated.View
        style={[
          styles.animatedView,
          {
            left: xValue,
          },
        ]}></Animated.View> */}
      <Animated.Image
        style={[
          styles.imageView,
          {
            left: xValue,
          },
        ]}
        source={{
          uri: 'https://images.wsj.net/im-196106?width=1280&size=1',
        }}
      />
      <TouchableOpacity style={styles.button} onPress={() => moveAnimation()}>
        <Text style={styles.buttonText}>Start Animation</Text>
      </TouchableOpacity>

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
  animatedView: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
  },
  button: {
    backgroundColor: 'steelblue',
    height: 45,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    padding: 12,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  imageView: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
  },
});
