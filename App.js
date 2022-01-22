import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import ISSLocation from './screens/ISS-Location';
import Meteors from './screens/Meteors';

const Stack = createStackNavigator()

export default class App extends React.Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='ISS-Location' component={ISSLocation}/>
          <Stack.Screen name='Meteors' component={Meteors}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

