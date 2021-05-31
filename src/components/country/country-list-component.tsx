import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../RootStackParams';

type screenProp = StackNavigationProp<RootStackParamList, 'CountryList'>;

const CountryList = () => {
  const navigation = useNavigation<screenProp>();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Country List Screen</Text>
      <Button
        title="Add Country"
        onPress={() => navigation.navigate('AddCountry')}
      />
    </View>
  );
};

export default CountryList;
