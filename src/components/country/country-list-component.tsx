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
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../RootStackParams';
import {windowWidth} from '../../utils/dimension';
import firestore from '@react-native-firebase/firestore';
import {Icon, ListItem} from 'react-native-elements';
import {isWhiteSpaceLike} from 'typescript';

type screenProp = StackNavigationProp<RootStackParamList, 'CountryList'>;

const CountryList = () => {
  const navigation = useNavigation<screenProp>();
  const [countryList, setCountryList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const ref = firestore().collection('country');

  const getCountryList = async () => {
    try {
      var list: any = [];
      var snapshot = await ref.get();
      snapshot.forEach(doc => {
        list.push(doc.data());
      });
      setCountryList([...list]);
    } catch (e) {
      console.log(e);
      setErrorMessage('Error');
    }
  };
  useEffect(() => {
    getCountryList();
  });

  return (
    <View style={styles.container}>
      <Text>Country List</Text>
    </View>
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
    paddingTop: 22,
    backgroundColor: '#f9fafd',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
