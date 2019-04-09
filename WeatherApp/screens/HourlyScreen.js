import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { WeatherUnit } from '../components/WeatherUnit';
import {WEATHER_API_SAMPLE, WEATHER_API} from '../constants/url'
import WeatherService from '../Services/WeatherService';

export default class HourlyScreen extends React.Component {
  static navigationOptions = {
    title: 'Prognoza Godzinowa',
  };

  constructor(props){
    super(props);
    this.state ={ weatherArray: []}
  }

  componentDidMount(){
  WeatherService.CallService(WEATHER_API).then((response) => this.setState({weatherArray: response.list}));
  }

  renderWeather = () => {
    if(this.state.weatherArray != null)
    return this.state.weatherArray.map(weather => {
      return <WeatherUnit hour={weather.dt_txt} temperature={weather.main.temp-273.15} wind={weather.wind.speed}/> }
  );
  }

  

  render() {
    return (
      <ScrollView style={styles.container}>
      
        {this.renderWeather()}

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