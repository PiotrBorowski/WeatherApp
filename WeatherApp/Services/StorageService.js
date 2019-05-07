import {AsyncStorage} from 'react-native';

export default class StorageService{
    static retrieveData = async (key) => {
        try {
          let value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // We have data!!
            return value;
          }
        } catch (error) {
          Alert.alert("error przy pobieraniu danych z local")
        }
      };

   static storeValue = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  };
}