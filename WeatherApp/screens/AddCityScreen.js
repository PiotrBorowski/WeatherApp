import React from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, Alert, ScrollView } from 'react-native';
import { Constants } from 'expo';
import WeatherService from '../Services/WeatherService';
import { WEATHER_API_HOMESCREEN, WEATHER_API_ID } from '../constants/url';
import StorageService from '../Services/StorageService';
import {City} from '../components/City'


export default class AddCityScreen extends React.Component {
  static navigationOptions = {
    title: 'Your cities',
  };

  constructor(props){
    super(props);
    this.state =
    { 
      city: '',
      cities: [],
      error: false,
      current: ''
    }
  }

 async componentDidMount(){
    const current = await StorageService.retrieveData('currentCity');
    this.setState({current});
    this.setState({cities: JSON.parse(await StorageService.retrieveData('cities'))});
    }

  async shouldComponentUpdate(){
    const current = await StorageService.retrieveData('currentCity');
    this.setState({current});
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
          this.setState({city: ''});
        }
        else 
        {
          this.setState({error: true});
        }    

      }
      );
  }

  renderCities =  () => {
    if(this.state.cities != null)
    return this.state.cities.map(city => {     
      if (this.state.current == city.name)
      {
       return <City selected={true} key={city.id} id={city.id} name={city.name} deleteCity={this.deleteCity} selectCity={this.selectCity}/>         
      }
      else{
        return <City selected={false} key={city.id} id={city.id} name={city.name} deleteCity={this.deleteCity} selectCity={this.selectCity}/>
      }
    });
  }

  deleteCity = async (name) =>
  {
    var list = await StorageService.retrieveData('cities');
    var citiesJson = [];
    var newList = [];
    if(list != null)
    {
      citiesJson = JSON.parse(list);
      newList = citiesJson.filter( (el) => {
        return el.name != name;
      });
    }

    this.setState({cities: newList});
    await StorageService.storeValue('cities', JSON.stringify(newList));

  }

  selectCity = async (name) => 
  {
    await StorageService.storeValue('currentCity', name);
    this.forceUpdate();
  }

   render() {
    return (
      <View style={styles.MainContainer}>
        <TextInput
          clearButtonMode='always'
          style={{height: 40}}
          placeholder="Dodaj nowe miasto"
          onChangeText={(city) => this.setState({city})}
          value={this.state.city}
        />
        <Button title="Dodaj" onPress={this.addCity}/>
        {this.state.error ? (<Text style={{color: 'red'}}>Nie znaleziono miasta</Text>) : null}

        
        <ScrollView>
          { this.renderCities()}
        </ScrollView>
      </View>
    );
  }
}


  const styles = StyleSheet.create({
    MainContainer :{
        justifyContent: 'center',
        alignItems: 'stretch',
        flex:1,      
    },
  });