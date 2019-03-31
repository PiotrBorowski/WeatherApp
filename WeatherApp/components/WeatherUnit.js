import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export class WeatherUnit extends React.Component {
  render() {
    return (
    <View style={styles.container}>
        <Text style={styles.hour}>{this.props.hour}</Text>

        <View>
            <Text style={styles.temperature}>{this.props.temperature}{"\u2103"}</Text>      
            <Text style={styles.wind}>Wiatr: {this.props.wind}</Text>
            <Text style={styles.rain}>Opady: {this.props.rain}</Text>
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
        fontSize: 14
    },
    wind:{
        fontSize: 12
        
    },
    rain: {
        fontSize: 12
        
    }
})