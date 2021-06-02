import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './src/components/auth/sign-up-component';
import Login from './src/components/auth/login-component';
import Dashboard from './src/components/auth/dashboard-component';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Signup">
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
