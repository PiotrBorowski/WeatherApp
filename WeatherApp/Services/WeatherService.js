import {WEATHER_API_SAMPLE} from '../constants/url'


export default class WeatherService{
    static CallService(url){
        var ret = fetch(url)
        .then((responsejson) => responsejson.json())  
        .catch((error) =>{
        console.error(error);
      });

      return ret;
    }
}