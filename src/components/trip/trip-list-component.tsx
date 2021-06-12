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

type screenProp = StackNavigationProp<RootStackParamList, 'CountryList'>;

const TripList = () => {
  const navigation = useNavigation();
  const [countryList, setCountryList] = useState([] as any);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const ref = firestore().collection('country');
  const isFocused = useIsFocused();

  const getCountryList = async () => {
    setShowLoading(true);
    try {
      var list: any = [];
      var snapshot = await ref.get();
      snapshot.forEach(res => {
        const {name} = res.data();
        list.push({
          id: res.id,
          name,
        });
      });
      console.log(list);
      setShowLoading(false);
      setCountryList([...list]);
    } catch (e) {
      console.log(e);
      setErrorMessage('Error');
    }
  };

  useEffect(() => {
    if (isFocused) {
      console.log('called');
      getCountryList();
    }
  }, [isFocused]);

  const deleteCountry = (id: string) => {
    console.log(id);
    const dbRef = ref.doc(id);
    dbRef
      .delete()
      .then(res => {
        console.log('Country removed');
        getCountryList();
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
