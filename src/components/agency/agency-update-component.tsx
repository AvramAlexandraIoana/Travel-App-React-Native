import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {RootStackParamList} from '../../../RootStackParams';
import {windowWidth} from '../../utils/dimension';
import firestore from '@react-native-firebase/firestore';
import FormButton from '../custom-fields/form-button';
import FormInput from '../custom-fields/form-input';
import Input from '../custom-fields/input';
import Loader from '../custom-fields/loader';
import {Picker} from '@react-native-picker/picker';
import {Icon} from 'react-native-elements';
import {GlobalContext} from '../context/global-state';

const AgencyUpdate = ({route}: {route: any}) => {
  const navigation = useNavigation();
  const {
    locationList,
    getLocationList,
    agencyName,
    setAgencyName,
    locationId,
    setLocationId,
    updateAgency,
    getAgency,
    showLoading,
    errorMessage,
  } = useContext(GlobalContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    setLocationId('');
    setAgencyName('');
    if (isFocused) {
      console.log('called');
      getLocationList();
      getAgency(route.params.id);
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
            {locationList.map((item: any, i: number) => (
              <Picker.Item key={i} label={item.city} value={item.id} />
            ))}
          </Picker>
        </View>
      }

      <FormButton
        buttonTitle="Update Agency"
        onPress={() => {
          updateAgency(route.params.id, agencyName, locationId);
          if (!errorMessage) {
            navigation.navigate('AgencyList');
          }
        }}
      />
      {showLoading && <Loader></Loader>}
    </View>
  );
};

export default AgencyUpdate;

const styles = StyleSheet.create({
  backContainer: {
    position: 'absolute',
    left: 10,
    top: 0,
  },
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
