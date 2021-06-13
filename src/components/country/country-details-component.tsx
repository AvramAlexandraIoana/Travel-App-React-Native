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
import FormButton from '../custom-fields/form-button';
import {GlobalContext} from '../context/global-state';

const CountryDetails = ({route}: {route: any}) => {
  const navigation = useNavigation();
  const {showLoading, getCountry, countryName, setCountryName} =
    useContext(GlobalContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    setCountryName('');
    if (isFocused) {
      getCountry(route.params.id);
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
      <View style={styles.textContainer}>
        <Text style={styles.text}>Country Details</Text>
      </View>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Country Name: {countryName} </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Text>{showLoading}</Text>
      {showLoading && <Loader></Loader>}
    </View>
  );
};

export default CountryDetails;

const styles = StyleSheet.create({
  backContainer: {
    position: 'absolute',
    left: 10,
    top: 0,
  },
  logo: {
    height: 150,
    width: windowWidth,
    resizeMode: 'cover',
  },
  textContainer: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10,
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
