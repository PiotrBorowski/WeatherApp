import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { WeatherUnit } from '../components/WeatherUnit';

export default class HourlyScreen extends React.Component {
  static navigationOptions = {
    title: 'Prognoza Godzinowa',
  };

  constructor(props){
    super(props);
    this.state ={ weatherArray: []}
  }

  componentDidMount(){
    {/* Przykładowy link do api, funkcjonalnosc bedzie przeniesiona do WeatherService.js */}
    return fetch('https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1')
    .then((responsejson) => responsejson.json())  
    .then((response) => {
        this.setState({
          weatherArray: response.list
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  renderWeather = () => {
    if(this.state.weatherArray != null)
    return this.state.weatherArray.map(weather => {
      return <WeatherUnit hour="POBRANE Z API" temperature={weather.main.temp-273.15} wind={weather.wind.speed}/> }
  );
  }

  

  render() {
    return (
      <ScrollView style={styles.container}>

        <WeatherUnit hour="11:00" temperature="10" rain="0" wind="1"></WeatherUnit>
        <WeatherUnit hour="12:00" temperature="10" rain="0" wind="1"></WeatherUnit>
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
