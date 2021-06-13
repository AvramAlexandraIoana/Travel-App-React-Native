import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../custom-fields/form-button';
import Input from '../custom-fields/input';
import firestore from '@react-native-firebase/firestore';
import {Icon} from 'react-native-elements';
import {GlobalContext} from '../context/global-state';

const CountryUpdate = ({route}: {route: any}) => {
  const navigation = useNavigation();

  const {errorMessage, getCountry, countryName, setCountryName, updateCountry} =
    useContext(GlobalContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    setCountryName('');
    if (isFocused) {
      console.log('called');
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
      <Text style={styles.text}>Update country</Text>
      <Input
        labelValue={countryName}
        onChangeText={(countryName: string) => setCountryName(countryName)}
        placeholderText="Country Name"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormButton
        buttonTitle="Update Country"
        onPress={() => {
          updateCountry(route.params.id, countryName);
          if (!errorMessage) {
            navigation.navigate('CountryList');
          }
        }}
      />
    </View>
  );
};

export default CountryUpdate;

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
  text: {
    fontSize: 20,
    color: '#333333',
  },
});
