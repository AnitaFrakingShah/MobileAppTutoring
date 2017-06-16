'use strict';
import {
  AppRegistry,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
  ToolbarAndroid,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';

import React, {Component} from 'react';
import Signup from './signup';
import Account from './account';
import TutorAccount from './tutoraccount';
import styles from '../styles/common-styles.js';
import Wallpaper from '../components/Wallpaper.js';
import UserInput from '../components/UserInput';
import usernameImg from '../components/usernameImg.png';
import passwordImg from '../components/passwordImg.png';
import Header from '../components/header'
import Tabs from '../components/tabs.js';
import styles2 from '../styles/common-styles.js';




export default class Login extends Component {


  constructor(props){
    super(props);
    // We have the same props as in our signup.js file and they serve the same purposes.

    this.state = {
      loading: false,
      tutoremail: '',
      tutorpassword: '',
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
    const content1  = this.state.loading ? <ActivityIndicator style={[styles3.above, {height: 80}]} size="large"/>:
      <Tabs>
        {/* First tab */}
        <View title="PARENT/USER" style={styles.content}>
              <View style = {styles3.above}>
                    <UserInput
                      source={usernameImg}
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
                   <View>
                     <TouchableHighlight onPress={this.login.bind(this)} style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Login</Text>
                     </TouchableHighlight>
                     <TouchableHighlight onPress={this.goToSignup.bind(this)} style={styles.transparentButton}>
                        <Text style={styles.transparentButtonText}>New here?</Text>
                     </TouchableHighlight>
                   </View>
            </View>
        </View>

        {/* Second tab */}
        <View title="TUTOR" style={styles.content}>
          <View style={styles3.above}> 
            <View>
              <UserInput
                source={usernameImg}
                placeholder='Email Address'
                onChangeText={(text) => this.setState({tutoremail: text})}
                value={this.state.tutoremail}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false} />
            </View>
            <View>
              <UserInput source={passwordImg}
                secureTextEntry={true}
                placeholder='Password'
                onChangeText={(text) => this.setState({tutorpassword: text})}
                value={this.state.tutorpassword}
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false} />
           </View>
           <TouchableHighlight onPress={this.tutorlogin.bind(this)} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Login</Text>
           </TouchableHighlight>
         </View>
      </View>
  </Tabs>;

    // A simple UI with a toolbar, and content below it.
        return (
          <View style={styles.container}>
            <ToolbarAndroid
             style={styles.toolbar}
             title='Login'
             titleColor= 'white'/>
            <Wallpaper>
            <View style={styles.container}>
                  {content1}
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
// When login update geolocation
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
        alert('User Login Failed. Please try again');
    });
  }


  tutorlogin(){

    // For some reason when activityindicator goes from true to false the activeTab resets to 0
    // Need to still figure out why and how to keep us on the tutorlogin (activeTab).
    this.setState({
      loading: true,
    });

    // Check to see if the tutoremail is under our list of approved tutors
    var ref1 = this.props.firebaseApp.database().ref("tutors");
    var query = ref1.orderByChild('email').equalTo(this.state.tutoremail);
    var query2 = query.limitToFirst(1);
    var wanted = query2.once('value', function(snapshot) {
       return snapshot.getKey();
    });


    // Log in and display an alert to tell the user what happened.
    if (wanted != null) { this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.tutoremail, this.state.tutorpassword
    ).then((userData) =>
      {

        this.setState({
                loading: false
              });
              this.props.navigator.push({
                  component: TutorAccount
                });
// When login update geolocation
                var user = this.props.firebaseApp.auth().currentUser;
                var ref = this.props.firebaseApp.database().ref();
                if (user != null) {
                  this.ref = this.props.firebaseApp.database().ref();

                  var UsersRef = ref.child("tutors").child(user.uid);
                  this.UsersRef = this.ref.child("tutors").child(user.uid);
                  UsersRef.update({"latitude" : this.state.latitude  });
                  UsersRef.update({"longitude": this.state.longitude });
                };
              }
    ).catch((error) =>
        {

          this.setState({
            loading: false,

          });
        alert('Tutor Login Failed. Please try again');

    });
  } else {
    this.setState({
      loading: false,

    });
    alert('Tutor Login Failed. Please try again');

  }
}



  // Go to the signup page
  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }
}
let ScreenHeight = (Dimensions.get("window").height)/6;
const styles3 = StyleSheet.create({
  // App container
  above: {
    marginTop: ScreenHeight,         // Background color
  },

});

AppRegistry.registerComponent('Login', () => Login);
