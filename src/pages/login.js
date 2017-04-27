'use strict';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ToolbarAndroid,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';

import React, {Component} from 'react';
import Signup from './signup';
import Account from './account';
import styles from '/Users/anitashah/AndroidStudioProjects/rnfirebaseauth/src/styles/common-styles.js';
import Wallpaper from '/Users/anitashah/AndroidStudioProjects/rnfirebaseauth/src/components/Wallpaper.js';
import UserInput from '/Users/anitashah/AndroidStudioProjects/rnfirebaseauth/src/components/UserInput';
import usernameImg from '/Users/anitashah/AndroidStudioProjects/rnfirebaseauth/src/components/usernameImg.png';
import passwordImg from '/Users/anitashah/AndroidStudioProjects/rnfirebaseauth/src/components/passwordImg.png';





export default class Login extends Component {

  constructor(props){
    super(props);
    // We have the same props as in our signup.js file and they serve the same purposes.
    this.state = {
      loading: false,
      email: '',
      password: '',
      latitude: "",
      longitude: "",
      error: null,
    };
  }

 componentDidMount() {
   this.watchId = navigator.geolocation.watchPosition(
     (position) => {
       this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         error: null,
       });
     },
     (error) => this.setState({ error: error.message }),
     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
   );
 }


  render() {
    // The content of the screen should be inputs for a username, password and submit button.
    // If we are loading then we display an ActivityIndicator.
    const content = this.state.loading ? <ActivityIndicator size="large"/> :
      <View>
      <UserInput source={usernameImg}
        placeholder='Email Address'
        onChangeText={(text) => this.setState({email: text})}
        value={this.state.email}
        autoCapitalize={'none'}
        returnKeyType={'done'}
        autoCorrect={false} />
      <UserInput source={passwordImg}
        secureTextEntry={true}
        placeholder='Password'
        onChangeText={(text) => this.setState({password: text})}
        value={this.state.password}
        returnKeyType={'done'}
        autoCapitalize={'none'}
        autoCorrect={false} />
        <TouchableHighlight onPress={this.login.bind(this)} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.goToSignup.bind(this)} style={styles.transparentButton}>
          <Text style={styles.transparentButtonText}>New here?</Text>
        </TouchableHighlight>
      </View>;

    // A simple UI with a toolbar, and content below it.
        return (
          <View style={styles.container}>
            <ToolbarAndroid
             style={styles.toolbar}
             title='Login'
             titleColor= 'white'/>
            <Wallpaper>
            <View style={styles.body}>
                  {content}
            </View>
            </Wallpaper>
          </View>

                );
  }

  login(){
    this.setState({
      loading: true
    });
    // Log in and display an alert to tell the user what happened.
    this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password
    ).then((userData) =>
      {
        this.setState({
                loading: false
              });
              this.props.navigator.push({
                  component: Account
                });

                var user = this.props.firebaseApp.auth().currentUser;
                var ref = this.props.firebaseApp.database().ref();
                if (user != null) {
                  this.ref = this.props.firebaseApp.database().ref();

                  var UsersRef = ref.child("users").child(user.uid);
                  this.UsersRef = this.ref.child("users").child(user.uid);
                  UsersRef.update({"latitude" : this.state.latitude  });
                  UsersRef.update({"longitude": this.state.longitude });
                };



              }
    ).catch((error) =>
        {
              this.setState({
                loading: false
              });
        alert('Login Failed. Please try again');
    });
  }

  // Go to the signup page
  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }
}

AppRegistry.registerComponent('Login', () => Login);
