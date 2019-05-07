import React from 'react';
import { ScrollView, StyleSheet, View, Text, AsyncStorage, Alert } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { WeatherUnit } from '../components/WeatherUnit';
import {WEATHER_API_ID, WEATHER_API_HOUR, WEATHER_API_ICON} from '../constants/url'
import WeatherService from '../Services/WeatherService';
import StorageService from '../Services/StorageService';

export default class HourlyScreen extends React.Component {
  static navigationOptions = {
    title: 'Prognoza Godzinowa',
  };

  constructor(props){
    super(props);
    this.state ={ 
      weatherArray: [],
      cityName: ''
    }
  }

  

  async componentDidMount(){
  const city = await StorageService.retrieveData('currentCity');

    if(city != null)
    {
      WeatherService.CallService(WEATHER_API_HOUR + city + WEATHER_API_ID).then((response) => this.setState({weatherArray: response.list, cityName: response.city.name}));
    }
  }

  renderWeather = () => {
    if(this.state.weatherArray != null)
    return this.state.weatherArray.map(weather => {
      return <WeatherUnit key={weather.dt_text} id={weather.dt_text} hour={weather.dt_txt} temperature={weather.main.temp-273.15} wind={weather.wind.speed}/> }
  );
  }

  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.cityName}>{this.state.cityName}</Text>
        <ScrollView >
          {this.renderWeather()}
        </ScrollView>
      </View>
 
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
  },
  cityName: {
    fontSize: 32,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});