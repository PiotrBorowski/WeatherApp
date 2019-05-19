import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import WeatherService from '../Services/WeatherService';
import { WEATHER_API_HOMESCREEN, WEATHER_API_ICON, WEATHER_API_ID } from '../constants/url';
import { Constants } from 'expo';


export default class LongTermScreen extends React.Component {
  static navigationOptions = {
    title: 'Mapa Pogodowa',
  };
  constructor(props){
      super(props);

      this.state = {
          imageURL : 'https://www.conceptdraw.com/How-To-Guide/picture/Geo-map-europe-poland.png',
          temperature: 0,
          iconUrl : '01d',
          europeTemperature: new Map(),
          europeIconUrl: new Map(),
          polandTemperature: new Map(),
          polandIconUrl: new Map(),
      }
      this.display = false;
      this.polandCityList = ['Szczecin', 'Poznan', 'Wroclaw', 'Gdansk', 'Warszawa', 'Krakow', 'Bialystok', 'Rzeszow'];
      this.europeCityList = ['Madrid', 'London', 'Paris', 'Berlin', 'Rome', 'Stockholm', 'Warsaw', 'Bucharest', 'Athens', 'Moscow'];
      //this.polandIconUrl = [];
      //this.europeIconUrl = [];
      //this.europeTemperature = [];
      //this.polandTemperature = [];
  }

  componentDidMount(){
    this.getWeather();
  }

  _onPressLocalMap=()=>
  {
      this.setState({
            imageURL : 'https://www.conceptdraw.com/How-To-Guide/picture/Geo-map-europe-poland.png'
      });
      this.display = false
  }
  
  _onPressEuropeMap=()=>
  {
    this.setState({
        imageURL : 'https://www.conceptdraw.com/How-To-Guide/picture/geo-map-europe-germany/Geo-map-europe.png'
    })
    this.display = true;
  }

  getWeather()
  {
    this.polandCityList.forEach(element => {
      WeatherService.CallService(WEATHER_API_HOMESCREEN + '?q=' + element + '&cnt=1' +  WEATHER_API_ID)
      .then(    
        (response) => {
          this.setState(state => 
            { state.polandTemperature[element] = response.list[0].main.temp-273
              return state.polandTemperature;
           });
        
           this.setState(state => 
            { state.polandIconUrl[element] = response.list[0].weather[0].icon
              return state.polandIconUrl;
           });
      
    });});

    this.europeCityList.forEach(element => {
      WeatherService.CallService(WEATHER_API_HOMESCREEN + '?q=' + element + '&cnt=1' +  WEATHER_API_ID)
      .then(    
        (response) => {
          this.setState(state => 
            { state.europeTemperature[element] = response.list[0].main.temp-273
              return state.europeTemperature;
           });
        
           this.setState(state => 
            { state.europeIconUrl[element] = response.list[0].weather[0].icon
              return state.europeIconUrl;
           });
      
    });});
    
    
  }

  displayWeather()
  {
    if(this.display)
    {
      return ( <View style={styles.CNT}>
      <Image 
      source={{ uri: WEATHER_API_ICON + this.state.europeIconUrl[this.europeCityList[0]] + '.png'}} 
      style={[styles.imageIcon, {top: 80, left: -170}]}/> 
      <Text style={[styles.comment, {top: 135, left: -170}]}> {this.europeCityList[0]} {"\n"} {parseFloat((this.state.europeTemperature[this.europeCityList[0]])).toFixed(0)}{"\u2103"}</Text>
      <Image 
      source={{ uri: WEATHER_API_ICON + this.state.europeIconUrl[this.europeCityList[1]] + '.png'}} 
      style={[styles.imageIcon, {top: -60, left: -150}]}/> 
      <Text style={[styles.comment, {top: -5, left: -150}]}> {this.europeCityList[1]} {"\n"} {parseFloat(this.state.europeTemperature[this.europeCityList[1]]).toFixed(0)}{"\u2103"}</Text>
      <Image 
      source={{ uri: WEATHER_API_ICON + this.state.europeIconUrl[this.europeCityList[2]] + '.png'}} 
      style={[styles.imageIcon, {top: 10, left: -120}]}/> 
      <Text style={[styles.comment, {top: 65, left: -120}]}> {this.europeCityList[2]} {"\n"} {parseFloat(this.state.europeTemperature[this.europeCityList[2]]).toFixed(0)}{"\u2103"}</Text>
      <Image 
      source={{ uri: WEATHER_API_ICON + this.state.europeIconUrl[this.europeCityList[3]] + '.png'}} 
      style={[styles.imageIcon, {top: -20, left: -55}]}/> 
      <Text style={[styles.comment, {top: 35, left: -55}]}> {this.europeCityList[3]} {"\n"} {parseFloat(this.state.europeTemperature[this.europeCityList[3]]).toFixed(0)}{"\u2103"}</Text>
      <Image 
      source={{ uri: WEATHER_API_ICON + this.state.europeIconUrl[this.europeCityList[4]] + '.png'}} 
      style={[styles.imageIcon, {top: 70, left: -55}]}/> 
      <Text style={[styles.comment, {top: 125, left: -55}]}> {this.europeCityList[4]} {"\n"} {parseFloat(this.state.europeTemperature[this.europeCityList[4]]).toFixed(0)}{"\u2103"}</Text>
      <Image 
      source={{ uri: WEATHER_API_ICON + this.state.europeIconUrl[this.europeCityList[5]] + '.png'}} 
      style={[styles.imageIcon, {top: -120, left:-30}]}/> 
      <Text style={[styles.comment, {top: -65, left: -30}]}> {this.europeCityList[5]} {"\n"} {parseFloat(this.state.europeTemperature[this.europeCityList[5]]).toFixed(0)}{"\u2103"}</Text>
      <Image 
      source={{ uri: WEATHER_API_ICON + this.state.europeIconUrl[this.europeCityList[6]] + '.png'}} 
      style={[styles.imageIcon, {top: -40, left: 10}]}/> 
      <Text style={[styles.comment, {top: 15, left: 10}]}> {this.europeCityList[6]} {"\n"} {parseFloat(this.state.europeTemperature[this.europeCityList[6]]).toFixed(0)}{"\u2103"}</Text>
      <Image 
      source={{ uri: WEATHER_API_ICON + this.state.europeIconUrl[this.europeCityList[7]] + '.png'}} 
      style={[styles.imageIcon, {top: 30, left: 50}]}/> 
      <Text style={[styles.comment, {top: 85, left: 50}]}> {this.europeCityList[7]} {"\n"} {parseFloat(this.state.europeTemperature[this.europeCityList[7]]).toFixed(0)}{"\u2103"}</Text>
      <Image 
      source={{ uri: WEATHER_API_ICON + this.state.europeIconUrl[this.europeCityList[8]] + '.png'}} 
      style={[styles.imageIcon, {top: 100, left: 20}]}/> 
      <Text style={[styles.comment, {top: 155, left: 20}]}> {this.europeCityList[8]} {"\n"} {parseFloat(this.state.europeTemperature[this.europeCityList[8]]).toFixed(0)}{"\u2103"}</Text>
      <Image 
      source={{ uri: WEATHER_API_ICON + this.state.europeIconUrl[this.europeCityList[9]] + '.png'}} 
      style={[styles.imageIcon, {top: -110, left: 90}]}/> 
      <Text style={[styles.comment, {top: -55, left: 90}]}> {this.europeCityList[9]} {"\n"} {parseFloat(this.state.europeTemperature[this.europeCityList[9]]).toFixed(0)}{"\u2103"}</Text>
      </View>
      )
    }
    else {
      return (
         <View style={styles.CNT}>
        <Image 
        source={{ uri: WEATHER_API_ICON + this.state.polandIconUrl[this.polandCityList[0]] + '.png'}} 
        style={[styles.imageIcon, {top: -140, left: -200}]}/> 
        <Text style={[styles.comment, {top: -85, left: -200}]}> {this.polandCityList[0]} {"\n"} {parseFloat(this.state.polandTemperature[this.polandCityList[0]]).toFixed(0)}{"\u2103"}</Text>
        <Image 
        source={{uri: WEATHER_API_ICON + this.state.polandIconUrl[this.polandCityList[1]] + '.png'}} 
        style={[styles.imageIcon, {top: -70, left: -120}]} /> 
        <Text style={[styles.comment, {top: -15, left: -120}]}> {this.polandCityList[1]} {"\n"} {parseFloat(this.state.polandTemperature[this.polandCityList[1]]).toFixed(0)}{"\u2103"}</Text>
        <Image 
        source={{uri: WEATHER_API_ICON + this.state.polandIconUrl[this.polandCityList[2]] + '.png'}} 
        style={[styles.imageIcon, {top: 20, left: -130}]} /> 
        <Text style={[styles.comment, {top: 75, left: -130}]}> {this.polandCityList[2]} {"\n"} {parseFloat(this.state.polandTemperature[this.polandCityList[2]]).toFixed(0)}{"\u2103"}</Text>
        <Image 
        source={{uri: WEATHER_API_ICON + this.state.polandIconUrl[this.polandCityList[3]] + '.png'}} 
        style={[styles.imageIcon, {top: -210, left: -60}]} /> 
        <Text style={[styles.comment, {top: -155, left: -60}]}> {this.polandCityList[3]} {"\n"} {parseFloat(this.state.polandTemperature[this.polandCityList[3]]).toFixed(0)}{"\u2103"}</Text>
        <Image 
        source={{uri: WEATHER_API_ICON + this.state.polandIconUrl[this.polandCityList[4]] + '.png'}} 
        style={[styles.imageIcon, {top: -50, left: 30}]} /> 
        <Text style={[styles.comment, {top: 5, left: 30}]}> {this.polandCityList[4]} {"\n"} {parseFloat(this.state.polandTemperature[this.polandCityList[4]]).toFixed(0)}{"\u2103"}</Text>
        <Image 
        source={{uri: WEATHER_API_ICON + this.state.polandIconUrl[this.polandCityList[5]] + '.png'}} 
        style={[styles.imageIcon, {top: 80, left: -60}]} /> 
        <Text style={[styles.comment, {top: 135, left: -60}]}> {this.polandCityList[5]} {"\n"} {parseFloat(this.state.polandTemperature[this.polandCityList[5]]).toFixed(0)}{"\u2103"}</Text>
        <Image 
        source={{uri: WEATHER_API_ICON + this.state.polandIconUrl[this.polandCityList[6]] + '.png'}} 
        style={[styles.imageIcon, {top: -140, left: 100}]} /> 
        <Text style={[styles.comment, {top: -85, left: 100}]}> {this.polandCityList[6]} {"\n"} {parseFloat(this.state.polandTemperature[this.polandCityList[6]]).toFixed(0)}{"\u2103"}</Text>
        <Image 
        source={{uri: WEATHER_API_ICON + this.state.polandIconUrl[this.polandCityList[7]] + '.png'}} 
        style={[styles.imageIcon, {top: 80, left: 80}]} /> 
        <Text style={[styles.comment, {top: 135, left: 80}]}> {this.polandCityList[7]} {"\n"} {parseFloat(this.state.polandTemperature[this.polandCityList[7]]).toFixed(0)}{"\u2103"}</Text>
      </View>  ) 
    } 
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.MainContainer}>
        <Image
          source={{ uri: this.state.imageURL }}
          style={styles.imageStyle}
        />
       {this.displayWeather()}
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this._onPressLocalMap}
              color={styles.button.color}
              title="Polska"
            />
            {this.renderImage}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this._onPressEuropeMap}
              color={styles.button.color}
              title="Europa"
            />
          </View>
        </View>
      </View>
    );
  }
}
  const styles = StyleSheet.create({
    MainContainer :{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,      
    },
    CNT:{
      justifyContent: 'center',
      //alignItems: 'center',
      position: 'absolute'
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
    },
    iconContainer:{
      position: 'absolute',
      height: '100',
      width: '100'
    },
    buttonContainer: {
      flex: 1,
      margin: 6,
    },
    button: {
        color: "#1156FF",
    },
    imageStyle:{ 
        resizeMode: 'contain',
        flex: 1,
        alignSelf: 'stretch',
    },
    imageIcon:{
      position: 'absolute',
      width: 80,
      height: 80
    },
    weatherContainer: {
        flex: 1,
        margin: 6,
    },
    comment: {
      textAlign: 'center',
      position: 'absolute',
      fontWeight: 'bold'
    }
  });