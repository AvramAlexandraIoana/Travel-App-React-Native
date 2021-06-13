import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useContext} from 'react';
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
import {GlobalContext, GlobalProvider} from '../context/global-state';
import auth from '@react-native-firebase/auth';

type screenProp = StackNavigationProp<RootStackParamList, 'CountryList'>;

const CountryList = () => {
  const navigation = useNavigation();
  const ref = firestore().collection('country');
  const isFocused = useIsFocused();
  const {
    countryList,
    getCountryList,
    deleteCountry,
    showLoading,
    errorMessage,
  } = useContext(GlobalContext);
  console.log(countryList);

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(error => {
        console.log(error);
        errorMessage(error);
      });
  };

  useEffect(() => {
    if (isFocused) {
      console.log('called');
      getCountryList();
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Button
          onPress={() => {
            navigation.navigate('AddCountry');
          }}
          title="Add Country"
          color="#6495ed"></Button>
      </View>
      {countryList &&
        countryList.map((item: any, i: number) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Country Name: {item.name}</ListItem.Title>
              <View style={styles.footerWrapper}>
                <Button
                  onPress={() => {
                    navigation.navigate('CountryUpdate', {id: item.id});
                  }}
                  title="Update"
                  color="#ff8c00"
                />
                <View style={{marginLeft: 10}}>
                  <Button
                    onPress={() => {
                      deleteCountry(item.id);
                    }}
                    title="Delete"
                    color="#ff0000"
                  />
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}

      <View>
        <Button
          onPress={() => {
            logOut();
            if (!errorMessage) {
              navigation.navigate('Login');
            }
          }}
          title="Log Out"
          color="#6495ed"></Button>
      </View>
      <Text>{showLoading}</Text>
      {showLoading && <Loader></Loader>}
    </ScrollView>
  );
};

export default CountryList;

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
