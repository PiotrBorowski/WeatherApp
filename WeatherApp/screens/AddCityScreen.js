import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { Constants } from 'expo';


export default class AddCityScreen extends React.Component {
  static navigationOptions = {
    title: 'Dodawanie miasta',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.MainContainer}>
        
      </View>
    );
  }
}


  const styles = StyleSheet.create({
    MainContainer :{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,      
    },
  });