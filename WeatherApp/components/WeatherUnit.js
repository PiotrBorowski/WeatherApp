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
      backgroundColor: '#ffa',
      marginBottom: 10
    },
    hour: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 16,
      lineHeight: 19,
      textAlign: 'center',
    },
    temperature: {
        fontSize: 12
    },
    wind:{
        fontSize: 12
        
    },
    rain: {
        fontSize: 12
        
    }
})