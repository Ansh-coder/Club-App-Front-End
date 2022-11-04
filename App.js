import React from 'react';
import { StyleSheet } from 'react-native';
// import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from './src/screens/SignInScreen';
import LogInScreen from './src/screens/LogInScreen';
import TextInputField from './src/components/TextInputField';
import MainScreen from './src/screens/MainScreen';
import { appBackgroundColor } from './src/UniversalAppDesignVars';




const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  render(){
    return (
      <>
      
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName = "Log In"
        >
          <Stack.Screen name = "Log In" component = {LogInScreen}/>
          <Stack.Screen name = "Sign Up" component = {SignInScreen}/>
          <Stack.Screen 
          name = "Main Screen" 
          component = {MainScreen}
          options={{
            headerShown: false
            }}
          /> 
          {/*<Stack.Screen 
          name = "Advisor Club View" 
          component = {AdvisorClubView}
          options={{
            headerShown: false
            }}
          /> 
        */}
        </Stack.Navigator>
      </NavigationContainer>

      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: appBackgroundColor
  }
  }


  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
);

