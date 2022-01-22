import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform, StatusBar, ImageBackground, Image } from 'react-native';


export default class Home extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea}/>
        <ImageBackground style={styles.backgroundImage} source={require('../assets/bg_image.png')}>
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>ISS Tracker</Text>
          </View>
          <TouchableOpacity
            style={styles.routeCard}
            onPress={()=>{
              this.props.navigation.navigate('ISS-Location');
            }}
          >
            <Text style={styles.routeText}>ISS Location</Text>
            <Text style={styles.knowMore}>{"Know-more--->"}</Text>
            <Text style={styles.bgDigit}>1</Text>
            <Image source={require('../assets/iss_icon.png')} style={styles.iconImage}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.routeCard}
            onPress={()=>{
              this.props.navigation.navigate('Meteors');
            }}
          >
            <Text style={styles.routeText}>Meteors</Text>
            <Text style={styles.knowMore}>{"Know more--->"}</Text>
            <Text style={styles.bgDigit}>2</Text>
            <Image source={require('../assets/meteor_icon.png')} style={styles.iconImage}></Image>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android'? StatusBar.currentHeight : 0
  },
  backgroundImage: {
    flex: 1, 
    resizeMode: 'cover'
  },
  titleBar: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
  routeCard: {
    flex: 0.25,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    borderRadius: 30, 
    backgroundColor: '#fff'
  },
  routeText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 75,
    paddingLeft: 30
  },
  knowMore: {
    paddingLeft: 30,
    color: 'red',
    fontSize: 15
  },
  bgDigit: {
    position: 'absolute',
    color: 'rgba(183,183,183,0.5)',
    fontSize: 150,
    right: 20,
    bottom: -15,
    zIndex: -1
  },
  iconImage: {
    position: 'absolute',
    height: 200,
    width: 200,
    resizeMode: 'contain',
    right: 20,
    top: -80
  }
});