import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { Constants } from 'expo';


export default class LongTermScreen extends React.Component {
  static navigationOptions = {
    title: 'Mapa Pogodowa',
  };

  constructor(){
      super();

      this.state = {
          imageURL : 'https://www.conceptdraw.com/How-To-Guide/picture/Geo-map-europe-poland.png'
      }
  }
  
  _onPressLocalMap=()=>
  {
      this.setState({
            imageURL : 'https://www.conceptdraw.com/How-To-Guide/picture/Geo-map-europe-poland.png'
      })
  }
  
  _onPressEuropeMap=()=>
  {
    this.setState({
        imageURL : 'https://www.conceptdraw.com/How-To-Guide/picture/geo-map-europe-germany/Geo-map-europe.png'
    })
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.MainContainer}>
        <Image
          source={{ uri: this.state.imageURL }}
          style={styles.imageStyle}
        />
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this._onPressLocalMap}
              color={styles.button.color}
              title="Polska"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this._onPressEuropeMap}
              color={styles.button.color}
              title="Europa"
            />
          </View>
        </View>
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
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
    },
    buttonContainer: {
      flex: 1,
      margin: 6,
    },
    button: {
        color: "#AACC43",
    },
    imageStyle:{ 
        resizeMode: 'contain',
        flex: 1,
        alignSelf: 'stretch',
       }
  });