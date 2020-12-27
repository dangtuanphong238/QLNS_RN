import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/Splash/Splash';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';

import AddRoom from '../screens/Room/AddRoom';
import UpdateRoom from '../screens/Room/UpdateRoom'

import AddStaff from "../screens/Staff/AddStaff";
import UpdateStaff from '../screens/Staff/UpdateStaff'

import BottomTabNav from '../navigations/BottomTabNav';
const Stack = createStackNavigator();

export default class AppNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        {/* <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={!this.state.token ? 'SplashScreen' : 'SignInScreen'}> */}
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={'BottomTabNav'}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="AddRoom" component={AddRoom} />
          <Stack.Screen name="UpdateRoom" component={UpdateRoom}/>
          <Stack.Screen name="AddStaff" component={AddStaff}/>
          <Stack.Screen name="UpdateStaff" component={UpdateStaff}/>

          <Stack.Screen name="BottomTabNav" component={BottomTabNav}/>

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
