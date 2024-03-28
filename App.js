import { View, Text } from 'react-native'
import React from 'react'
import Mystack from './src/navigation/Mystack'
import { NavigationContainer } from '@react-navigation/native'
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <NavigationContainer>
      <Mystack/>
    </NavigationContainer>
  )
}

export default App