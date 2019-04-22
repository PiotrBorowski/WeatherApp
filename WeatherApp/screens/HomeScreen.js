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
  Alert
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { WEATHER_API_HOMESCREEN, WEATHER_API_ID } from '../constants/url';
import WeatherService from '../Services/WeatherService';


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
      cityName: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Home",
      headerRight: (
        <Button
          onPress={() => navigation.navigate('AddCity')}
          title="Dodaj miasto"
          color="#f123"
        />
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
        {enableHighAccuracy: true, timeout: 20000, maximumAge:1000}
    );  
  }

  getWeather(){
    WeatherService.CallService(WEATHER_API_HOMESCREEN + '?lat='+ this.state.latitude + '&lon=' + this.state.longitude + '&cnt=1&' + WEATHER_API_ID).then((response) => this.setState({temperature: response.list[0].main.temp-273, cityName: response.city.name}));
  }

  render() {
    return (
      <View style={styles.container}> 
        <Text style={styles.cityName}>{this.state.cityName}</Text>    
        <Text>{this.state.temperature.toFixed(2)}</Text>  
      </View>
    );
  }

 

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  cityName: {
    fontSize: 32,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
