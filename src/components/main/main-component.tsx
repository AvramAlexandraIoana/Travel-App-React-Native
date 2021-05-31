
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MainBottomTabParamList } from '../../../MainBottomTabParams';
import CountryList from '../country/country-list-component';
import LocationList from '../location/location-list-component';


const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

const MainScreen = ()  => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="CountryList" component={CountryList} />
      <BottomTab.Screen name="LocationList" component={LocationList} />
    </BottomTab.Navigator>
  );
}

export default MainScreen;