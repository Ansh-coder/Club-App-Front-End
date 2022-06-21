import React from 'react';
import { FlatList, Platfrom, ScrollView, Slider, StatusBar, StyleSheet, Switch, Text, TouchableWithoutFeedback, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { AppLoading } from 'expo';
import SignInScreen from './src/screens/SingInScreen';
import TextInputField from './src/components/TextInputField';

export default class App extends React.Component {
  render(){
    return (
      <>
      <View style = {styles.root}>
        <SignInScreen/>
      </View>
      </>
        
        
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#440bd4'
  }
  }


  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
);

