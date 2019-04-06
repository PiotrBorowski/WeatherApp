import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';


export class WeatherUnit extends React.Component {
  render() {
    if (!this.props.rain) isItRaining = "brak";
    else isItRaining = this.props.rain;
    return (
    <View style={styles.container}>
        <Text style={styles.hour}>{this.props.hour}</Text>
        <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'space-between'}}>
            <Text style={styles.temperature}>{this.props.temperature.toString().substr(0,5)}{"\u2103"}</Text>      
            <Text style={styles.wind}><Feather name='wind' size={12}/> Wiatr: {this.props.wind} km/h</Text>
            <Text style={styles.rain}><Feather name='cloud-rain' size={12}/> Opady: {isItRaining}</Text>
        </View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginRight:10,
      marginLeft:10,
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#d6ebf2',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff'
    },
    hour: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 16,
      lineHeight: 19,
      textAlign: 'center',
    },
    temperature: {
        fontSize: 20,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    wind:{
        fontSize: 12,
        marginLeft: 20
        
    },
    rain: {
        fontSize: 12,
        marginLeft: 20
        
    }
})