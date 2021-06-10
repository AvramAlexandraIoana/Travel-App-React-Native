import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './src/components/auth/sign-up-component';
import Login from './src/components/auth/login-component';
import Dashboard from './src/components/auth/dashboard-component';
import AddCountry from './src/components/country/add-country-component';
import CountryUpdate from './src/components/country/country-update-component';
import AddLocation from './src/components/location/add-location-component';
import LocationList from './src/components/location/location-list-component';
import UpdateLocation from './src/components/location/update-location-component';
import CountryList from './src/components/country/country-list-component';
import CountryDetails from './src/components/country/country-details-component';
import AddAgency from './src/components/agency/add-agency';
import AgencyList from './src/components/agency/agency-list-component';
import AgencyUpdate from './src/components/agency/agency-update-component';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="AgencyList">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'Login Page'}}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: 'SignUp Page'}}
      />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{title: 'Dashboard Page'}}
      />

      <Stack.Screen
        name="AddCountry"
        component={AddCountry}
        options={{title: ''}}
      />

      <Stack.Screen
        name="CountryDetails"
        component={CountryDetails}
        options={{title: 'Country Details'}}
      />

      <Stack.Screen
        name="CountryList"
        component={CountryList}
        options={{title: 'Country List'}}
      />

      <Stack.Screen
        name="CountryUpdate"
        component={CountryUpdate}
        options={{title: ''}}
      />

      <Stack.Screen
        name="AddLocation"
        component={AddLocation}
        options={{title: ''}}
      />

      <Stack.Screen
        name="UpdateLocation"
        component={UpdateLocation}
        options={{title: ''}}
      />

      <Stack.Screen
        name="LocationList"
        component={LocationList}
        options={{title: 'Location List'}}
      />

      <Stack.Screen
        name="AddAgency"
        component={AddAgency}
        options={{title: ''}}
      />

      <Stack.Screen
        name="AgencyUpdate"
        component={AgencyUpdate}
        options={{title: ''}}
      />
      <Stack.Screen
        name="AgencyList"
        component={AgencyList}
        options={{title: 'Agency List'}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
