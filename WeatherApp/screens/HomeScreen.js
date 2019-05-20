import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  AsyncStorage
} from 'react-native';

import { WEATHER_API_HOMESCREEN, WEATHER_API_ID, WEATHER_API_ICON } from '../constants/url';
import WeatherService from '../Services/WeatherService';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import {LinearGradient}from 'expo'
import StorageService from '../Services/StorageService';

export default class HomeScreen extends React.Component {
  
  alertMe(){
    alert
  }

  constructor(props){
    super(props);
    this.state =
    { 
      longitude: 0,
      latitude: 0,
      temperature: 0,
      pressure: 0,
      humidity: 0,
      iconUrl: '01d',
      wind: 0,
      cityName: '',
      description: '',
      date: '01-01-2001'
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Home",
      headerRight: (
        <View style={styles.addButton}>
          <Button
            style={styles.headerButton}
            onPress={() => navigation.navigate('AddCity')}
            title="Cities"
            color='rgba(96,100,109, 0.5)'      
          />       
        </View>        
      )
    };
  };

  componentDidMount(){
      this.getLocation();
    }

  componentDidUpdate(){
      this.getWeatherByName();
    }

  getLocation(){
      navigator.geolocation.getCurrentPosition(
        (e) => {
            this.setState({
              longitude: e.coords.longitude,
              latitude: e.coords.latitude
          })
          this.getWeather();
        },
        (error) => {this.getWeatherByName()},
        { enableHighAccuracy: true}
    );  
  }

  async getWeather(){
    WeatherService.CallService(WEATHER_API_HOMESCREEN + '?lat='+ this.state.latitude + '&lon=' + this.state.longitude + '&cnt=1' + WEATHER_API_ID)
    .then(    
      async (response) => {this.setState({
        temperature: response.list[0].main.temp-273, 
        cityName: response.city.name,
        iconUrl: response.list[0].weather[0].icon,
        pressure: response.list[0].main.pressure,
        humidity: response.list[0].main.humidity,
        wind: response.list[0].wind.speed,
        description: response.list[0].weather[0].description,
        date: response.list[0].dt_txt
      })

      await StorageService.storeValue('currentCity',this.state.cityName);
      }
      );
  }

  async getWeatherByName(){
    const city = await StorageService.retrieveData('currentCity');

    if(city != null)
    {
      WeatherService.CallService(WEATHER_API_HOMESCREEN + '?q=' + city + '&cnt=1&' +  WEATHER_API_ID)
      .then(
        (response) => this.setState({
          temperature: response.list[0].main.temp-273, 
          cityName: response.city.name,
          iconUrl: response.list[0].weather[0].icon,
          pressure: response.list[0].main.pressure,
          humidity: response.list[0].main.humidity,
          wind: response.list[0].wind.speed,
          description: response.list[0].weather[0].description,
          date: response.list[0].dt_txt
        })
        );
    }
  }

  render() {
    return (
      <View style={styles.container}> 
      <LinearGradient colors={['#e2f4f4', '#aaf6f4', '#a3e5f9']}
          style={styles.container}>
        <Text style={styles.cityName}>{this.state.cityName}</Text> 
        <Text style={styles.date}>{this.state.date}</Text> 


        <View style={styles.weatherContainer}>
          <Image 
          source={{
            uri: WEATHER_API_ICON + this.state.iconUrl + '.png'}} 
          style={styles.imageStyle}/>
        </View>
        <View style={styles.weatherContainer}>
          <Text style={styles.temperature}>{this.state.temperature.toFixed(0)}{"\u2103"}</Text>  
        </View>

        <View style={styles.weatherContainer}>
          <Text style={styles.description}>{this.state.description}</Text>  
        </View>

        <View style={styles.additionalInfoContainer}>
          <Text style={styles.additionalInfo}><MaterialCommunityIcons name='weather-fog' size={12}/> Humidity: {this.state.humidity}%</Text>
          <Text style={styles.additionalInfo}><Feather name='arrow-down' size={12}/> Pressure: {this.state.pressure} hPa</Text>
          <Text style={styles.additionalInfo}><Feather name='wind' size={12}/> Wind: {this.state.wind} km/h</Text>         
        </View>
        
        <Button
         style={styles.headerButton}
         onPress={() => { this.getLocation()}}
         title="GPS"
         color='rgba(96,100,109, 0.5)' 
        />
        </LinearGradient>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  addButton: {
    margin: 5,
    flexDirection:'row', 
    flexWrap:'wrap',
     justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cityName: {
    fontSize: 32,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  date: {
    fontSize: 18,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  description: {
    fontSize: 26,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  temperature: {
    fontSize: 50,
    textAlign: 'center',
  },
  imageStyle:{ 
    resizeMode: 'contain',
    flex: 1,
    alignSelf: 'auto'
  },
  weatherContainer: {
    flex: 1,
    margin: 6,
  },
  additionalInfoContainer:{
    margin: 10
  },
  additionalInfo: {
    fontSize: 14
  },
  headerButton: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10
  }
});
