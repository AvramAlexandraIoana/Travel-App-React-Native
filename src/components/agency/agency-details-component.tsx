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
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../RootStackParams';
import {windowWidth} from '../../utils/dimension';
import firestore from '@react-native-firebase/firestore';
import {ListItem, Avatar, Icon} from 'react-native-elements';
import Loader from '../custom-fields/loader';
import FormButton from '../custom-fields/form-button';

const AgencyDetails = ({route}: {route: any}) => {
  const navigation = useNavigation();

  const [agencyName, setAgencyName] = useState('');
  const [locationId, setLocationId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const ref = firestore().collection('agency');

  const getAgency = () => {
    const dbRef = ref.doc(route.params.id);
    dbRef
      .get()
      .then((response: any) => {
        console.log(response);
        if (response.exists) {
          const agency = response.data();
          setAgencyName(agency.name);
          setLocationId(agency.locationId);
          console.log(agency);
        } else {
          console.log('Agency does not exist!');
        }
      })
      .catch((error: any) => {
        console.log('Eroare');
        setErrorMessage(error);
      });
  };

  useEffect(() => {
    getAgency();
  }, []);

  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.text}>Agency Details</Text>
      </View>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Agency Name: {agencyName} </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Text>{showLoading}</Text>
      {showLoading && <Loader></Loader>}
    </ScrollView>
  );
};

export default AgencyDetails;

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'white',
  },
  logo: {
    height: 150,
    width: windowWidth,
    resizeMode: 'cover',
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
