import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export class City extends React.Component {

    deleteCity = () =>
    {
        this.props.deleteCity(this.props.name);
    }

    selectCity = () => 
    {
        this.props.selectCity(this.props.name);
    }

    render() {     
      return (
      <View style={styles.container} key={this.props.id}>
          <Text style={styles.name}>{this.props.name}</Text>
          <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'space-between'}}>
                <View style={styles.buttonDelete}>
                    <Button title='usun' onPress={this.deleteCity}/>
                </View>
              
                <View style={styles.buttonSelect} >
                    <Button title='wybierz' onPress={this.selectCity}/>                    
                </View>

          </View>
  
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginRight:10,
      marginLeft:10,
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#d6ebf2',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff'
    },
    name: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.8)',
      fontSize: 16,
      lineHeight: 19,
      textAlign: 'center',
    },
    buttonDelete: {
        fontSize: 20,
        marginLeft: 5,
        marginRight: 20,
        fontWeight: 'bold'
    },
    buttonSelect: {
        fontSize: 12,
        marginRight: 5,
        marginLeft: 20
    }
})