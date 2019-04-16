import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';


export class WeatherUnitDaily extends React.Component {
  render() {
    return (
    <View style={styles.container}>
        <Text style={styles.date}>{this.props.date}</Text>
        <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'space-between'}}>
            <Text style={styles.temperature}>{this.props.temperature.toString().substr(0,3)}{"\u2103"}</Text>      
            <Text style={styles.pressure}><Feather name='arrow-down' size={12}/> Ciśnienie: {this.props.pressure}hPa</Text>
            <Text style={styles.humidity}><MaterialCommunityIcons name='weather-fog' size={12}/> Wilgotność: {this.props.humidity}%</Text>
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
    date: {
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
    pressure:{
        fontSize: 12,
        marginLeft: 20
        
    },
    humidity: {
        fontSize: 12,
        marginLeft: 20
        
    }
})