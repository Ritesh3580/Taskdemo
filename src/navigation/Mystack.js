import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListofData from '../screens/ListofData';
import SubmitData from '../screens/SubmitData';

const Stack = createNativeStackNavigator();

const Mystack = () => {
  return (
    <Stack.Navigator initialRouteName='ListofData'>
     

      <Stack.Screen
        name='ListofData'
        component={ListofData}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='SubmitData'
        component={SubmitData}
        //options={{headerShown:false}}
        options={({ route }) => ({ title: 'Detail Screen' })}

      />
    </Stack.Navigator>
  )
}

export default Mystack