import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from '../../../RootStackParams';

type screenProp = StackNavigationProp<RootStackParamList, 'LocationList'>;

const LocationList = () => {
  const navigation = useNavigation<screenProp>();
  return (
    <View>
      <Text>Location List Screen</Text>
    </View>
  );
}

export default LocationList;