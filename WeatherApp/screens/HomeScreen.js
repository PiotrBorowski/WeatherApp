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
            onPress={() => navigation.navigate('AddCity')}
            title="Miasta"
            color='rgba(96,100,109, 0.5)'      
          />
        </View>        
      )
    };
  };

  componentDidMount(){
      this.getLocation();
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
        (error) => Alert.alert(error.message),
        { enableHighAccuracy: false}
    );  
  }

  async getWeather(){
    WeatherService.CallService(WEATHER_API_HOMESCREEN + '?lat='+ this.state.latitude + '&lon=' + this.state.longitude + '&cnt=1&' + WEATHER_API_ID)
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

  render() {
    return (
      <View style={styles.container}> 
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
          <Text style={styles.additionalInfo}><MaterialCommunityIcons name='weather-fog' size={12}/> Wilgotność: {this.state.humidity}%</Text>
          <Text style={styles.additionalInfo}><Feather name='arrow-down' size={12}/> Ciśnienie: {this.state.pressure} hPa</Text>
          <Text style={styles.additionalInfo}><Feather name='wind' size={12}/> Wiatr: {this.state.wind} km/h</Text>
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  addButton: {
    margin: 5,
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
  }
});
