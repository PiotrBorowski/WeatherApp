import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { WeatherUnit } from '../components/WeatherUnit';

export default class HourlyScreen extends React.Component {
  static navigationOptions = {
    title: 'Pogoda Godzinowa',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
          
        <WeatherUnit hour="11:00" temperature="10" rain="0" wind="1"></WeatherUnit>
        <WeatherUnit hour="12:00" temperature="10" rain="0" wind="1"></WeatherUnit>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  }
});
