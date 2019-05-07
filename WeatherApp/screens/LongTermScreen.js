import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { WEATHER_API_LONGTERM, WEATHER_API_ID, WEATHER_API_LONGTERM_SAMPLE } from '../constants/url';
import WeatherService from '../Services/WeatherService';
import { WeatherUnitDaily } from '../components/WeatherUnitDaily';
import moment from 'moment';
import StorageService from '../Services/StorageService';


export default class LongTermScreen extends React.Component {
  static navigationOptions = {
    title: 'Prognoza długoterminowa',
  };

  constructor(props){
    super(props);
    this.state = {
       weatherArray: [],
       cityName: ""
      }
  }

  async componentDidMount(){
    const city = await StorageService.retrieveData('currentCity');
    if(city != null)
    {
      WeatherService.CallService(WEATHER_API_LONGTERM_SAMPLE)
      .then(
        (response) => 
        this.setState({weatherArray: response.list, cityName: response.city.name}));
    }
  }

  convertToDate = (stamp) =>{
    var t = moment(new Date(stamp*1000)).format("DD MMMM");
    return t;
  }

  renderWeather = () => {
    if(this.state.weatherArray != null)
    return this.state.weatherArray.map(weather => {
      return <WeatherUnitDaily key={weather.dt} id={weather.dt} date={this.convertToDate(weather.dt)} temperature={weather.temp.day-273.15} pressure={weather.pressure} humidity={weather.humidity}/> }
  );
  }


  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
      <Text style={styles.cityName}>{this.state.cityName}</Text>
        <ScrollView>
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