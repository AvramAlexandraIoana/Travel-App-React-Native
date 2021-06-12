import * as React from 'react';
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
import LocationDetails from './src/components/location/location-details-component';
import AddTrip from './src/components/trip/add-trip-component';
import TripList from './src/components/trip/trip-list-component';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import UpdateTrip from './src/components/trip/update-trip-component';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="TripList">
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Drawer.Screen
          name="SignUp"
          component={SignUp}
          options={{title: 'SignUp'}}
        />

        <Drawer.Screen
          name="AddCountry"
          component={AddCountry}
          options={{title: 'Add Country'}}
        />
        <Drawer.Screen
          name="CountryDetails"
          component={CountryDetails}
          options={{title: 'Country Details'}}
        />
        <Drawer.Screen
          name="CountryList"
          component={CountryList}
          options={{title: 'Country List'}}
        />
        <Drawer.Screen
          name="CountryUpdate"
          component={CountryUpdate}
          options={{title: 'Country Update'}}
        />

        <Drawer.Screen
          name="AddLocation"
          component={AddLocation}
          options={{title: 'Add Location'}}
        />
        <Drawer.Screen
          name="LocationDetails"
          component={LocationDetails}
          options={{title: 'Location Details'}}
        />
        <Drawer.Screen
          name="LocationList"
          component={LocationList}
          options={{title: 'Location List'}}
        />
        <Drawer.Screen
          name="UpdateLocation"
          component={UpdateLocation}
          options={{title: 'Update Location'}}
        />

        <Drawer.Screen
          name="AddAgency"
          component={AddAgency}
          options={{title: 'Add Agency'}}
        />

        <Drawer.Screen
          name="AgencyList"
          component={AgencyList}
          options={{title: 'Agency List'}}
        />
        <Drawer.Screen
          name="AgencyUpdate"
          component={AgencyUpdate}
          options={{title: 'Agency Update'}}
        />

        <Drawer.Screen
          name="AddTrip"
          component={AddTrip}
          options={{title: 'Add Trip'}}
        />
        <Drawer.Screen
          name="UpdateTrip"
          component={UpdateTrip}
          options={{title: 'Update Trip'}}
        />
        <Drawer.Screen
          name="TripList"
          component={TripList}
          options={{title: 'Trip List'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
