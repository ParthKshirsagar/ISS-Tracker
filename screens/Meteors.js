import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform, StatusBar, ImageBackground, Image, Dimensions } from 'react-native';
import axios from 'axios';

export default class Meteors extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      meteors: {}
    }
  }

  componentDidMount(){
    this.getMeteors();
  }

  getMeteors = () => {
    const meteors = axios.get('https://api.nasa.gov/neo/rest/v1/feed?api_key=Vf2nFVI8euWZoZIjaMEdBp1qkwBVA5OEA7Wr0B55')
    .then((response) => {
      this.setState({
        meteors: response.data.near_earth_objects
      })
    })
    .catch((error)=>{
      alert(error.message);
    })
  }

  keyExtractor = (item, index)=> index.toString();
  

  renderItem = ({item})=>{
    let meteor = item;
    let bgImg;
    let speed;
    let size;
    if(meteor.threat_score <= 30){
      bgImg = require('../assets/meteor_bg1.png');
      speed = require('../assets/meteor_speed1.gif');
      size = 100;
    } else if(meteor.threat_score <= 75){
      bgImg = require('../assets/meteor_bg2.png');
      speed = require('../assets/meteor_speed2.gif');
      size = 150;
    } else{
      bgImg = require('../assets/meteor_bg3.png');
      speed = require('../assets/meteor_speed3.gif');
      size = 200;
    }

    return(
      <View>
        <ImageBackground source={bgImg} style={styles.backgroundImage}>
          <View style={styles.gifContainer}>
            <Image source={speed} style={{width: size, height: size, alignSelf: 'center'}}/>
            <View>
              <Text style={[styles.cardTitle, {marginTop: 400, marginLeft: 50}]}>{item.name}</Text>
              <Text style={[styles.cardText, {marginTop: 20, marginLeft: 50}]}>Closest To Earth: {item.close_approach_data[0].close_approach_date_full}</Text>
              <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>Minimum Diameter(km): {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
              <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>Maximum Diameter(km): {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
              <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>Velocity(kmph): {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
              <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>Missing Earth by(km): {item.close_approach_data[0].miss_distance.kilometers}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  render(){
    if(Object.keys(this.state.meteors).length === 0){
      return(
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Loading..</Text>
        </View>
      )
    } else {
      let meteors_arr = Object.keys(this.state.meteors).map((meteorDate)=>{
        return this.state.meteors[meteorDate]
      })
      let meteors = [].concat.apply([], meteors_arr);
      meteors.forEach(function(element){
        let diameter = ((element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max)/2);
        let distance = (element.close_approach_data[0].miss_distance.kilometers);
        let threatScore = (diameter/distance)*10000000000;
        element.threat_score = threatScore;
      });
      meteors.sort(function(a,b){
        return b.threat_score - a.threat_score;
      });
      meteors = meteors.slice(0,5);
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea}/>
          <FlatList
            data = {meteors}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            horizontal={true}
          />
        </View>
      )
    }
  }
}
// Vf2nFVI8euWZoZIjaMEdBp1qkwBVA5OEA7Wr0B55

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
  },
  titleBar: {
      flex: 0.15,
      justifyContent: "center",
      alignItems: "center"
  },
  titleText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "white"
  },
  meteorContainer: {
      flex: 0.85
  },
  listContainer: {
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
      justifyContent: "center",
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5,
      borderRadius: 10,
      padding: 10
  },
  cardTitle: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: "bold",
      color: "white"
  },
  cardText: {
      color: "white"
  },
  threatDetector: {
      height: 10,
      marginBottom: 10
  },
  gifContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1
  },
  meteorDataContainer: {
      justifyContent: "center",
      alignItems: "center",

  }
});