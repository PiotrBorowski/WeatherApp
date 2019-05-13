import React from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, Alert, ScrollView } from 'react-native';
import { Constants } from 'expo';
import WeatherService from '../Services/WeatherService';
import { WEATHER_API_HOMESCREEN, WEATHER_API_ID } from '../constants/url';
import StorageService from '../Services/StorageService';
import {City} from '../components/City'


export default class AddCityScreen extends React.Component {
  static navigationOptions = {
    title: 'Twoje miasta',
  };

  constructor(props){
    super(props);
    this.state =
    { 
      city: '',
      cities: [],
      error: false
    }
  }



 async componentDidMount(){
     this.setState({cities: JSON.parse(await StorageService.retrieveData('cities'))});
  }

  addCity = async () => 
  {
    WeatherService
    .CallService(WEATHER_API_HOMESCREEN + '?q=' + this.state.city + '&cnt=1&' + WEATHER_API_ID)
    .then(    
       async (response) => {
         
        if(response.cod == 200)
        {
          this.setState({error: false});
          
          var list = await StorageService.retrieveData('cities');
          var citiesJson = [];
          if(list != null)
          {
            citiesJson = JSON.parse(list);
          }

          citiesJson.push(response.city);
          this.setState({cities: citiesJson});
          await StorageService.storeValue('cities', JSON.stringify(citiesJson));
        }
        else 
        {
          this.setState({error: true});
        }
      

      }
      );
  }

  renderCities = () => {
    if(this.state.cities != null)
    return this.state.cities.map(city => {
      return <City key={city.id} id={city.id} name={city.name} /> }
  );
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <TextInput
          style={{height: 40}}
          placeholder="Dodaj nowe miasto"
          onChangeText={(city) => this.setState({city})}
        />
        <Button title="Dodaj" onPress={this.addCity}/>
        {this.state.error ? (<Text style={{color: 'red'}}>Nie znaleziono miasta</Text>) : null}

        
        <ScrollView>
          {this.renderCities()}
        </ScrollView>
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
  });