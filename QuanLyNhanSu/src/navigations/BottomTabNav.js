import React from 'react';
import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ListRoom from '../screens/Room/ListRoom';
import ListStaff from '../screens/Staff/ListStaff';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialBottomTabNavigator();
const BottomTabNav = () => {
    return (
      <Tab.Navigator
        initialRouteName="ListRoom"
        activeColor="#ffff"
        barStyle={{backgroundColor: 'tomato'}}
        shifting={true}>
        <Tab.Screen
          name="ListRoom"
          component={ListRoom}
          options={{
            tabBarLabel: 'Danh Sách Phòng Ban',
            tabBarColor: 'tomato',
            tabBarIcon: ({color}) => (
              <FontAwesome name="building" color={color} size={24} />
            ),
          }}
        />
       
        <Tab.Screen
          name="ListStaff"
          component={ListStaff}
          options={{
            tabBarLabel: 'Danh Sách Nhân Viên',
            tabBarColor: 'tomato',
            tabBarIcon: ({color}) => (
              <FontAwesome name="users" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  
  export default BottomTabNav;