import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParams';
import AddCountry from './src/components/country/add-country-component';
import CountryList from './src/components/country/country-list-component';
import MainScreen from './src/components/main/main-component';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="CountryList" component={CountryList} />
        <Stack.Screen name="AddCountry" component={AddCountry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}