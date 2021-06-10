import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {RootStackParamList} from '../../../RootStackParams';
import {windowWidth} from '../../utils/dimension';
import firestore from '@react-native-firebase/firestore';
import FormButton from '../custom-fields/form-button';
import FormInput from '../custom-fields/form-input';
import Input from '../custom-fields/input';
import Loader from '../custom-fields/loader';
import {Picker} from '@react-native-picker/picker';

const AgencyUpdate = ({route}) => {
  const navigation = useNavigation();

  const [agencyName, setAgencyName] = useState('');
  const [locationId, setLocationId] = useState('');
  const [locationList, setLocationList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const refLocation = firestore().collection('location');
  const refAgency = firestore().collection('agency');

  const getLocationList = async () => {
    setShowLoading(true);
    try {
      var list: any = [];
      var snapshot = await refLocation.get();
      snapshot.forEach(res => {
        const {city} = res.data();
        list.push({
          id: res.id,
          city,
        });
      });
      console.log(list);
      setLocationList([...list]);
      setShowLoading(false);
    } catch (e) {
      console.log(e);
      setErrorMessage('Error');
    }
  };

  const getAgency = () => {
    const dbRef = refAgency.doc(route.params.id);
    dbRef
      .get()
      .then((response: any) => {
        console.log(response);
        if (response.exists) {
          const agency = response.data();
          console.log(agency);
          setAgencyName(agency.name);
          setLocationId(agency.locationId);
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
    getLocationList();
  }, []);

  const updateAgency = (id: string) => {
    const dbRef = refAgency.doc(id);
    dbRef
      .set({
        name: agencyName,
        locationId: locationId,
      })
      .then(response => {
        navigation.navigate('AgencyList');
      })
      .catch(error => {
        console.log('Error', error);
        setErrorMessage(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Update Agency</Text>
      <Input
        labelValue={agencyName}
        onChangeText={(agencyName: string) => setAgencyName(agencyName)}
        placeholderText="Agency Name"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {
        <View style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 4}}>
          <Picker
            selectedValue={locationId}
            style={{height: 50}}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue != '0');
              if (itemValue != '0') {
                console.log(itemValue);
                setLocationId(itemValue);
              }
            }}>
            <Picker.Item label="Select City" value="0" />
            {locationList.map((item: any, i) => (
              <Picker.Item key={i} label={item.city} value={item.id} />
            ))}
          </Picker>
        </View>
      }

      <FormButton
        buttonTitle="Update Agency"
        onPress={() => {
          updateAgency(route.params.id);
        }}
      />
      {showLoading && <Loader></Loader>}
    </View>
  );
};

export default AgencyUpdate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    padding: 20,
  },
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
});
