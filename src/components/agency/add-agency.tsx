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

const AddAgency = () => {
  const navigation = useNavigation();

  const [agencyName, setAgencyName] = useState('');
  const [locationId, setLocationId] = useState('');
  const [locationList, setLocationList] = useState([] as any);
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

  const addAgency = (name: string, locationId: string) => {
    console.log(name);
    console.log(locationId);
    refAgency
      .add({
        name: name,
        locationId: locationId,
      })
      .then((response: any) => {
        navigation.navigate('AddAgency');
        console.log('Agentie adaugata cu succes');
        console.log(response);
      })
      .catch((error: any) => {
        console.log('Eroare');
        setErrorMessage(errorMessage);
      });
  };

  useEffect(() => {
    getLocationList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Agency</Text>
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
            {locationList.map((item: any, i: number) => (
              <Picker.Item key={i} label={item.city} value={item.id} />
            ))}
          </Picker>
        </View>
      }

      <FormButton
        buttonTitle="Add Agency"
        onPress={() => {
          addAgency(agencyName, locationId);
        }}
      />
      {showLoading && <Loader></Loader>}
    </View>
  );
};

export default AddAgency;

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
